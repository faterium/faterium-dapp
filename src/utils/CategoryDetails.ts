import { Record } from "pocketbase"
import { SERVER_API } from "./consts"

export class CategoryDetails {
	public id: string
	public name: string
	public description: string
	public image: string

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		this.id = val ? val.id : ""

		this.name = val ? val.name : ""
		this.description = val ? val.description : ""
		this.image = val ?
			`${SERVER_API}/api/files/${val.collectionId}/${val.id}/${val.image}`
			: "/assets/poll_preview.png"
	}

	public getCategoryUrl() {
		return `/categories/${this.name}`
	}
}
