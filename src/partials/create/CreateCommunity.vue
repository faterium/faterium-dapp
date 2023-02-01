<script lang="ts" setup>
import { ref } from "vue"
import { signedUser } from "@utils/store"
import { useStore } from "@nanostores/vue"
import Swal from "sweetalert2"
import {
	Button,
	ListInput,
	MediaInput,
	FormInput,
	FormDropdownInput,
	ListItemOption,
} from "@components/inputs"
import {
	connectPB,
	PocketBase,
	simplifyError,
	CommunityDetails,
	CategoryDetails,
} from "@utils/index"
import BasePage from "./basePage.vue"

interface Props {
	isUser?: boolean
	userDetails?: CommunityDetails
	categories?: CategoryDetails[]
}
const props = defineProps<Props>()
const currentUser = useStore(signedUser)

const prepCat = (val: CategoryDetails) => `${val.id} - @${val.name}`
const getCategories = () => props.categories?.map(prepCat)
const submitDisabled = ref(false)
const formData = ref({
	name: "",
	displayName: "",
	description: "",
	logoImage: null,
	bannerImage: null,
	featuredImage: null,
	team: [signedUser.get() !== null ? signedUser.get().id : ""],
	category: "",
	linkTwitter: "",
	linkDiscord: "",
	linkYoutube: "",
	linkInstagram: "",
	linkWebpage: "",
	isUser: !!props.isUser,
})

const fileChanged = (event: Event, item: string) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		formData.value[item] = fileList.item(i)
	}
}
const uploadCommunityDetails = async (pb: PocketBase, data: any) => {
	console.log("Upload data", data)
	const result = await pb.collection("communities").create(data)
	console.log("Upload community result", result)
	return result
}
const submit = async () => {
	submitDisabled.value = true
	const pb = connectPB()
	const parsedCat = formData.value.category.split(" - ")
	if (props.categories && parsedCat.length < 2) {
		Swal.fire({
			title: "Selected invalid category!",
			icon: "error",
			confirmButtonText: "I will fix it!",
		})
		return
	}
	Swal.fire({
		title: "Please wait, uploading images to the server...",
		toast: true,
		position: "bottom-right",
		timerProgressBar: true,
		showConfirmButton: false,
		didOpen: () => Swal.showLoading(null),
	})
	const formDataValue = new FormData()
	Object.keys(formData.value).forEach((k) => {
		if (k === "category" && props.categories) {
			formDataValue.append(k, parsedCat[0])
		} else {
			formDataValue.append(k, formData.value[k])
		}
	})
	const communityRes = await uploadCommunityDetails(pb, formDataValue).catch(
		(err) => {
			Swal.fire({
				title: `Error during ${
					props.isUser ? "user" : "community"
				} upload!`,
				html: `Server returned error: </br> ${simplifyError(err)}`,
				icon: "error",
				confirmButtonText: "Cool, let me fix it!",
			})
		},
	)
	if (!communityRes) return
	console.log(communityRes)
	const community = new CommunityDetails(communityRes)
	Swal.fire({
		title: `${
			props.isUser ? "Profile" : "Community"
		} successfully created!`,
		icon: "success",
		confirmButtonText: "Cool, take me there!",
	}).then((_) => {
		window.location.replace(
			`/${props.isUser ? "profiles" : "communities"}/${
				communityRes.name
			}`,
		)
	})
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
BasePage(
	:title="isUser ? 'Create profile' : 'Create community'"
	:submitButton="submitButton"
)
	FormInput.name(
		:title="isUser ? 'Username' : 'Community name'"
		v-model="formData.name"
		placeholder="e.g. jon_snow_fans"
		type="text"
		required
	) Unique name that will be shown underneath its image.
	FormInput.display-name(
		title="Display name"
		v-model="formData.displayName"
		placeholder="e.g. Jon Snow fan club"
		type="text"
	) Display name, will be shown on all views.
	FormInput.description(
		:title="isUser ? 'Biography' : 'Description of community'"
		placeholder="Provide a detailed description or biography."
		v-model="formData.description"
		textarea
	) The description will be included on the detail's page underneath its image and display name.
	MediaInput.logo-image(
		:title="isUser ? 'Profile image' : 'Logo image'"
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
	FormDropdownInput.category(
		v-if="categories"
		title="Category"
		placeholder="e.g. Books"
		v-model="formData.category"
		:datalist="getCategories()"
		required
	) In what category this community will be created.
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
	) This link will be shown on the detail's page underneath its image.
	FormInput.link.discord(
		title="Link for community Discord"
		v-model="formData.linkDiscord"
		placeholder="e.g. https://discord.com/invite/<id>"
		type="text"
	) This link will be shown on the detail's page underneath its image.
	FormInput.link.youtube(
		title="Link for community Youtube"
		v-model="formData.linkYoutube"
		placeholder="e.g. https://youtube.com/<username>"
		type="text"
	) This link will be shown on the detail's page underneath its image.
	FormInput.link.instagram(
		title="Link for community Instagram"
		v-model="formData.linkInstagram"
		placeholder="e.g. https://instagram.com/<username>"
		type="text"
	) This link will be shown on the detail's page underneath its image.
	FormInput.link.webpage(
		title="Link for community Webpage"
		v-model="formData.linkWebpage"
		placeholder="e.g. https://example.com"
		type="text"
	) This link will be shown on the detail's page underneath its image.
	div.actions
		Button.action.create(
			:text="isUser ? 'Create profile' : 'Create community'"
			submit fill
			:disabled="submitDisabled"
		)
</template>
