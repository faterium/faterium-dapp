<script lang="ts" setup>
import Logo from "./Logo.vue"
</script>

<template lang="pug">
div.footer
	span.copyright(
		data-aos="zoom-in-right"
		data-aos-duration="1000"
		data-aos-delay="1500"
		data-aos-anchor=".content"
	) © 2022 Faterium. All rights reserved.
	span.author(
		data-aos="zoom-in-left"
		data-aos-duration="1000"
		data-aos-delay="1500"
		data-aos-anchor=".content"
	) Made with love by <a href="https://dodorare.com" target="_blank"><Logo /></a>
</template>

<style lang="scss" scoped>
div.footer {
	box-sizing: border-box;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 80px;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40px;

	font-size: 14px;

	span.author {
		display: flex;
		align-items: center;

		.logo {
			margin-left: 12px;
			height: 20px;
		}
	}
}

@media screen and (max-width: 660px) {
	div.footer {
		flex-direction: column-reverse;
		padding: 10px 0 20px;
	}
}
</style>
