<script lang="ts" setup>
interface Props {
	url: string
	title: string
	name: string
	stats: string
	image: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.list-poll(:href="url" target="_self")
	img.poll-image(:src="image" alt="poll image")
	div.bottom
		img.thumb(:src="image" alt="poll image")
		div.right
			h2.poll-title {{ title }}
			h3.name {{ name }}
			h3.stats {{ stats }}
</template>

<style lang="scss" scoped>
a.list-poll {
	@apply flex flex-col justify-start gap-4 h-auto w-64
		rounded-md cursor-pointer box-border;
	img.poll-image {
		@apply h-38 w-full object-cover object-center rounded-md;
	}
	div.bottom {
		@apply flex gap-3 leading-5;
		img.thumb {
			@apply h-10 w-10 object-cover object-center rounded-1 -top-2;
		}
		div.right {
			@apply flex flex-col;
			h2.poll-title {
				@apply font-bold break-normal;
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
