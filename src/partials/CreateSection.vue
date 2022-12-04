<script lang="ts" setup>
import Button from "@components/inputs/Button.vue"
import DateSelect from "@components/inputs/DateSelect.vue"
import ListInput from "@components/inputs/ListInput.vue"
import MediaSelect from "@components/inputs/MediaSelect.vue"
import TextInput from "@components/inputs/TextInput.vue"
import ListPoll from "@components/ListPoll.vue"
import { connectPB } from "@utils/pb"

const onClick = async () => {
	const pb = connectPB()
	// const authData = await pb.admins.authWithPassword(
	// 	"test@faterium.com",
	// 	"0123456789",
	// )
	const result = await pb.collection("images").getList(1, 20, {})
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h1.title Create poll
		p.description * Required fields
		div.inputs
			TextInput.title(title="Title *")
			MediaSelect.image(title="Image PNG/JPEG *")
			TextInput.image(title="Body/description")
			ListInput.options(title="Voting options")
			DateSelect.start-date(title="Start date *")
			DateSelect.end-date(title="End date *")
			TextInput.image(title="Goal/target amount")
			ListInput.beneficiaries(title="Poll beneficiaries")
		div.actions
			Button.action.create(text="create poll" fill @click="onClick")
			Button.action.back(text="cancel" fill url="/")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-full w-100vw relative justify-center items-center;
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-200 h-full pt-100px;
		h1.title {
			@apply text-4xl font-bold m-0 text-center text-black;
		}
		div.inputs {
			@apply my-8;
		}
		div.actions {
			@apply flex flex-row gap-4 mb-10;
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
