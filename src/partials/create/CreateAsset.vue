<script lang="ts" setup>
import { ref } from "vue"
import Swal from "sweetalert2"
import { Button, MediaInput, FormInput } from "@components/inputs"
import { connectPB } from "@utils/index"
import { substrateCreateAsset } from "@utils/Substrate"
import BasePage from "./basePage.vue"

const fileFormData = new FormData()
const submitDisabled = ref(false)
const formData = ref({
	name: "",
	symbol: "",
	icon: null,
	decimals: 0,
	minBalance: 0,
	assetId: 0,
})

const fileChanged = (event: Event) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		formData.value.icon = fileList.item(i)
	}
}
const submit = async () => {
	submitDisabled.value = true
	const pb = connectPB()
	// Call substrate CreateAsset extrinsic
	await substrateCreateAsset(pb, formData.value).catch((reason) => {
		console.error(reason)
		Swal.fire({
			title: "Error during substrate asset creation!",
			text: `Got the following error: ${reason}.`,
			icon: "error",
			confirmButtonText: "Cool, let me try again!",
		})
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
BasePage(title="Create asset" :submitButton="submitButton")
	MediaInput.icon(
		title="Asset icon"
		type="file"
		small
		@change.stop="fileChanged"
		required
	)
		| File types supported: JPG, PNG, GIF, SVG.
		br
		| Max size: 5 MB. Preferred aspect ratio: 1:1.
	FormInput.name(
		title="Asset name"
		v-model="formData.name"
		placeholder="e.g. Awesome Coins"
		type="text"
		required
	) The descriptive name for this asset.
	FormInput.symbol(
		title="Asset symbol"
		v-model="formData.symbol"
		placeholder="e.g. COIN"
		type="text"
		required
	) The symbol that will represent this asset.
	FormInput.decimals(
		title="Asset decimals"
		placeholder="e.g. 10"
		v-model="formData.decimals"
		type="number"
		required
	) The number of decimals for this token. Max allowed via the UI is set to 20.
	FormInput.minBalance(
		title="Minimum balance"
		placeholder="e.g. 1000"
		v-model="formData.minBalance"
		type="number"
		required
	) The minimum balance for the asset. This is specified in the units and decimals as requested.
	FormInput.assetId(
		title="Asset ID"
		placeholder="e.g. 10"
		v-model="formData.assetId"
		type="number"
		required
	) The selected id for the asset. This should not match an already-existing asset id.
	div.actions
		Button.action.create(
			text="create asset"
			submit fill
			:disabled="submitDisabled"
		)
		//- Button.action.back(text="cancel" fill url="/")
</template>
