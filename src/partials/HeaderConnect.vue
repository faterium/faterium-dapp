<script lang="ts" setup>
import Swal from "sweetalert2"
import { web3Enable } from "@polkadot/extension-dapp"
import Button from "@components/inputs/Button.vue"

interface Props {
	user?: string
}
const props = defineProps<Props>()

const onClickConnect = async () => {
	const allInjected = await web3Enable("Faterium dApp")
	if (allInjected.length > 0) {
		Swal.fire({
			title: `Connected ${allInjected.length} account/s`,
			toast: true,
			icon: "success",
			position: "bottom-right",
			timer: 2000,
			showConfirmButton: false,
		})
	} else {
		Swal.fire({
			title: "No accounts connected or extension not found",
			toast: true,
			icon: "error",
			position: "bottom-right",
			timer: 2000,
			showConfirmButton: false,
		})
	}
}
</script>

<template lang="pug">
div.header-connect
	Button.action.connect(
		v-if="user"
		text="Connect" fill
		@click="onClickConnect"
	)
	div.signed-user
		img.picture(src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg")
		div.text
			span.name David Ackerman
			span.username @enfipy
</template>

<style lang="scss" scoped>
div.header-connect {
	@apply flex gap-4;
	.action {
		@apply py-2.5;
	}
	.signed-user {
		@apply flex gap-2 cursor-pointer;
		img.picture {
			@apply h-10 w-10 object-cover object-center rounded-1;
		}
		.text {
			@apply flex flex-col text-sm;
			.name {
				@apply font-bold;
			}
		}
	}
}
</style>
