<script lang="ts" setup>
import { ref } from "vue"
import dayjs from "dayjs"
import Swal from "sweetalert2"
import {
	Button,
	ListInput,
	MediaInput,
	FormInput,
	ListItemOption,
} from "@components/inputs"
import { connectPB, PocketBase, PollDetails, Record } from "@utils/index"
import { substrateCreatePoll } from "@utils/Substrate"
import BasePage from "./basePage.vue"

const submitDisabled = ref(false)
const formData = ref({
	name: "",
	displayName: "",
	description: "",
	logoImage: new FormData(),
	bannerImage: new FormData(),
	featuredImage: new FormData(),
	team: [""],
	linkTwitter: "",
	linkDiscord: "",
	linkYoutube: "",
	linkInstagram: "",
	linkWebpage: "",
})

const fileChanged = (event: Event, item: string) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		const tmp = new FormData()
		tmp.append("file", fileList.item(i))
		console.log(tmp)
		formData.value.logoImage = tmp
		console.log(formData.value.logoImage)
	}
}
// const uploadImages = async (
// 	pb: PocketBase,
// ): Promise<[string, string, string]> => {
// 	const logoImage = await pb
// 		.collection("images")
// 		.create(formData.value.logoImage)
// 	console.log("Upload logo result", logoImage)
// 	const bannerImage = await pb
// 		.collection("images")
// 		.create(formData.value.bannerImage)
// 	console.log("Upload banner result", bannerImage)
// 	const featuredImage = await pb
// 		.collection("images")
// 		.create(formData.value.featuredImage)
// 	console.log("Upload featured result", featuredImage)
// 	return [logoImage.id, bannerImage.id, featuredImage.id]
// }
const uploadCommunityDetails = async (pb: PocketBase, data: any) => {
	console.log("Upload data", data)
	const result = await pb.collection("communities").create(data)
	console.log("Upload community result", result)
	return result
}
const submit = async () => {
	submitDisabled.value = true
	const pb = connectPB()
	Swal.fire({
		title: "Please wait, uploading images to the server...",
		toast: true,
		position: "bottom-right",
		timerProgressBar: true,
		showConfirmButton: false,
		didOpen: () => Swal.showLoading(null),
	})
	// const [logoImage, bannerImage, featuredImage] = await uploadImages(
	// 	pb,
	// ).catch((err) => {
	// 	throw Swal.fire({
	// 		title: "Error on images upload!",
	// 		text: `Server returned ${err.status} error.
	// 		It may happen if you uploaded image that is not specified or invalid!`,
	// 		icon: "error",
	// 		confirmButtonText: "I will try again!",
	// 	})
	// })
	// if (!logoImage || !bannerImage || !featuredImage) return
	// Swal.fire({
	// 	title: "Images successfully uploaded to the server and IPFS!",
	// 	toast: true,
	// 	icon: "success",
	// 	position: "bottom-right",
	// 	showConfirmButton: false,
	// })
	const data = {
		name: formData.value.name,
		displayName: formData.value.displayName,
		description: formData.value.description,
		logoImage: formData.value.logoImage,
		bannerImage: formData.value.bannerImage,
		featuredImage: formData.value.featuredImage,
		team: formData.value.team,
		linkTwitter: formData.value.linkTwitter,
		linkDiscord: formData.value.linkDiscord,
		linkYoutube: formData.value.linkYoutube,
		linkInstagram: formData.value.linkInstagram,
		linkWebpage: formData.value.linkWebpage,
	}
	const communityRes = await uploadCommunityDetails(pb, data).catch((err) => {
		Swal.fire({
			title: "Error during poll details upload!",
			text: `Server returned ${err.status} error.
			It may happen if you specified invalid poll details!`,
			icon: "error",
			confirmButtonText: "Cool, let me fix it!",
		})
	})
	if (!communityRes) return
	console.log(communityRes)
	// const poll = new PollDetails(communityRes)
}
const submitButton = () =>
	submit()
		.then(() => {
			submitDisabled.value = false
		})
		.catch(() => {
			submitDisabled.value = false
		})
</script>

<template lang="pug">
BasePage(title="Create community" :submitButton="submitButton")
	FormInput.name(
		title="Community name"
		v-model="formData.name"
		placeholder="e.g. jon_snow_fans"
		type="text"
		required
	) This link will be shown on the community's detail page underneath its image
	FormInput.display-name(
		title="Display name"
		v-model="formData.displayName"
		placeholder="e.g. Jon Snow fan club"
		type="text"
	) Name of the community, will be shown on all views.
	FormInput.description(
		title="Description of community"
		placeholder="Provide a detailed description of your community."
		v-model="formData.description"
		textarea
	)
		| The description will be included on the community's detail page underneath its image and display name.
	MediaInput.logo-image(
		title="Logo image"
		@change.stop="function (e) { fileChanged(e, 'logoImage') }"
		small required
	)
		| File types supported: JPG, PNG, GIF, SVG.
		br
		| Max size: 5 MB. Preferred aspect ratio: 350px x 350px.
	MediaInput.banner-image(
		title="Banner image"
		@change.stop="function (e) { fileChanged(e, 'bannerImage') }"
		large required
	)
		| File types supported: JPG, PNG, GIF, SVG.
		br
		| Max size: 5 MB. Preferred aspect ratio: 1400px x 350px.
	MediaInput.featured-image(
		title="Featured image"
		@change.stop="function (e) { fileChanged(e, 'featuredImage') }"
		required
	)
		| File types supported: JPG, PNG, GIF, SVG.
		br
		| Max size: 5 MB. Preferred aspect ratio: 600px x 400px.
	//- ListInput.team(
	//- 	:itemComponent="ListItemOption"
	//- 	title="Community team"
	//- 	:inputSettings=`[{
	//- 		placeholder: "e.g. FvnazYM5KAetYpXoVDfqt9WFcJogKbekXVJ3Fz5oW2Dv82P",
	//- 	}]`
	//- 	v-model="formData.team"
	//- 	addText="add team member"
	//- 	:minCount="1"
	//- 	:onItemAdd="function () { formData.team.push(['']) }"
	//- )
	//- 	| Specify those who will get the winning deposit and their interest.
	//- 	br
	//- 	| Interest sum of all beneficiaries should be min=0% and max=100%.
	FormInput.link.twitter(
		title="Link for community Twitter"
		v-model="formData.linkTwitter"
		placeholder="e.g. https://twitter.com/<username>"
		type="text"
	) This link will be shown on the community's detail page underneath its image
	FormInput.link.discord(
		title="Link for community Discord"
		v-model="formData.linkDiscord"
		placeholder="e.g. https://discord.com/invite/<id>"
		type="text"
	) This link will be shown on the community's detail page underneath its image
	FormInput.link.youtube(
		title="Link for community Youtube"
		v-model="formData.linkYoutube"
		placeholder="e.g. https://youtube.com/<username>"
		type="text"
	) This link will be shown on the community's detail page underneath its image
	FormInput.link.instagram(
		title="Link for community Instagram"
		v-model="formData.linkInstagram"
		placeholder="e.g. https://instagram.com/<username>"
		type="text"
	) This link will be shown on the community's detail page underneath its image
	FormInput.link.webpage(
		title="Link for community Webpage"
		v-model="formData.linkWebpage"
		placeholder="e.g. https://example.com"
		type="text"
	) This link will be shown on the community's detail page underneath its image
	div.actions
		Button.action.create(
			text="Create community"
			submit fill
			:disabled="submitDisabled"
		)
</template>
