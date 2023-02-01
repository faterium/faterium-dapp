<script lang="ts" setup>
interface Props {
	title: string
	modelValue?: any
	required?: boolean
	datalist: string[]
}
const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
</script>

<template lang="pug">
div.form-dropdown-input
	h3.title
		| {{ title }}
		span.optional {{ required ? "" : "(optional)" }}
	div.description: slot
	input.text(
		:value="modelValue"
		@input="emit('update:modelValue', $event.target.value)"
		v-bind="$attrs"
		list="cityname"
	)
	datalist#cityname
		option(v-for="(v, i) in datalist" :key="i" :value="v")
</template>

<style lang="scss" scoped>
div.form-dropdown-input {
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
	input.text {
		@apply p-3 mt-3 rounded-4px w-full bg-gray-100;
	}
}
</style>
