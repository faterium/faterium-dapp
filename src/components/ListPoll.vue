<script lang="ts" setup>
interface Props {
	url: string
	title: string
	image: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.list-poll(:href="url" target="_self")
	img.poll-image(:src="image" alt="poll image")
	h2.poll-title {{ title }}
</template>

<style lang="scss" scoped>
a.list-poll {
	@apply flex flex-row justify-start items-center gap-4 h-20 w-full
		bg-light-50 rounded-md cursor-pointer box-border;
	img.poll-image {
		@apply h-20 w-30 object-cover object-center rounded-md;
	}
	h2.poll-title {
		@apply mr-4 font-bold break-normal;
	}
}
</style>
