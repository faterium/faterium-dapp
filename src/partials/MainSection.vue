<script lang="ts" setup>
import Button from "@components/inputs/Button.vue"
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
		h1.title all polls
		div.polls-list
			ListPoll.x1(
				link="/polls/pid"
				title="How many times should Jon Snow die in the next season?"
				image="https://dapp-api.faterium.com/ipfs/QmPL7MwuSHKH2e6qma1ZnTeMt4QJKSMY2ZHyVx3mQNXyPH"
			)
		div.actions
			Button.action.create(text="create a poll" fill url="/create-poll")
			Button.action.update(text="update list" fill @click="onClick")
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
			@apply flex justify-start items-start overflow-scroll h-60 w-120;
		}
		div.actions {
			@apply flex flex-row gap-4;
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
