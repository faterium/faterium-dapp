<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { Button } from "@components/inputs"
import ListPoll from "@components/ListPoll.vue"
import { connectPB, PollDetails } from "@utils/index"

const polls = ref([])

const loadPolls = async () => {
	const pb = connectPB()
	// const result = await pb.collection("images").getList(1, 20, {})
	const result = await pb.collection("polls").getList(1, 10, {
		sort: "-created",
		expand: "image",
	})
	polls.value = result.items.map((val) => new PollDetails(val))
}
onMounted(() => {
	loadPolls()
})
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h1.title all polls
		div.polls-list
			ListPoll(
				v-for="(poll, index) of polls"
				:key="index"
				:url="poll.getPollUrl()"
				:title="poll.title"
				:image="poll.thumbUrl"
			)
		div.actions
			Button.action.create(text="create a poll" fill url="/create-poll")
			Button.action.update(text="load polls" fill @click="loadPolls")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-100vh w-100vw relative justify-center items-center;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h1.title {
			@apply text-4xl font-bold m-0 mb-8 text-center text-black;
		}
		div.polls-list {
			@apply flex flex-col justify-start items-start gap-4 overflow-scroll h-80 w-120;
		}
		div.actions {
			@apply flex flex-row gap-4 mt-8;
		}
	}
}
</style>
