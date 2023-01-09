<script lang="ts" setup>
import { Button } from "@components/inputs"
import ListPoll from "@components/ListPoll.vue"
import { PollDetails } from "@utils/index"

interface Props {
	polls: PollDetails[]
}
const props = defineProps<Props>()

const getPolls = () => {
	// Cast object to class
	return props.polls
		.concat(props.polls)
		.map((val) => Object.assign(new PollDetails(null), val))
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h2.title Trending Polls
		div.polls-grid
			ListPoll(
				v-for="(poll, index) of getPolls()"
				:key="index"
				:url="poll.getPollUrl()"
				:title="poll.title"
				name="The Sandbox"
				stats="479k views - 13 hours left"
				:image="poll.thumbUrl"
			)
		Button.action.explore.create(text="See all" fill url="/polls")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-full relative justify-start items-center pt-24 pb-12;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.polls-grid {
			@apply grid gap-4 grid-cols-4;
		}
		.explore {
			@apply mt-8 py-4 px-16 rounded-4xl bg-transparent border-green-500 text-green-500
				hover:text-white hover:bg-green-500;
		}
	}
}
</style>
