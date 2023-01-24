<script lang="ts" setup>
import HeaderConnect from "@partials/HeaderConnect.vue"
import FateriumLogo from "@components/logos/FateriumLogo.vue"
import Button from "@components/inputs/Button.vue"
</script>

<template lang="pug">
header.header
	FateriumLogo
	div.actions
		Button.action.create(text="Create" fill url="/create")
		HeaderConnect
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
