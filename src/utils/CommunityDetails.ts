import { Record } from "pocketbase"

export class CommunityDetails {
	public id: string
	public name: string
	public displayName: string
	public imageLogoUrl: string
	public imageBannerUrl: string
	public imageFeaturedUrl: string
	public description: string
	public links: [string, string][]
	public team: [string, string][]

	// Accepts PocketBase Record with expand.
	constructor(val: Record | null) {
		this.id = val ? val.id : ""
		this.name = val ? val.name : ""
	}
}
