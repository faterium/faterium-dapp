import { Record } from "pocketbase"
import dayjs, { Dayjs } from "dayjs"

export class PollDetails {
	public id: string
	public cid: string
	public title: string
	public description: string
	public imageUrl: string
	public thumbUrl: string
	public dateStart: Dayjs
	public dateEnd: Dayjs

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		const img = val ? val.expand.image as Record : null

		this.id = val ? val.id : ""
		this.cid = val ? val.cid : ""
		this.title = val ? val.title : ""
		this.description = val ? val.description : ""

		this.imageUrl = img ?
			`https://dapp-api.faterium.com/ipfs/${val.imageCid}`
			: "/assets/poll_preview.png"
		this.thumbUrl = img ?
			`https://dapp-api.faterium.com/api/files/${img.collectionId}/${img.id}/${img.file}?thumb=120x80`
			: "https://faterium.com/preview.png"

		this.dateStart = val ? dayjs(val.dateStart) : dayjs()
		this.dateEnd = val ? dayjs(val.dateEnd) : dayjs()
	}

	public getPollUrl() {
		return `/polls/${this.id}`
	}
}
