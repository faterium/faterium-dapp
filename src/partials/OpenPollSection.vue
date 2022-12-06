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

const votes = ref([])

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
	const queryResult = await Promise.all([
		api.query.system.number(),
		api.query.timestamp.now(),
		api.query.fateriumPolls.pollCount(),
	])
	console.log("query", queryResult)
	const blockNumber = parseInt(queryResult[0].toString(), 10)
	const now = parseInt(queryResult[1].toString(), 10)
	const pollId = parseInt(queryResult[2].toString(), 10)

	const extrinsic = api.tx.fateriumPolls.vote(props.poll.pollId, [])
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
						confirmButtonText: "Cool, take me there!",
					})
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 5000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: any) => {
			Swal.fire({
				title: "Error during poll creation transaction!",
				text: `Server returned the following error: ${error}`,
				icon: "error",
				confirmButtonText: "Cool, let me fix it!",
			})
		})
}
</script>

<template lang="pug">
main.content.section
	img.preview(
		:src="props.poll.imageUrl"
		alt="poll preview"
	)
	div.wrapper
		h1.title {{ props.poll.title }}
		p.description {{ props.poll.description }}
		div.info
			span.date-start Created: <b>{{ dayjs(props.poll.dateStart).format("YYYY-MM-DD") }}</b>
			span.date-end Will end on: <b>{{ dayjs(props.poll.dateEnd).format("YYYY-MM-DD") }}</b>
		div.options
			ListInput.voting-options(
				:itemComponent="ListItemVoting"
				title="Voting options"
				:inputSettings=`[]`
				v-model="props.poll.options"
			)
				| Specify those who will get the winning deposit and their interest.
				br
				| Interest sum of all beneficiaries should be min=0% and max=100%.
		div.actions
			Button.action.create(
				text="vote" fill
				@click.prevent="voteOnPoll"
			)
			Button.action.back(text="collect" fill)
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
		div.info {
			@apply flex flex-row gap-20 mt-3 w-full;
			color: #9a9ba2;
			b {
				color: black;
			}
		}
		div.options {
			@apply my-12 w-full;
		}
		div.actions {
			@apply flex flex-row gap-4 mb-10;
			.create {
				@apply bg-green-500;
				&:hover {
					@apply bg-green-400;
				}
			}
		}
	}
}
</style>
