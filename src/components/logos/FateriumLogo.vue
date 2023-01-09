<template lang="pug">
a.logo(href="/" rel="noopener")
	| faterium
	span.badge pre-alpha
</template>

<style lang="scss" scoped>
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
</style>
