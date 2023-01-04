<script lang="ts" setup>
import { Button } from "@components/inputs"
import CategoryItem from "@components/CategoryItem.vue"
import { PollDetails } from "@utils/index"

interface Props {
	polls: PollDetails[]
}
const props = defineProps<Props>()

const getPolls = () => {
	// Cast object to class
	return props.polls
		.concat(props.polls)
		.concat(props.polls)
		.map((val) => Object.assign(new PollDetails(null), val))
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h2.title Featured Categories
		div.categories
			CategoryItem(
				v-for="(poll, index) of getPolls()"
				:key="index"
				:url="poll.getPollUrl()"
				:title="poll.title"
				name="Games"
				status="1 active poll"
				stats="147m followers"
				:image="poll.thumbUrl"
			)
		Button.action.explore.create(text="See more" fill url="/categories")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-200 w-full relative justify-start items-center py-24;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.categories {
			@apply grid gap-4 grid-cols-3;
		}
		.explore {
			@apply mt-12 py-4 px-16 rounded-4xl bg-transparent border-green-500 text-green-500
				hover:text-white hover:bg-green-500;
		}
	}
}
</style>
