<script lang="ts" setup>
interface Props {
	url: string
	name: string
	stats: string
	image: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.category-item(:href="url" target="_self")
	img(:src="image" alt="category image")
	div.right
		h3.name {{ name }}
		h3.stats {{ stats }}
</template>

<style lang="scss" scoped>
a.category-item {
	@apply flex flex-row justify-start gap-4 py-6 h-auto w-88
		rounded-md cursor-pointer box-border bg-gray-200;
	img {
		@apply h-16 w-16 object-cover object-center rounded-md ml-12 mr-2;
	}
	div.right {
		@apply flex flex-col gap-1 box-border;
		h3.name {
			@apply my-1 text-xl font-bold;
		}
		h3.stats {
			@apply font-bold text-sm;
		}
	}
}
</style>
