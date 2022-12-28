<script lang="ts" setup>
interface Props {
	url: string
	title: string
	name: string
	status: string
	stats: string
	image: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.category-item(:href="url" target="_self")
	div.image
		img(:src="image" alt="category image")
		span.status {{ status }}
	div.bottom
		img.thumb(:src="image" alt="category image")
		div.info
			h2.poll-title {{ title }}
			h3.name {{ name }}
			h3.stats {{ stats }}
</template>

<style lang="scss" scoped>
a.category-item {
	@apply flex flex-col justify-start gap-4 h-auto w-88
		rounded-md cursor-pointer box-border bg-gray-200;
	div.image {
		@apply relative;
		img {
			@apply h-54 w-full object-cover object-center rounded-md rounded-b-none;
		}
		span.status {
			@apply bg-red-400 rounded-lg py-1 px-3 text-xs font-bold text-white
				absolute top-2 left-2;
		}
	}
	div.bottom {
		@apply flex flex-col gap-3 box-border -mt-12 px-6 pb-6;
		img.thumb {
			@apply h-16 w-16 rounded-1 -top-2 border-2 border-gray-200;
		}
		div.info {
			@apply flex flex-col leading-5;
			h2.poll-title {
				@apply font-bold text-2xl break-normal;
			}
			h3.name {
				@apply my-1 text-sm;
			}
			h3.stats {
				@apply font-bold text-sm;
			}
		}
	}
}
</style>
