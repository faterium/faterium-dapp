<script lang="ts" setup>
import PocketBase from "pocketbase"
import Button from "@components/Button.vue"
import ListPoll from "@components/ListPoll.vue"

const onClick = async () => {
	const pb = new PocketBase("https://dapp-api.faterium.com")
	// const authData = await pb.admins.authWithPassword(
	// 	"test@faterium.com",
	// 	"0123456789",
	// )
	const result = await pb.collection("images").getList(1, 20, {})
	// eslint-disable-next-line no-console
	console.log(result)
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h1.title all polls
		div.polls-list
			ListPoll.x1(
				link="/polls/pid"
				title="How many times should Jon Snow die in the next season?"
				image="https://dapp-api.faterium.com/ipfs/QmPL7MwuSHKH2e6qma1ZnTeMt4QJKSMY2ZHyVx3mQNXyPH"
			)
		div.actions
			Button.action.create(text="create a poll" fill @click="onClick")
			Button.action.update(text="update list" fill @click="onClick")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-100vh w-100vw relative justify-center items-center;

	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		.title {
			@apply text-4xl font-bold m-0 mb-8 text-center text-black;
		}
		div.polls-list {
			@apply flex justify-start items-start overflow-scroll h-60 w-120;
		}
		div.actions {
			@apply flex flex-row gap-4;
		}
	}
}
</style>
