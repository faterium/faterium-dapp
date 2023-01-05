<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import { Button, ListInput, ListItemVoting } from "@components/inputs"
import { connectPB, CommunityDetails } from "@utils/index"
import { connectToNode, voteOnPoll, collectFromPoll } from "@utils/Substrate"

interface Props {
	community: CommunityDetails
}
const props = defineProps<Props>()

const parsedCommunity = ref(
	Object.assign(new CommunityDetails(null), props.community),
)
</script>

<template lang="pug">
main.content.section
	img.preview(
		:src="parsedCommunity.imageBannerUrl"
		alt="poll preview"
	)
	div.wrapper
		div.top-block
			img.profile-image(
				:src="parsedCommunity.imageBannerUrl"
				alt="poll preview"
			)
			div.social-links
				a.social-link(
					v-for="(link, index) of [1, 2, 3]"
					:key="index"
				)
					img(
						:src="parsedCommunity.imageBannerUrl"
						alt="poll preview"
					)
		h1.title {{ parsedCommunity.displayName }}
		div.user-info
			b.username {{ parsedCommunity.name }}
			span.date-created Created: <b>1 Apr 2022</b>
		div.info-blocks
			div.info-block(
				v-for="(infoBlock, index) of [1, 2, 3, 4, 5]"
				:key="index"
			)
				b.stats 12.3k
				span.title Polls created
		p.description {{ parsedCommunity.description }}
		div.actions
			Button.action.explore.create(text="Explore" fill url="/communities")
			Button.action.explore.create(text="Explore" fill url="/communities")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 max-h-120 object-cover px-14;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-240 h-full pt-40px;
		div.top-block {
			@apply flex flex-row justify-between -mt-22 w-full;
			.profile-image {
				@apply object-cover object-center h-24 w-24 rounded-1 border-4 border-white;
			}
			div.social-links {
				@apply flex flex-row gap-2 mt-6;
				a.social-link {
					@apply h-12 w-12 rounded-1 -top-2 border-2 border-gray-200 overflow-hidden;
					img {
						@apply object-cover object-center h-full w-full;
					}
				}
			}
		}
		h1.title {
			@apply text-6xl font-black m-0 mt-6 mb-2 text-center text-black text-left;
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
			@apply flex flex-row gap-6 mt-6 mb-30;
		}
	}
}
</style>
