import { Record } from "pocketbase"
import { SERVER_API } from "./consts"
import { CategoryDetails } from "./CategoryDetails"

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
	public category?: CategoryDetails
	public pollCount?: number
	public created: string

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		this.id = val ? val.id : ""
		this.created = val ? val.created : ""

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

		this.team = val ? val.team : []

		this.linkTwitter = val ? val.linkTwitter : ""
		this.linkDiscord = val ? val.linkDiscord : ""
		this.linkYoutube = val ? val.linkYoutube : ""
		this.linkInstagram = val ? val.linkInstagram : ""
		this.linkWebpage = val ? val.linkWebpage : ""

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.category = val ? new CategoryDetails(val.expand?.category as any) : null

		this.pollCount = val ? val.pollCount : ""
	}

	public getUrl() {
		return `/communities/${this.name}`
	}
}
