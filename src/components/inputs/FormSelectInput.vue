<script lang="ts" setup>
interface Props {
	title: string
	modelValue: {
		items: { [name: string]: string | null }
		selected: string
	}
	required?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

const onRadioChange = (name: string) => {
	const newData = props.modelValue
	newData.selected = name
	emit("update:modelValue", newData)
}
const onInput = (val: string) => {
	const newData = props.modelValue
	newData.items[newData.selected] = val
	emit("update:modelValue", newData)
}
</script>

<template lang="pug">
div.form-select-input
	h3.title
		| {{ title }}
		span.optional {{ required ? "" : "(optional)" }}
	div.description: slot
	fieldset
		div.radio-button(
			v-for="(item, index) in Object.entries(modelValue.items)"
			:key="index"
		)
			input(
				type="radio"
				:name="title"
				:id="item[0]"
				:value="item[0]"
				:checked="modelValue.selected === item[0]"
				@change="onRadioChange(item[0])"
			)
			label(:for="item[0]") {{ item[0] }}
	input.text(
		v-if="modelValue.items[modelValue.selected] !== null"
		:value="modelValue.items[modelValue.selected]"
		@input="onInput($event.target.value)"
		v-bind="$attrs"
	)
</template>

<style lang="scss" scoped>
div.form-select-input {
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
	fieldset {
		@apply flex flex-row mt-3;
		div.radio-button {
			@apply flex flex-row justify-start items-center mr-10 cursor-pointer;
			input {
				@apply cursor-pointer;
			}
			label {
				@apply capitalize ml-2 cursor-pointer font-bold;
			}
		}
	}
	input.text {
		@apply p-3 mt-3 rounded-4px w-full bg-gray-100;
	}
}
</style>
