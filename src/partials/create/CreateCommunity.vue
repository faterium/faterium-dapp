<script lang="ts" setup>
import { ref } from "vue"
import dayjs from "dayjs"
import Swal from "sweetalert2"
import {
	Button,
	ListInput,
	MediaInput,
	FormInput,
	FormSelectInput,
	ListItemOption,
	ListItemBeneficiary,
} from "@components/inputs"
import { connectPB, PocketBase, PollDetails } from "@utils/index"
import { substrateCreatePoll } from "@utils/Substrate"
import CreatePage from "./basePage.vue"

interface Props {
	community: string
}
const props = defineProps<Props>()

const fileFormData = new FormData()
const submitDisabled = ref(false)
const formData = ref({
	title: "",
	image: "",
	description: "",
	options: ["", ""],
	dateStart: "",
	dateEnd: "",
	currency: {
		items: {
			Native: null,
			Asset: "",
		},
		selected: "Native",
	},
	goal: "",
	multipleVotes: {
		items: {
			Allow: null,
			Disallow: null,
		},
		selected: "Allow",
	},
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
	console.log("formData", formData)
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
	const data = {
		title: formData.value.title,
		description: formData.value.description,
		options: JSON.stringify(formData.value.options),
		dateStart: PollDetails.formatDate(
			formData.value.dateStart === ""
				? dayjs()
				: dayjs(formData.value.dateStart, "YYYY-MM-DD HH:mm:ss.SSS[Z]"),
		),
		dateEnd: PollDetails.formatDate(
			dayjs(formData.value.dateEnd, "YYYY-MM-DD HH:mm:ss.SSS[Z]"),
		),
		image: image.id,
	}
	const pollRes = await uploadPollDetails(pb, data).catch((err) => {
		Swal.fire({
			title: "Error during poll details upload!",
			text: `Server returned ${err.status} error.
			It may happen if you specified invalid poll details!`,
			icon: "error",
			confirmButtonText: "Cool, let me fix it!",
		})
	})
	if (!pollRes) return
	const poll = new PollDetails(pollRes)
	// Call substrate CreatePoll extrinsic
	await substrateCreatePoll(
		pb,
		poll,
		formData.value.beneficiaries,
		parseInt(formData.value.goal, 10),
		formData.value.options.length,
		{
			name: formData.value.currency.selected,
			value: formData.value.currency.items[
				formData.value.currency.selected
			],
		},
		formData.value.multipleVotes.selected === "Allow",
	).catch((reason) => {
		console.error(reason)
		Swal.fire({
			title: "Error during substrate poll creation!",
			text: `Got the following error: ${reason}.`,
			icon: "error",
			confirmButtonText: "Cool, let me try again!",
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
BasePage(title="Create community" :submitButton="submitButton")
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
		:minCount="2"
		:onItemAdd="function() { formData.options.push('') }"
		required
	) Voting options for the poll.
	FormInput.start-date(
		title="Start date"
		v-model="formData.dateStart"
		type="datetime-local"
	) When the poll will start. If nothing selected - poll will start right after the creation.
	FormInput.end-date(
		title="End date"
		v-model="formData.dateEnd"
		type="datetime-local"
		required
	) When the poll will end.
	FormSelectInput.currency(
		title="Payment currency"
		placeholder="e.g. 123"
		v-model="formData.currency"
		required
	) What currency will be used to vote on this poll. Can be Native or AssetId.
	FormInput.goal(
		title="Goal amount"
		placeholder="e.g. 999.999999"
		v-model="formData.goal"
		type="number"
		required
	) The minimum target amount of tokens to make poll happen.
	FormSelectInput.multiple-votes(
		title="Multiple votes"
		v-model="formData.multipleVotes"
		required
	) Make it possible to vote for multiple options.
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
		| Specify those who will get the winning deposit and their interest.
		br
		| Interest sum of all beneficiaries should be min=0% and max=100%.
	div.actions
		Button.action.create(
			text="create poll"
			submit fill
			:disabled="submitDisabled"
		)
		//- Button.action.back(text="cancel" fill url="/")
</template>
