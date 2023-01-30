<script lang="ts" setup>
import { ref } from "vue"
import Swal from "sweetalert2"
import { Button, MediaInput, FormInput } from "@components/inputs"
import {
	connectPB,
	PocketBase,
	CategoryDetails,
	simplifyError,
} from "@utils/index"
import BasePage from "./basePage.vue"

const submitDisabled = ref(false)
const formData = ref({
	name: "",
	description: "",
	image: null,
})

const iconChanged = (event: Event) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		formData.value.image = fileList.item(i)
	}
}
const uploadCategoryDetails = async (pb: PocketBase, data: any) => {
	console.log("Upload data", data)
	const result = await pb.collection("categories").create(data)
	console.log("Upload category result", result)
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
	const formDataValue = new FormData()
	Object.keys(formData.value).forEach((k) => {
		formDataValue.append(k, formData.value[k])
	})
	const categoryRes = await uploadCategoryDetails(pb, formDataValue).catch(
		(err) => {
			Swal.fire({
				title: "Error during category creation!",
				html: `Server returned error: </br> ${simplifyError(err)}`,
				icon: "error",
				confirmButtonText: "Cool, let me fix it!",
			})
		},
	)
	if (!categoryRes) return
	const category = new CategoryDetails(categoryRes)
	Swal.fire({
		title: "Category successfully created!",
		icon: "success",
		confirmButtonText: "Cool, take me there!",
	}).then((_) => {
		window.location.replace(`/categories/${category.name}`)
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
	title="Create category"
	:submitButton="submitButton"
)
	FormInput.name(
		title="Category name"
		v-model="formData.name"
		placeholder="e.g. Books"
		type="text"
		required
	) Unique display name for the Category.
	MediaInput.icon-image(
		title="Icon image"
		@change.stop="iconChanged"
		small required
	)
		| File types supported: JPG, PNG, GIF, SVG.
		br
		| Max size: 5 MB. Preferred aspect ratio: 256px x 256px.
	FormInput.description(
		title="Description of category"
		placeholder="Provide a description for the category."
		v-model="formData.description"
		type="text"
	) The description will be included in the future on the detail's page of category.
	div.actions
		Button.action.create(
			text="Create category"
			submit fill
			:disabled="submitDisabled"
		)
</template>
