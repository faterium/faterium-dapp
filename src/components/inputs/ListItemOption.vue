<script lang="ts" setup>
interface Props {
	inputSettings: any[]
	modelValue: any
	onRemove: Function
	removeButton: boolean
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
	div.close(:class="{ removeButton }" @click="onRemove") ✕
</template>

<style lang="scss" scoped>
div.list-item-option {
	@apply flex flex-row justify-start items-center w-full;
	input {
		@apply p-3 rounded-4px w-full bg-gray-100;
	}
	div.close {
		@apply flex justify-center items-center min-h-8 min-w-8 ml-2 text-sm
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
