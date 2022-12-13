import { Record } from "pocketbase"
import dayjs, { Dayjs } from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

const API = import.meta.env.PUBLIC_NETWORK === "testnet"
	? "https://dapp-api.faterium.com"
	: "http://127.0.0.1:8090"

dayjs.extend(relativeTime)

export interface VotingOption {
	index: number
	text: string
	vote: number
	percentage: string
}

export interface SubstratePollDetails {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	beneficiaries: any[]
	createdBy: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	currency: { [status: string]: any }
	goal: number
	ipfsCid: string
	optionsCount: number
	rewardSettings: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	status: { [status: string]: any }
	votes: number[]
}

export class PollDetails {
	public id: string
	public cid: string
	public title: string
	public description: string
	public imageUrl: string
	public thumbUrl: string
	public dateStart: string
	public dateEnd: string
	public options: VotingOption[]
	public pollId: string
	// Poll details from Substrate node
	public details: SubstratePollDetails

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		const img = val ? val.expand.image as Record : null

		this.id = val ? val.id : ""
		this.cid = val ? val.cid : ""
		this.title = val ? val.title : ""
		this.description = val ? val.description : ""

		this.imageUrl = img ?
			`${API}/ipfs/${img.cid}`
			: "/assets/poll_preview.png"
		this.thumbUrl = img ?
			`${API}/api/files/${img.collectionId}/${img.id}/${img.file}?thumb=120x80`
			: "https://faterium.com/preview.png"

		this.dateStart = val ? val.dateStart : ""
		this.dateEnd = val ? val.dateEnd : ""

		this.options = val ?
			val.options.map((text, index) => ({ text, index, vote: 0, percentage: "0.0%" }))
			: []
		this.pollId = val ? val.pollId : ""

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.details = { votes: [] } as any
	}

	public static formatDate(d: Dayjs) {
		// Format date like: "2022-01-01 10:00:00.123Z"
		return d.format("YYYY-MM-DD HH:mm:ss.SSS[Z]")
	}

	public dateStartFrom() {
		return dayjs(this.dateStart).from(
			dayjs(PollDetails.formatDate(dayjs())),
		)
	}

	public dateEndFrom() {
		return dayjs(this.dateEnd).from(
			dayjs(PollDetails.formatDate(dayjs())),
		)
	}

	public getPollUrl() {
		return `/polls/${this.id}`
	}

	public computeStartBlock(current: number, period: number) {
		// FIXME: Weird error, fix pocketbase date parse
		const now = PollDetails.formatDate(dayjs())
		const diff = dayjs(this.dateStart).unix() - dayjs(now).unix()
		const res = Math.trunc(current + (diff / period))
		console.log("computeStartBlock", diff, res)
		return res
	}

	public computeEndBlock(current: number, period: number) {
		// FIXME: Weird error, fix pocketbase date parse
		const now = PollDetails.formatDate(dayjs())
		const diff = dayjs(this.dateEnd).unix() - dayjs(now).unix()
		const res = Math.trunc(current + (diff / period))
		console.log("computeEndBlock", diff, res)
		return res
	}

	public getCapital() {
		let sum = 0
		if (!this.details.votes) return 0
		this.details.votes.forEach((vote) => {
			sum += vote
		})
		return sum
	}

	public getStatus() {
		if (!this.details.status) return "ongoing"
		return Object.keys(this.details.status)[0]
	}

	public getOptions() {
		if (!this.details.votes) return this.options
		const sum = this.getCapital()
		const newOptions = this.options
		this.details.votes.forEach((vote, index) => {
			newOptions[index].percentage = `${(vote / (sum === 0 ? 1 : sum) * 100).toFixed(2)}%`
		})
		return newOptions
	}

	public votingOptions() {
		return this.options.map((opt) => opt.vote)
	}
}
