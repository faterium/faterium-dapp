<script lang="ts" setup>
import { Button } from "@components/inputs"
import CategoryItem from "@components/CategoryItem.vue"
import { CategoryDetails } from "@utils/index"

interface Props {
	marginTop?: boolean
	categories: CategoryDetails[]
}
const props = defineProps<Props>()

const getCategories = () => {
	// Cast object to class
	return props.categories.map((val) =>
		Object.assign(new CategoryDetails(null), val),
	)
}
</script>

<template lang="pug">
main.content.section(:class="{ marginTop }")
	div.wrapper
		h2.title Featured categories
		div.categories
			CategoryItem(
				v-for="(cat, index) of getCategories()"
				:key="index"
				:url="cat.getCategoryUrl()"
				:name="cat.name"
				:stats="`${cat.pollCount} communities`"
				:image="cat.image"
			)
		Button.action.explore.create(
			v-if="!marginTop"
			text="See more" fill url="/categories"
		)
</template>

<style lang="scss" scoped>
.content {
	@apply flex flex-col h-full w-full relative justify-start items-center py-12 bg-light-400;
	.wrapper {
		@apply flex flex-col justify-center items-center z-2;
		h2.title {
			@apply text-4xl font-black m-0 mb-8 text-center text-black;
		}
		div.categories {
			@apply grid gap-4 grid-cols-3;
		}
		.explore {
			@apply mt-8 py-4 px-16 rounded-4xl bg-transparent border-green-500 text-green-500
				hover:text-white hover:bg-green-500;
		}
	}
	&.marginTop {
		@apply pt-24 min-h-200 h-auto bg-white;
		.wrapper div.categories {
			@apply pb-28;
		}
	}
}
</style>
