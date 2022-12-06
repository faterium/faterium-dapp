<script lang="ts" setup>
import type { VotingOption } from "@utils/index"

interface Props {
	inputSettings: any[]
	modelValue: VotingOption
	onRemove: Function
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

const onInput = (input: string) => {
	const newData = props.modelValue
	newData.vote = parseInt(input === "" ? "0" : input, 10)
	emit("update:modelValue", newData)
}
</script>

<template lang="pug">
div.list-item-voting
	div.index {{ modelValue.index + 1 }}
	input.text.flex-4(
		type="text"
		:value="modelValue.text"
		disabled
	)
	input.interest.flex-4(
		type="number"
		min="1"
		step="1"
		:value="modelValue.vote"
		@input="onInput($event.target.value)"
		placeholder="e.g. 99999"
		v-bind="$attrs"
	)
	input.percentage.flex-1(
		:value="modelValue.percentage"
		disabled
	)
</template>

<style lang="scss" scoped>
div.list-item-voting {
	@apply flex flex-row justify-start items-center gap-2 w-full;
	input {
		@apply p-3 rounded-4px w-full;
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
	div.index {
		@apply flex justify-center items-center min-h-8 min-w-8 text-sm
			bg-slate-300 rounded-1 text-dark-300 font-bold cursor-pointer;
		transition: all 0.2s ease;
		&:hover {
			@apply bg-slate-200;
		}
	}
}
</style>
