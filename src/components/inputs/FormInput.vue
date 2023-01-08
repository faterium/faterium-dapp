<script lang="ts" setup>
interface Props {
	title: string
	modelValue?: any
	required?: boolean
	textarea?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
</script>

<template lang="pug">
div.form-input
	h3.title
		| {{ title }}
		span.optional {{ required ? "" : "(optional)" }}
	div.description: slot
	textarea(
		v-if="textarea"
		:value="modelValue"
		@input="emit('update:modelValue', $event.target.value)"
		v-bind="$attrs"
	)
	input(
		v-else
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
		.optional {
			@apply opacity-30 ml-1;
		}
	}
	div.description {
		@apply text-sm font-normal;
	}
	input,
	textarea {
		@apply p-3 mt-3 rounded-4px w-full bg-gray-100;
	}
	textarea {
		@apply min-h-30;
	}
}
</style>
