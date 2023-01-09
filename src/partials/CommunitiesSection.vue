<script lang="ts" setup>
import { Button } from "@components/inputs"
import CommunityItem from "@components/CommunityItem.vue"
import { CommunityDetails } from "@utils/index"

interface Props {
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
main.content.section
	div.wrapper
		h2.title Featured communities
		div.communities
			CommunityItem(
				v-for="(community, index) of getCommunities()"
				:key="index"
				:url="community.getCommunityUrl()"
				:name="community.name"
				:description="community.description"
				status="1 active poll"
				stats="147m followers"
				:bannerImage="community.bannerImage"
				:communityImage="community.logoImage"
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
