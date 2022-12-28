<script lang="ts" setup>
import Logo from "@components/Logo.vue"
</script>

<template lang="pug">
footer
	span.copyright © 2022 Faterium. All rights reserved.
	span.author
		| Made with love by
		a(href="https://dodorare.com" target="_blank"): Logo
</template>

<style lang="scss" scoped>
footer {
	@apply flex justify-between items-center box-border min-h-20 px-10 text-sm;

	span.author {
		@apply flex items-center;
		a {
			@apply ml-3;
		}
	}
}
@media screen and (max-width: 660px) {
	footer {
		@apply flex-col-reverse pt-3 px-0 pb-5;
	}
}
</style>
