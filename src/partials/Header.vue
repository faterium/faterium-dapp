<script lang="ts" setup>
import Button from "@components/inputs/Button.vue"
import { web3Enable } from "@polkadot/extension-dapp"

const onClickConnect = async () => {
	const allInjected = await web3Enable("Faterium dApp")
	// eslint-disable-next-line no-console
	console.log(`Connected ${allInjected.length} account/s`)
}
</script>

<template lang="pug">
header.header
	a.logo(title="Main" href="/" rel="noopener") faterium
	div.actions
		Button.action.create(text="Create" fill url="/create-poll")
		Button.action.connect(text="Connect" fill @click="onClickConnect")
</template>

<style lang="scss" scoped>
.header {
	@apply flex items-center fixed w-full z-15 box-border justify-between
		<sm:(bottom-4 px-8)
		sm:(bg-black-900 top-0 h-60px px-10)
		lg:(px-15)
		2xl:(h-80px px-20);
	background: #eee;
	.logo {
		@apply font-bold text-2xl <sm:(hidden h-32px)
			lg:(mr-20px)
			xl:(mr-36px)
			2xl:(h-42px);
		> svg {
			@apply sm:(h-32px)
				2xl:(h-42px);
		}
	}
	div.actions {
		@apply flex gap-4;
		.action {
			@apply py-2.5;
		}
	}
	.logo-icon {
		@apply w-48px h-48px bg-black-900 rounded-full flex items-center justify-center
			sm:(hidden);
	}
	.burger {
		@apply w-48px h-48px bg-black-900 rounded-full cursor-pointer
			flex items-center justify-center
			lg:(hidden);
	}
}
</style>
