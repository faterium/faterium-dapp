<script lang="ts" setup>
import { Button } from "@components/inputs"
import ListPoll from "@components/ListPoll.vue"
import { PollDetails } from "@utils/index"

interface Props {
	category?: string
	polls: PollDetails[]
}
const props = defineProps<Props>()

const getPolls = () => {
	// Cast object to class
	return props.polls.map((val) => Object.assign(new PollDetails(null), val))
}
</script>

<template lang="pug">
main.content.section(:class="{ category: !!category }")
	div.wrapper
		h2.title {{ category ? `Polls for ${category}` : 'Trending Polls' }}
		div.polls-grid
			ListPoll(
				v-for="(poll, index) of getPolls().splice(0, 8)"
				:key="index"
				:url="poll.getUrl()"
				:title="poll.title"
				:name="poll.community.displayName"
				:stats="`@${poll.community.name}`"
				:image="poll.thumbUrl"
				:logoImage="poll.community.logoImage"
			)
		Button.action.explore.create(
			v-if="!category"
			text="See all" fill url="/polls"
		)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-full min-h-150 relative justify-start items-center pt-24 pb-12;
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
	&.category {
		@apply mb-28;
	}
}
</style>
