<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import { Button, ListInput, ListItemVoting } from "@components/inputs"
import { connectPB, PollDetails } from "@utils/index"
import { connectToNode, getAccounts, web3FromSource } from "@utils/Substrate"

interface Props {
	poll: PollDetails
}
const props = defineProps<Props>()

const parsedPoll = ref(Object.assign(new PollDetails(null), props.poll))

// Call substrate FateriumPolls Vote extrinsic
const voteOnPoll = async () => {
	const accounts = await getAccounts()
	const account = accounts[0]
	console.log("account", account)
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	// Connect to our substrate node
	const api = await connectToNode()
	const extrinsic = api.tx.fateriumPolls.vote(
		parsedPoll.value.pollId,
		parsedPoll.value.votingOptions(),
	)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ status }) => {
				if (status.isInBlock) {
					Swal.close()
					Swal.fire({
						title: "Successfully voted!",
						text: `Completed at block hash #${status.asInBlock.toString()}!`,
						icon: "success",
						confirmButtonText: "Cool!",
					})
				} else if (status.isFinalized) {
					// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: any) => {
			Swal.fire({
				title: "Error during vote transaction!",
				text: `Server returned the following error: ${error}`,
				icon: "error",
				confirmButtonText: "Cool, let me fix it!",
			})
		})
}
// Call substrate FateriumPolls Vote extrinsic
const collectFromPoll = async () => {
	const accounts = await getAccounts()
	const account = accounts[0]
	console.log("account", account)
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	// Connect to our substrate node
	const api = await connectToNode()
	const extrinsic = api.tx.fateriumPolls.collect(parsedPoll.value.pollId)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ status }) => {
				if (status.isInBlock) {
					Swal.close()
					Swal.fire({
						title: "Successfully collected!",
						text: `Completed at block hash #${status.asInBlock.toString()}!`,
						icon: "success",
						confirmButtonText: "Cool!",
					})
				} else if (status.isFinalized) {
					// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: any) => {
			Swal.fire({
				title: "Error during collect transaction!",
				text: `Server returned the following error: ${error}`,
				icon: "error",
				confirmButtonText: "Cool, let me fix it!",
			})
		})
}
const loadSubstratePoll = async () => {
	const pid = parsedPoll.value.pollId
	if (!pid) return
	const api = await connectToNode()
	const result = await api.query.fateriumPolls.pollDetailsOf(pid)
	parsedPoll.value.details = result.toJSON() as any
	const options = parsedPoll.value.getOptions()
	parsedPoll.value.options = [...options]
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
		h1.title {{ parsedPoll.title }}
		p.description {{ parsedPoll.description }}
		div.info-block
			span.date-start Start: <b>{{ parsedPoll.dateEndFrom() }}</b>
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
				@click.prevent="voteOnPoll"
			)
			Button.action.back(
				text="collect" fill
				@click.prevent="collectFromPoll"
			)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col w-100vw relative justify-center items-center;
	img.preview {
		@apply mt-60px w-screen max-h-120 max-h-120 object-cover;
	}
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-140 h-full pt-40px;
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
