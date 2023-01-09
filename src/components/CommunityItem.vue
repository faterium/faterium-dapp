<script lang="ts" setup>
interface Props {
	url: string
	name: string
	description: string
	status: string
	stats: string
	bannerImage: string
	communityImage: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.community-item(:href="url" target="_self")
	div.image
		img(:src="bannerImage" alt="community banner")
		span.status {{ status }}
	div.bottom
		img.thumb(:src="communityImage" alt="community image")
		div.info
			h2.name {{ name }}
			p.description {{ description }}
			h3.stats {{ stats }}
</template>

<style lang="scss" scoped>
a.community-item {
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
		@apply flex flex-col gap-3 box-border -mt-12 px-6 pb-6 z-2;
		img.thumb {
			@apply object-cover object-center h-16 w-16 rounded-1 -top-2 border-2 border-gray-200;
		}
		div.info {
			@apply flex flex-col leading-5;
			h2.name {
				@apply font-bold text-2xl break-normal;
			}
			p.description {
				@apply my-1 text-sm whitespace-pre-wrap overflow-hidden text-ellipsis h-10;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			h3.stats {
				@apply font-bold text-sm;
			}
		}
	}
}
</style>
