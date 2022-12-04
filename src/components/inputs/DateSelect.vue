<script lang="ts" setup>
interface Props {
	title: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
div.text-input
	span.title {{ title }}
	input(type="text")
</template>

<style lang="scss" scoped>
div.text-input {
	@apply flex flex-col justify-start items-start;
	span.title {
		@apply text-base font-bold;
	}
}
</style>
