<script lang="ts" setup>
import { web3Enable } from "@polkadot/extension-dapp"
import PocketBase from "pocketbase"

const onClickConnect = async () => {
	const allInjected = await web3Enable("Faterium Future dApp")
	// eslint-disable-next-line no-console
	console.log(`Connected ${allInjected.length} account/s`)
}
const onClick = async () => {
	const pb = new PocketBase("https://dapp-api.faterium.com")
	// const authData = await pb.admins.authWithPassword(
	// 	"test@faterium.com",
	// 	"0123456789",
	// )
	const result = await pb.collection("images").getList(1, 20, {})
	// eslint-disable-next-line no-console
	console.log(result)
}
</script>

<template lang="pug">
main.content.section
	div.wrapper
		h2.title Faterium
		div.button-wrapper
			div.link.substrate(@click="onClickConnect")
				span.link_inner Connect to Polkadot
			div.link.pocketbase(@click="onClick")
				span.link_inner Connect to PocketBase
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-100vh w-100vw relative justify-center items-center;

	.wrapper {
		@apply flex flex-col justify-center items-center z-2;

		.title {
			@apply text-8xl leading-none m-0 mb-8 text-center;
		}

		.button-wrapper {
			@apply flex flex-col gap-3 justify-center items-center;
		}

		.link {
			@apply cursor-pointer z-0 text-white uppercase no-underline rounded-4xl font-normal text-sm py-17px px-1px;
			background: linear-gradient(
				93deg,
				#ce3131 0.11%,
				#d65b4d 25.06%,
				#c56217 50%,
				#d5af51 74.8%,
				#e9c681 99.76%
			);
			transition: all 0.8s;

			span.link_inner {
				@apply rounded-4xl py-4 px-15;
				background: hsla(260, 40%, 5%, 1);
				transition: all 0.4s;
			}

			&:hover {
				background: linear-gradient(
					93deg,
					#fff 0.11%,
					#fff 25.06%,
					#fff 50%,
					#fff 74.8%,
					#fff 99.76%
				);
				span.link_inner {
					@apply bg-white text-black;
				}
			}
		}
	}
}
</style>
