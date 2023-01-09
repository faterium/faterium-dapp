<script lang="ts" setup>
import Swal from "sweetalert2"
import { web3Enable } from "@polkadot/extension-dapp"
import Button from "@components/inputs/Button.vue"
import FateriumLogo from "@components/logos/FateriumLogo.vue"

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
header.header
	FateriumLogo
	div.actions
		Button.action.create(text="Create" fill url="/create")
		Button.action.connect(text="Connect" fill @click="onClickConnect")
</template>

<style lang="scss" scoped>
.header {
	@apply flex items-center fixed w-full z-15 box-border justify-between bg-white
		<sm:(bottom-4 px-8)
		sm:(bg-black-900 top-0 h-60px px-10)
		lg:(px-15)
		2xl:(h-80px px-20);
	div.actions {
		@apply flex gap-4;
		.action {
			@apply py-2.5;
		}
	}
}
</style>
