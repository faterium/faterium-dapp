<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { Button, ListInput } from "@components/inputs"
import { connectPB, PollDetails } from "@utils/index"

interface Props {
	pid: string
}
const props = defineProps<Props>()

const poll = ref(new PollDetails(null))

const loadPoll = async () => {
	const pb = connectPB()
	// const result = await pb.collection("images").getList(1, 20, {})
	const result = await pb.collection("polls").getOne(props.pid, {
		expand: "image",
	})
	if (!result) return
	poll.value = new PollDetails(result)
	// eslint-disable-next-line no-console
	console.log(poll.value)
}
onMounted(() => {
	loadPoll()
})
</script>

<template lang="pug">
main.content.section
	img.preview(
		:src="poll.imageUrl"
		alt="poll preview"
	)
	div.wrapper
		h1.title {{ poll.title }}
		p.description {{ poll.description }}
		div.info
			span.date-start Created: <b>{{ poll.dateStart.format("YYYY-MM-DD") }}</b>
			span.date-end Will end on: <b>{{ poll.dateEnd.format("YYYY-MM-DD") }}</b>
		div.options
			h2 options will be here
		div.actions
			Button.action.create(text="vote" fill)
			Button.action.back(text="back" fill url="/")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 object-cover;
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
