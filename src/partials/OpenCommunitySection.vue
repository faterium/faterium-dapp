<script lang="ts" setup>
import { ref } from "vue"
import dayjs from "dayjs"
import { Button } from "@components/inputs"
import ListPoll from "@components/ListPoll.vue"
import CommunityItem from "@components/CommunityItem.vue"
import { CommunityDetails, PollDetails } from "@utils/index"

interface Props {
	isUser?: boolean

	community?: CommunityDetails
	polls?: PollDetails[]

	profile?: CommunityDetails
	communities?: CommunityDetails[]
}
const props = defineProps<Props>()

const parsedCommunity = ref(
	Object.assign(
		new CommunityDetails(null),
		!props.community ? props.profile : props.community,
	),
)
const parsedPolls = ref(
	props.polls &&
		props.polls.map((val) => Object.assign(new PollDetails(null), val)),
)
const parsedCommunities = ref(
	props.communities &&
		props.communities.map((val) =>
			Object.assign(new CommunityDetails(null), val),
		),
)
const getFeatures = () => {
	return [
		{
			title: "polls created",
			stats: props.polls?.length || 0,
		},
		{
			title: "communities",
			stats: props.communities?.length || 0,
		},
	]
}
</script>

<template lang="pug">
main.content.section
	img.preview(
		:src="parsedCommunity.bannerImage"
		alt="poll preview"
	)
	div.wrapper
		div.top-block
			img.profile-image(
				:src="parsedCommunity.logoImage"
				alt="poll preview"
			)
			div.social-links
				a.social-link.twitter(
					v-if="parsedCommunity.linkTwitter !== ''"
					:href="parsedCommunity.linkTwitter"
				)
					img(src="/assets/icons/twitter.svg" alt="twitter")
				a.social-link.discord(
					v-if="parsedCommunity.linkDiscord !== ''"
					:href="parsedCommunity.linkDiscord"
				)
					img(src="/assets/icons/discord.svg" alt="discord")
				a.social-link.youtube(
					v-if="parsedCommunity.linkYoutube !== ''"
					:href="parsedCommunity.linkYoutube"
				)
					img(src="/assets/icons/youtube.svg" alt="youtube")
				a.social-link.instagram(
					v-if="parsedCommunity.linkInstagram !== ''"
					:href="parsedCommunity.linkInstagram"
				)
					img(src="/assets/icons/instagram.svg" alt="instagram")
				a.social-link.webpage(
					v-if="parsedCommunity.linkWebpage !== ''"
					:href="parsedCommunity.linkWebpage"
				)
					img(src="/assets/icons/webpage.svg" alt="webpage")
		h1.title {{ parsedCommunity.displayName }}
		div.user-info
			b.username @{{ parsedCommunity.name }}
			span.date-created Created: <b>{{ dayjs(parsedCommunity.created) }}</b>
		div.info-blocks
			div.info-block(
				v-for="(infoBlock, index) of getFeatures()"
				:key="index"
			)
				b.stats {{ infoBlock.stats }}
				span.title {{ infoBlock.title }}
		p.description {{ parsedCommunity.description }}
		div.actions(v-if="!isUser")
			Button.action.create(text="Create poll" fill :url="`/create/poll?community=${parsedCommunity.name}`")
	div.polls
		h2.title {{ !polls ? "Communities" : "Community Polls" }}
		div.communities(v-if="!polls")
			CommunityItem(
				v-for="(community, index) of parsedCommunities"
				:key="index"
				:url="community.getUrl()"
				:name="community.name"
				:description="community.description"
				:stats="`${community.pollCount} polls created`"
				:bannerImage="community.bannerImage"
				:communityImage="community.logoImage"
			)
		div.polls-grid(v-else)
			ListPoll(
				v-for="(poll, index) of parsedPolls"
				:key="index"
				:url="poll.getUrl()"
				:title="poll.title"
				:name="poll.community.displayName"
				:stats="`@${poll.community.name}`"
				:image="poll.thumbUrl"
				:logoImage="poll.community.logoImage"
			)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 max-h-120 object-cover px-14;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-268 h-full pt-40px;
		div.top-block {
			@apply flex flex-row justify-between -mt-22 w-full;
			.profile-image {
				@apply object-cover object-center h-24 w-24 rounded-1 border-4 border-white;
			}
			div.social-links {
				@apply flex flex-row gap-2 mt-6;
				a.social-link {
					@apply h-12 w-12 -top-2 overflow-hidden;
					img {
						@apply object-cover object-center h-full w-full;
					}
				}
			}
		}
		h1.title {
			@apply text-6xl font-black m-0 mt-6 mb-2 text-black text-left;
		}
		div.user-info {
			@apply flex flex-row gap-4 text-sm;
			b,
			a {
				@apply font-bold;
			}
		}
		div.info-blocks {
			@apply flex flex-row my-6 gap-16;
			div.info-block {
				@apply flex flex-col justify-center items-center relative;
				&:before {
					@apply content-[''] absolute top-1/4 -right-3/10 h-1/2 w-1px bg-gray-200;
				}
				&:last-child:before {
					display: none;
				}
				b.stats {
					@apply text-2xl font-black;
				}
				span.title {
					@apply text-sm uppercase font-bold;
				}
			}
		}
		div.actions {
			@apply flex flex-row gap-6 mt-6 mb-12;
		}
	}
	.polls {
		@apply flex flex-col justify-center items-start z-2 pt-12 pb-24;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-black;
		}
		div.polls-grid {
			@apply grid gap-4 grid-cols-4;
		}
		div.communities {
			@apply grid gap-4 grid-cols-3 w-full pt-12 pb-24;
		}
	}
}
</style>
