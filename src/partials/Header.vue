<script lang="ts" setup>
import Swal from "sweetalert2"
import { web3Enable } from "@polkadot/extension-dapp"
import Button from "@components/inputs/Button.vue"

const onClickConnect = async () => {
	const allInjected = await web3Enable("Faterium dApp")
	Swal.fire({
		title: `Connected ${allInjected.length} account/s`,
		toast: true,
		icon: "success",
		position: "bottom-right",
		timer: 2000,
		showConfirmButton: false,
	})
}
</script>

<template lang="pug">
header.header
	a.logo(title="Main" href="/" rel="noopener")
		| faterium
		span.badge pre-alpha
	div.actions
		Button.action.create(text="Create" fill url="/create-poll")
		Button.action.connect(text="Connect" fill @click="onClickConnect")
</template>

<style lang="scss" scoped>
.header {
	@apply flex items-center fixed w-full z-15 box-border justify-between bg-white
		<sm:(bottom-4 px-8)
		sm:(bg-black-900 top-0 h-60px px-10)
		lg:(px-15)
		2xl:(h-80px px-20);
	.logo {
		@apply font-black text-2xl <sm:(hidden h-32px) flex items-center gap-2
			lg:(mr-20px)
			xl:(mr-36px)
			2xl:(h-42px);
		span.badge {
			@apply font-bold bg-dark-200 text-light-100 px-3 py-1
				rounded-lg text-sm h-min;
		}
	}
	div.actions {
		@apply flex gap-4;
		.action {
			@apply py-2.5;
		}
	}
}
</style>
