<script lang="ts" setup>
import { ref } from "vue"
import Button from "@components/inputs/Button.vue"
import ListInput from "@components/inputs/ListInput.vue"
import FormInput from "@components/inputs/FormInput.vue"
import ListPoll from "@components/ListPoll.vue"
import { connectPB, PocketBase } from "@utils/pb"

const fileFormData = new FormData()
const formData = ref({
	title: "",
	image: "",
	description: "",
	options: [],
	dateStart: "",
	dateEnd: "",
	currency: "",
	goal: "",
	beneficiaries: [],
})

const fileChanged = (event: Event) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		fileFormData.append("file", fileList.item(i))
	}
}
const uploadFile = async (pb: PocketBase) => {
	const result = await pb.collection("images").create(fileFormData)
	// eslint-disable-next-line no-console
	console.log("Upload file result", result)
	return result.cid
}
const onClick = async () => {
	const pb = connectPB()
	const imageCid = await uploadFile(pb)
	// const authData = await pb.admins.authWithPassword(
	// 	"test@faterium.com",
	// 	"0123456789",
	// )
	// const fileFormData = new FormData()
	// const result = await pb.collection("polls").create()
	// console.log(result)
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h1.title Create poll
		p.description * Required fields
		div.inputs
			FormInput.title(
				title="Title"
				v-model="formData.title"
				placeholder="e.g. What poll to make?"
				type="text"
				required
			) Title of the poll, will be shown on all views.
			FormInput.image(
				title="Preview image"
				v-model="formData.image"
				type="file"
				@change.stop="fileChanged"
				required
			)
				| File types supported: JPG, PNG, GIF, SVG.
				br
				| Max size: 100 MB.
			FormInput.description(
				title="Description of poll"
				placeholder="Provide a detailed description of your poll."
				v-model="formData.description"
			)
				| The description will be included on the poll's detail page underneath its image.
				br
				| Markdown syntax is supported.
			ListInput.options(
				title="Voting options"
				v-model="formData.options"
				required
			) Voting options for the poll.
			FormInput.start-date(
				title="Start date"
				v-model="formData.dateStart"
				type="datetime-local"
				required
			) When the poll will start. If nothing selected - poll will start right after the creation.
			FormInput.end-date(
				title="End date"
				v-model="formData.dateEnd"
				type="datetime-local"
				required
			) When the poll will end.
			FormInput.currency(
				title="Payment currency"
				v-model="formData.currency"
				type="text"
				required
			) These tokens can be used to vote on this poll.
			FormInput.goal(
				title="Goal amount"
				placeholder="e.g. 999.999999"
				v-model="formData.goal"
				type="number"
				required
			) The minimum target amount of tokens to make poll happen.
			ListInput.beneficiaries(
				title="Poll beneficiaries"
				v-model="formData.beneficiaries"
			) The minimum amount of tokens to make poll happen.
		div.actions
			Button.action.create(text="create poll" fill @click="onClick")
			//- Button.action.back(text="cancel" fill url="/")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-full w-100vw relative justify-center items-center;
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-140 h-full pt-100px;
		h1.title {
			@apply text-4xl font-bold m-0 text-center text-black;
		}
		div.inputs {
			@apply my-6 w-full;
			& > div {
				@apply my-4;
			}
		}
		div.actions {
			@apply flex flex-row gap-4 pb-20;
			.create {
				@apply bg-green-500;
				&:hover {
					@apply bg-green-400;
				}
			}
		}
	}
}
</style>
