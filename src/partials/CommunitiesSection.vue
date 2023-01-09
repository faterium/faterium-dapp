<script lang="ts" setup>
import { Button } from "@components/inputs"
import CommunityItem from "@components/CommunityItem.vue"
import { PollDetails } from "@utils/index"

interface Props {
	polls: PollDetails[]
}
const props = defineProps<Props>()

const getPolls = () => {
	// Cast object to class
	return props.polls.map((val) => Object.assign(new PollDetails(null), val))
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h2.title Featured communities
		div.communities
			CommunityItem(
				v-for="(poll, index) of getPolls()"
				:key="index"
				:url="poll.getPollUrl()"
				:title="poll.title"
				name="Lorem Dolor lorem Ipsum is simply dummy text  lorem Ipsum is simply dummy text "
				status="1 active poll"
				stats="147m followers"
				:bannerImage="poll.thumbUrl"
				:communityImage="poll.thumbUrl"
			)
		Button.action.explore.create(text="Explore" fill url="/communities")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-200 w-full relative justify-start items-center py-12;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.communities {
			@apply grid gap-4 grid-cols-3;
		}
		.explore {
			@apply mt-12 py-4 px-16 rounded-4xl bg-transparent border-green-500 text-green-500
				hover:text-white hover:bg-green-500;
		}
	}
}
</style>
