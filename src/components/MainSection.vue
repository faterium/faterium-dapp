<script lang="ts" setup>
import { web3Enable } from "@polkadot/extension-dapp"

const onClick = async () => {
	// const { web3Enable } = require("@polkadot/extension-dapp")
	const allInjected = await web3Enable("Faterium Future dApp")
	alert("Connected")
}
</script>

<template lang="pug">
main.content.section
	div.content--canvas
	div.wrapper(data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="500")
		h2.title Faterium
		div.link.connect(@click="onClick")
			span.link_inner Connect to Polkadot
</template>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	position: relative;
	justify-content: center;
	align-items: center;
	position: relative;

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;

		.title {
			font-size: 96px;
			line-height: 1;
			text-align: center;
			margin: 0 0 30px;
		}

		.link {
			cursor: pointer;
			z-index: 0;
			background: linear-gradient(
				93deg,
				#ce3131 0.11%,
				#d65b4d 25.06%,
				#c56217 50%,
				#d5af51 74.8%,
				#e9c681 99.76%
			);
			color: white;
			text-transform: uppercase;
			text-decoration: none;
			border-radius: 30px;
			font-weight: 400;
			font-size: 14px;
			transition: all 0.8s;
			padding: 17px 1px;

			span.link_inner {
				border-radius: 30px;
				background: hsla(260, 40%, 5%, 1);
				padding: 16px 60px;
				transition: all 0.4s;
			}

			&:hover {
				background: white;

				background: linear-gradient(
					93deg,
					#fff 0.11%,
					#fff 25.06%,
					#fff 50%,
					#fff 74.8%,
					#fff 99.76%
				);
				span.link_inner {
					background: rgb(255, 255, 255);
					color: black;
				}
			}
		}
	}
}
</style>
