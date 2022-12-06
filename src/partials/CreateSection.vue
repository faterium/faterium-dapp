<script lang="ts" setup>
import { onMounted, ref } from "vue"
import dayjs from "dayjs"
import Swal from "sweetalert2"
import {
	Button,
	ListInput,
	MediaInput,
	FormInput,
	ListItemOption,
	ListItemBeneficiary,
} from "@components/inputs"
import { connectPB, PocketBase } from "@utils/index"
import {
	connectToNode,
	ApiPromise,
	getAccounts,
	web3FromSource,
} from "@utils/Substrate"

const fileFormData = new FormData()
const submitDisabled = ref(false)
const formData = ref({
	title: "",
	image: "",
	description: "",
	options: [""],
	dateStart: "",
	dateEnd: "",
	currency: "",
	goal: "",
	beneficiaries: [] as string[][],
})

const fileChanged = (event: Event) => {
	const element = event.target as HTMLInputElement
	const fileList: FileList | null = element.files
	for (let i = 0; i < fileList.length; i += 1) {
		fileFormData.append("file", fileList.item(i))
	}
}
const uploadFile = async (pb: PocketBase) => {
	const result = await pb.collection("images").create(fileFormData)
	console.log("Upload file result", result)
	return result
}
const uploadPollDetails = async (pb: PocketBase, data: any) => {
	const result = await pb.collection("polls").create(data)
	console.log("Upload poll result", result)
	return result
}
const submit = async () => {
	submitDisabled.value = true
	const pb = connectPB()
	Swal.fire({
		title: "Please wait, uploading image to server and IPFS...",
		toast: true,
		position: "bottom-right",
		timerProgressBar: true,
		showConfirmButton: false,
		didOpen: () => Swal.showLoading(null),
	})
	const image = await uploadFile(pb).catch((err) => {
		Swal.fire({
			title: "Error on image upload!",
			text: `Server returned ${err.status} error.
			It may happen if you uploaded image that is not specified or invalid!`,
			icon: "error",
			confirmButtonText: "I will try again!",
		})
	})
	if (!image) return
	Swal.fire({
		title: "Image successfully uploaded to the server and IPFS!",
		toast: true,
		icon: "success",
		position: "bottom-right",
		showConfirmButton: false,
	})
	const formatDate = (d) =>
		// Format of: "2022-01-01 10:00:00.123Z"
		dayjs(d).format("YYYY-MM-DD HH:mm:ss.SSS[Z]")
	const data = {
		title: formData.value.title,
		description: formData.value.description,
		options: JSON.stringify(formData.value.options),
		dateStart: formatDate(formData.value.dateStart),
		dateEnd: formatDate(formData.value.dateEnd),
		imageCid: image.cid,
		image: image.id,
	}
	const poll = await uploadPollDetails(pb, data).catch((err) => {
		Swal.fire({
			title: "Error during poll details upload!",
			text: `Server returned ${err.status} error.
			It may happen if you specified invalid poll details!`,
			icon: "error",
			confirmButtonText: "Cool, let me fix it!",
		})
	})
	if (!poll) return
	// Call substrate CreatePoll extrinsic
	const accounts = await getAccounts()
	const account = accounts[0]
	console.log("account", account)
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	const beneficiaries = formData.value.beneficiaries.map(
		([address, interest]) => [
			address,
			Math.trunc(parseFloat(interest) * 100),
		],
	)
	const api = await connectToNode()
	console.log("beneficiaries", beneficiaries)
	const settings = api.createType("RewardSettings", "None")
	const currency = api.createType("PollCurrency", "Native")
	const extrinsic = api.tx.fateriumPolls.createPoll(
		poll.cid,
		beneficiaries,
		settings,
		parseInt(formData.value.goal, 10),
		formData.value.options.length,
		currency,
		6000,
		8000,
	)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ status }) => {
				if (status.isInBlock) {
					Swal.fire({
						title: "Poll successfully created!",
						toast: true,
						icon: "success",
						position: "bottom-right",
						showConfirmButton: false,
					})
					Swal.fire({
						title: "Poll successfully created!",
						text: `Completed at block hash #${status.asInBlock.toString()}!`,
						icon: "success",
						confirmButtonText: "Cool, take me there!",
					}).then((res) => {
						if (res.isConfirmed) {
							window.location.replace(`/polls/${poll.id}`)
						}
					})
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Current status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
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
const submitButton = () =>
	submit()
		.then(() => {
			submitDisabled.value = false
		})
		.catch(() => {
			submitDisabled.value = false
		})
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h1.title Create poll
		p.description * Required fields
		form.create-form(type="group" @submit.prevent="submitButton")
			FormInput.title(
				title="Poll title"
				v-model="formData.title"
				placeholder="e.g. What poll to make?"
				type="text"
				required
			) Title of the poll, will be shown on all views.
			MediaInput.image(
				title="Preview image"
				type="file"
				@change.stop="fileChanged"
				required
			)
				| File types supported: JPG, PNG, GIF, SVG.
				br
				| Max size: 10 MB. Preferred aspect ratio: 2.39:1 or 16:9.
			FormInput.description(
				title="Description of poll"
				placeholder="Provide a detailed description of your poll."
				v-model="formData.description"
				textarea
			)
				| The description will be included on the poll's detail page underneath its image.
				br
				| Markdown syntax is supported.
			ListInput.options(
				:itemComponent="ListItemOption"
				title="Voting options"
				:inputSettings=`[{
					placeholder: "e.g. Some awesome voting option.",
				}]`
				v-model="formData.options"
				addText="add an option"
				:onItemAdd="function() { formData.options.push('') }"
				required
			) Voting options for the poll.
			FormInput.start-date(
				title="Start date"
				v-model="formData.dateStart"
				type="datetime-local"
				required
			) When the poll will start. If nothing selected - poll will start right after the creation.
			FormInput.end-date(
				title="End date"
				v-model="formData.dateEnd"
				type="datetime-local"
				required
			) When the poll will end.
			FormInput.currency(
				title="Payment currency"
				v-model="formData.currency"
				type="text"
				required
			) These tokens can be used to vote on this poll.
			FormInput.goal(
				title="Goal amount"
				placeholder="e.g. 999.999999"
				v-model="formData.goal"
				type="number"
				required
			) The minimum target amount of tokens to make poll happen.
			ListInput.beneficiaries(
				:itemComponent="ListItemBeneficiary"
				title="Poll beneficiaries"
				:inputSettings=`[{
					placeholder: "e.g. FvnazYM5KAetYpXoVDfqt9WFcJogKbekXVJ3Fz5oW2Dv82P",
					flex: 4,
				}, {
					placeholder: "e.g. 10.0%",
					flex: 1,
				}]`
				v-model="formData.beneficiaries"
				addText="add a beneficiary"
				:onItemAdd="function () { formData.beneficiaries.push(['', '10.00']) }"
			)
				| Those who will get the winning deposit and their interest.
				br
				| Interest sum of all beneficiaries should be min=0 and max=100%.
			div.actions
				Button.action.create(
					text="create poll"
					submit fill
					:disabled="submitDisabled"
				)
				//- Button.action.back(text="cancel" fill url="/")
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-full w-100vw relative justify-center items-center;
	.wrapper {
		@apply flex flex-col justify-start items-start z-2 w-140 h-full pt-100px;
		h1.title {
			@apply text-4xl font-bold m-0 text-center text-black;
		}
		.create-form {
			@apply my-6 w-full;
			& > div {
				@apply my-4;
			}
			div.actions {
				@apply flex flex-row gap-4 mt-6 pb-20;
			}
		}
	}
}
</style>
