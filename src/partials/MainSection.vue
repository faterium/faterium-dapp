<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { Button } from "@components/inputs"
import ListPoll from "@components/ListPoll.vue"
import { connectPB, Record } from "@utils/pb"

const polls = ref([])

const loadPolls = async () => {
	const pb = connectPB()
	// const result = await pb.collection("images").getList(1, 20, {})
	const result = await pb.collection("polls").getList(1, 10, {
		sort: "-created",
		expand: "image",
	})
	polls.value = result.items.map((val) => {
		const img = val.expand.image as Record
		return {
			url: `/polls/${val.id}`,
			title: val.title,
			image: `https://dapp-api.faterium.com/ipfs/${val.imageCid}`,
			thumb: `https://dapp-api.faterium.com/api/files/${img.collectionId}/${img.id}/${img.file}?thumb=120x80`,
		}
	})
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
				:url="poll.url"
				:title="poll.title"
				:image="poll.thumb"
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
