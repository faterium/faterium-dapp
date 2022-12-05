<script lang="ts" setup>
interface Props {
	title: string
	modelValue?: any
	required?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
</script>

<template lang="pug">
div.form-input
	h3.title {{ title }} {{ required ? "*" : "" }}
	div.description: slot
	input(
		:value="modelValue"
		@input="emit('update:modelValue', $event.target.value)"
		v-bind="$attrs"
	)
</template>

<style lang="scss" scoped>
div.form-input {
	@apply flex flex-col justify-start items-start;
	h3.title {
		@apply text-base font-bold;
	}
	div.description {
		@apply text-sm font-normal;
	}
	input {
		@apply p-3 mt-3 rounded-4px w-full;
		&[type="file"] {
			@apply p-0;
		}
	}
}
</style>
