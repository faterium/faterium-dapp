<script lang="ts" setup>
interface Props {
	itemComponent: any
	title: string
	inputSettings: any[]
	addText: string
	modelValue: any[]
	required?: boolean
	onItemAdd: Function
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
	h3.title {{ title }} {{ required ? "*" : "" }}
	div.description: slot
	div.list-items
		component(
			v-bind:is="itemComponent"
			v-for="(_, index) in modelValue"
			:key="index"
			:inputSettings="inputSettings"
			v-model="modelValue[index]"
			:onRemove="() => onRemove(index)"
		)
	div.bottom
		div.add-option(@click.prevent="onItemAdd")
			span.add +
			span.text {{ addText }}
</template>

<style lang="scss" scoped>
div.list-input {
	@apply flex flex-col justify-start items-start;
	h3.title {
		@apply text-base font-bold;
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
				bg-slate-300 rounded-1 text-dark-300 font-bold cursor-pointer;
			transition: all 0.2s ease;
		}
		span.text {
			@apply text-sm font-bold;
		}
	}
}
</style>
