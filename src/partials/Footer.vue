<script lang="ts" setup>
import DodoRareLogo from "@components/logos/DodoRareLogo.vue"
import FateriumLogo from "@components/logos/FateriumLogo.vue"
</script>

<template lang="pug">
footer
	div.top
		div.block
			FateriumLogo
			p.description Faterium is a decentralized voting platform that provides business tools for content creators to monetize their projects and directly engage the community on important decisions.
		div.block
			h3.title Pages
			a.link(href="/categories" target="_self") Categories
			a.link(href="/communities" target="_self") Communities
			a.link(href="/create" target="_self") Create
		div.block
			h3.title Legal
			a.link(href="/" target="_blank") Privacy Policy
			a.link(href="/" target="_blank") Terms of use
		div.block
			h3.title Our social
			a.link(href="https://twitter.com/faterium" target="_blank") Twitter
			a.link(href="https://twitter.com/faterium" target="_blank") Telegram
			a.link(href="https://twitter.com/faterium" target="_blank") Discord
	div.bottom
		span.copyright © 2022 Faterium. All rights reserved.
		span.author
			| Made with love by
			a(href="https://dodorare.com" target="_blank"): DodoRareLogo
</template>

<style lang="scss" scoped>
footer {
	@apply flex flex-col justify-between px-15 text-sm bg-black text-white;
	div.top {
		@apply flex flex-row justify-between my-16;
		div.block {
			@apply flex flex-col last:mr-20;
			h3.title {
				@apply text-2xl font-bold;
			}
			a.link {
				@apply text-xs font-bold uppercase mt-6 opacity-60 tracking-widest
					transition-all hover:opacity-80;
			}
			p.description {
				@apply mt-2 max-w-70;
			}
		}
	}
	div.bottom {
		@apply flex justify-between items-center box-border mb-16;
		span.author {
			@apply flex items-center;
			a {
				@apply ml-3;
			}
		}
	}
}
</style>
