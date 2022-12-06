import { Record } from "pocketbase"
import dayjs, { Dayjs } from "dayjs"

export interface VotingOption {
	index: number
	text: string
	vote: number
	percentage: string
}

export class PollDetails {
	public id: string
	public cid: string
	public title: string
	public description: string
	public imageUrl: string
	public thumbUrl: string
	public dateStart: Dayjs
	public dateEnd: Dayjs
	public options: VotingOption[]
	public pollId: string

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		const img = val ? val.expand.image as Record : null

		this.id = val ? val.id : ""
		this.cid = val ? val.cid : ""
		this.title = val ? val.title : ""
		this.description = val ? val.description : ""

		this.imageUrl = img ?
			`https://dapp-api.faterium.com/ipfs/${img.cid}`
			: "/assets/poll_preview.png"
		this.thumbUrl = img ?
			`https://dapp-api.faterium.com/api/files/${img.collectionId}/${img.id}/${img.file}?thumb=120x80`
			: "https://faterium.com/preview.png"

		this.dateStart = val ? dayjs(val.dateStart) : dayjs()
		this.dateEnd = val ? dayjs(val.dateEnd) : dayjs()

		this.options = val ?
			val.options.map((text, index) => ({ text, index, vote: 0, percentage: "10.0%" }))
			: []
		this.pollId = val ? val.pollId : ""
	}

	public getPollUrl() {
		return `/polls/${this.id}`
	}

	public computeStartBlock(current: number, period: number) {
		const diff = this.dateStart.unix() - dayjs().unix()
		const res = current + (diff / period)
		console.log("computeStartBlock", diff, res)
		return res
	}

	public computeEndBlock(current: number, period: number) {
		const diff = this.dateEnd.unix() - dayjs().unix()
		const res = current + (diff / period)
		console.log("computeEndBlock", diff, res)
		return res
	}
}
