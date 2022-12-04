<script lang="ts" setup>
import { ref } from "vue"
import Button from "@components/inputs/Button.vue"
import ListInput from "@components/inputs/ListInput.vue"
import ListPoll from "@components/ListPoll.vue"
import { connectPB } from "@utils/pb"

interface Props {
	pid: string
}
const props = defineProps<Props>()

const poll = ref({
	title: "How many times should Jon Snow die in the next season?",
	description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's standard dummy
text ever since the 1500s, when an unknown printer took a galley of type
and scrambled it to make a type specimen book. It has survived not only
five centuries, but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently with
desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
	dateStart: "12 hours ago",
	dateEnd: "15 Nov 2022 at 13:00pm",
})

const onClick = async () => {
	const pb = connectPB()
	// const authData = await pb.admins.authWithPassword(
	// 	"test@faterium.com",
	// 	"0123456789",
	// )
	const result = await pb.collection("images").getList(1, 20, {})
	// props.pid
}
</script>

<template lang="pug">
main.content.section
	img.preview(
		src="https://dapp-api.faterium.com/ipfs/QmPL7MwuSHKH2e6qma1ZnTeMt4QJKSMY2ZHyVx3mQNXyPH"
		alt="poll preview"
	)
	div.wrapper
		h1.title {{ poll.title }}
		p.description {{ poll.description }}
		div.info
			span.date-start Created: <b>{{ poll.dateStart }}</b>
			span.date-end Will end on: <b>{{ poll.dateEnd }}</b>
		div.options
			h2 options will be here
		div.actions
			Button.action.create(text="create poll" fill @click="onClick")
			Button.action.back(text="cancel" fill url="/")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-140 h-full pt-40px;
		h1.title {
			@apply text-4xl font-bold m-0 mb-2 text-center text-black text-left;
		}
		div.info {
			@apply flex flex-row gap-20 mt-3;
			color: #9a9ba2;
			b {
				color: black;
			}
		}
		div.options {
			@apply my-12;
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
