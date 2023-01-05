<script lang="ts" setup>
interface Props {
	inputSettings: any[]
	modelValue: string[]
	onRemove: Function
	removeButton: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

const onInput = (id: number, input: string) => {
	const newData = props.modelValue
	newData[id] = input
	emit("update:modelValue", newData)
}
const onInterestFocusChange = (id: number, input: string) => {
	const newData = props.modelValue
	newData[id] = parseFloat(input === "" ? "0" : input).toFixed(2)
	emit("update:modelValue", newData)
}
</script>

<template lang="pug">
div.list-item-beneficiary
	input.address(
		type="text"
		:value="modelValue[0]"
		@input="onInput(0, $event.target.value)"
		:placeholder="inputSettings[0].placeholder"
		:class="'flex-'+inputSettings[0].flex"
		v-bind="$attrs"
	)
	input.interest(
		type="number"
		min="0.01" max="100"
		step="0.01"
		:value="modelValue[1]"
		@input="onInput(1, $event.target.value)"
		@focusout="onInterestFocusChange(1, $event.target.value)"
		:placeholder="inputSettings[1].placeholder"
		:class="'flex-'+inputSettings[1].flex"
		v-bind="$attrs"
	)
	div.close(:class="{ removeButton }" @click="onRemove") ✕
</template>

<style lang="scss" scoped>
div.list-item-beneficiary {
	@apply flex flex-row justify-start items-center gap-2 w-full;
	input {
		@apply p-3 rounded-4px w-full bg-gray-100;
		&.flex-1 {
			flex: 1;
		}
		&.flex-2 {
			flex: 2;
		}
		&.flex-3 {
			flex: 3;
		}
		&.flex-4 {
			flex: 4;
		}
	}
	div.close {
		@apply flex justify-center items-center min-h-8 min-w-8 text-sm
			bg-gray-100 rounded-1 text-dark-300 font-bold cursor-pointer;
		transition: all 0.2s ease;
		&:hover {
			@apply bg-slate-200;
		}
		&.removeButton {
			pointer-events: none;
			opacity: 0.4;
		}
	}
}
</style>
