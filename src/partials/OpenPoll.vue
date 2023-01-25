<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import { Button, ListInput, ListItemVoting } from "@components/inputs"
import { connectPB, PollDetails } from "@utils/index"
import { connectToNode, voteOnPoll, collectFromPoll } from "@utils/Substrate"

interface Props {
	poll: PollDetails
}
const props = defineProps<Props>()

const parsedPoll = ref(Object.assign(new PollDetails(null), props.poll))

const loadSubstratePoll = async () => {
	const pid = parsedPoll.value.pollId
	if (!pid) return
	const api = await connectToNode()
	const result = await api.query.fateriumPolls.pollDetailsOf(pid)
	if (!result.toJSON()) return
	parsedPoll.value.details = result.toJSON() as any
	const options = parsedPoll.value.getOptions()
	parsedPoll.value.options = [...options]
	console.log("details", parsedPoll.value.details)
}
// Call substrate FateriumPolls vote extrinsic
const vote = async () => {
	await voteOnPoll(parsedPoll.value).catch((err) => console.error(err))
	await loadSubstratePoll()
	setTimeout(() => {
		loadSubstratePoll()
	}, 2000)
}
// Call substrate FateriumPolls collect extrinsic
const collect = async () => {
	await collectFromPoll(parsedPoll.value).catch((err) => console.error(err))
}
onMounted(async () => {
	await loadSubstratePoll()
})
</script>

<template lang="pug">
main.content.section
	img.preview(
		:src="parsedPoll.imageUrl"
		alt="poll preview"
	)
	div.wrapper
		div.top-block
			a(:href="`/communities/${parsedPoll.community.name}`"): img.profile-image(
				:src="parsedPoll.community.logoImage"
				alt="poll preview"
			)
		h1.title {{ parsedPoll.title }}
		p.description {{ parsedPoll.description }}
		div.info-block
			span.date-start Start: <b>{{ parsedPoll.dateStartFrom() }}</b>
			span.date-end End: <b>{{ parsedPoll.dateEndFrom() }}</b>
		div.info-block
			span.date-start Volume: <b>{{ parsedPoll.getCapital() }}</b>
			span.date-end Status: <b>{{ parsedPoll.getStatus() }}</b>
		div.options
			ListInput.voting-options(
				:itemComponent="ListItemVoting"
				title="Voting options"
				:inputSettings=`[]`
				v-model="parsedPoll.options"
			)
		div.actions
			Button.action.create(
				text="vote" fill
				@click.prevent="vote"
			)
			Button.action.back(
				text="collect" fill
				@click.prevent="collect"
			)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 max-h-120 object-cover;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-160 h-full pt-40px;
		div.top-block {
			@apply flex flex-row justify-between -mt-22 w-full;
			.profile-image {
				@apply object-cover object-center h-24 w-24 rounded-xl border-4 border-white;
			}
		}
		h1.title {
			@apply text-4xl font-bold m-0 mb-2 text-center text-black text-left;
		}
		div.info-block {
			@apply flex flex-row gap-5 mt-3 w-full;
			color: #9a9ba2;
			b {
				@apply text-black font-bold;
			}
		}
		div.options {
			@apply my-12 w-full;
		}
		div.actions {
			@apply flex flex-row gap-4 mb-10;
			.create {
				@apply bg-green-500 hover:bg-green-400;
			}
		}
	}
}
</style>
