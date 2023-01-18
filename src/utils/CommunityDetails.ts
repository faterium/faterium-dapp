import { Record } from "pocketbase"
import { SERVER_API } from "./consts"

export class CommunityDetails {
	public id: string
	public name: string
	public displayName: string
	public description: string
	public logoImage: string
	public bannerImage: string
	public featuredImage: string
	public team: string[]
	public linkTwitter: string
	public linkDiscord: string
	public linkYoutube: string
	public linkInstagram: string
	public linkWebpage: string

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		this.id = val ? val.id : ""

		this.name = val ? val.name : ""
		this.displayName = val ? val.displayName : ""
		this.description = val ? val.description : ""

		this.logoImage = val ?
			`${SERVER_API}/api/files/${val.collectionId}/${val.id}/${val.logoImage}`
			: "/assets/poll_preview.png"
		this.bannerImage = val ?
			`${SERVER_API}/api/files/${val.collectionId}/${val.id}/${val.bannerImage}`
			: "/assets/poll_preview.png"
		this.featuredImage = val ?
			`${SERVER_API}/api/files/${val.collectionId}/${val.id}/${val.featuredImage}`
			: "/assets/poll_preview.png"

		this.team = val ? val.team : ""

		this.linkTwitter = val ? val.linkTwitter : ""
		this.linkDiscord = val ? val.linkDiscord : ""
		this.linkYoutube = val ? val.linkYoutube : ""
		this.linkInstagram = val ? val.linkInstagram : ""
		this.linkWebpage = val ? val.linkWebpage : ""
	}

	public getCommunityUrl() {
		return `/communities/${this.name}`
	}
}
