<script lang="ts" setup>
import { Button } from "@components/inputs"
import CommunityItem from "@components/CommunityItem.vue"
import { CommunityDetails } from "@utils/index"

interface Props {
	marginTop?: boolean
	communities: CommunityDetails[]
}
const props = defineProps<Props>()

const getCommunities = () => {
	// Cast object to class
	return props.communities.map((val) =>
		Object.assign(new CommunityDetails(null), val),
	)
}
</script>

<template lang="pug">
main.content.section(:class="{ marginTop }")
	div.wrapper
		h2.title Featured communities
		div.communities
			CommunityItem(
				v-for="(community, index) of getCommunities()"
				:key="index"
				:url="community.getCommunityUrl()"
				:name="community.name"
				:description="community.description"
				:stats="`${community.pollCount} polls created`"
				:bannerImage="community.bannerImage"
				:communityImage="community.logoImage"
			)
		Button.action.explore.create(
			v-if="!marginTop"
			text="Explore" fill url="/communities"
		)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col min-h-200 h-full w-full relative justify-start items-center py-12;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.communities {
			@apply grid gap-4 grid-cols-3;
		}
		.explore {
			@apply my-12 py-4 px-16 rounded-4xl bg-transparent border-green-500 text-green-500
				hover:text-white hover:bg-green-500;
		}
	}
	&.marginTop {
		@apply pt-24 min-h-200 h-auto bg-white;
		.wrapper div.communities {
			@apply pb-28;
		}
	}
}
</style>
