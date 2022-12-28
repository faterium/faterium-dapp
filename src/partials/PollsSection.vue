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
		h1.title Trending Polls
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
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-200 w-full relative justify-start items-center py-24;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h1.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.polls-grid {
			@apply grid gap-4 grid-cols-4;
		}
		div.actions {
			@apply flex flex-row gap-4 mt-8;
		}
	}
}
</style>
