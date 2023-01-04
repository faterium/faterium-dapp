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
		h1.title {{ parsedCommunity.displayName }}
		div.info-block
			span.username Username: <b>{{ parsedCommunity.name }}</b>
			span.date-created Created: <b>1 Apr 2022</b>
		p.description {{ parsedCommunity.description }}
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 max-h-120 object-cover px-14;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-240 h-full pt-40px;
		h1.title {
			@apply text-6xl font-black m-0 mb-2 text-center text-black text-left;
		}
	}
}
</style>
