<script lang="ts" setup>
interface Props {
	itemComponent: any
	title: string
	inputSettings: any[]
	modelValue: any[]
	minCount?: number
	required?: boolean
	addText?: string
	onItemAdd?: Function
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

const onRemove = (id: number) => {
	const newData = props.modelValue
	newData.splice(id, 1)
	emit("update:modelValue", newData)
}
</script>

<template lang="pug">
div.list-input
	h3.title
		| {{ title }}
		span.optional {{ required ? "" : "(optional)" }}
	div.description: slot
	div.list-items
		component(
			v-bind:is="itemComponent"
			v-for="(_, index) in modelValue"
			:key="index"
			:inputSettings="inputSettings"
			v-model="modelValue[index]"
			:onRemove="() => onRemove(index)"
			:removeButton="index < minCount"
		)
	div.bottom
		div.add-option(v-if="addText" @click.prevent="onItemAdd")
			span.add +
			span.text {{ addText }}
</template>

<style lang="scss" scoped>
div.list-input {
	@apply flex flex-col justify-start items-start;
	h3.title {
		@apply text-base font-bold;
		.optional {
			@apply opacity-30 ml-1;
		}
	}
	div.description {
		@apply text-sm font-normal;
	}
	div.list-items {
		@apply flex flex-col gap-2 mt-4 w-full;
	}
	div.add-option {
		@apply flex flex-row items-center pt-2 bg-transparent border-none text-dark-300
			uppercase text-sm font-bold cursor-pointer text-center;
		&:hover {
			@apply text-dark-300;
			span.add {
				@apply bg-slate-200;
			}
		}
		span.add {
			@apply flex flex-row justify-center items-center min-h-8 min-w-8 mr-3 text-sm
				bg-gray-100 rounded-1 text-dark-300 font-bold cursor-pointer;
			transition: all 0.2s ease;
		}
		span.text {
			@apply text-sm font-bold;
		}
	}
}
</style>
