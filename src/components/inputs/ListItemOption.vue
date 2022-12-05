<script lang="ts" setup>
interface Props {
	inputSettings: any[]
	modelValue: any
	onRemove: Function
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
</script>

<template lang="pug">
div.list-item-option
	input(
		:value="modelValue"
		@input="emit('update:modelValue', $event.target.value)"
		:placeholder="inputSettings[0].placeholder"
		v-bind="$attrs"
	)
	div.close(@click="onRemove") ✕
</template>

<style lang="scss" scoped>
div.list-item-option {
	@apply flex flex-row justify-start items-center w-full;
	input {
		@apply p-3 rounded-4px w-full;
	}
	div.close {
		@apply flex justify-center items-center min-h-8 min-w-8 ml-2 text-sm
			bg-slate-300 rounded-1 text-dark-300 font-bold cursor-pointer;
		transition: all 0.2s ease;
		&:hover {
			@apply bg-slate-200;
		}
	}
}
</style>
