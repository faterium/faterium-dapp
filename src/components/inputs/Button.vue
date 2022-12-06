<script lang="ts" setup>
interface Props {
	text: string
	fill?: boolean
	url?: string
	target?: string
	submit?: boolean
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.button(v-if="url" :class="fill ? 'filled' : 'empty'" :href="url" :target="target") {{ text }}
input.button(v-else-if="submit" :class="fill ? 'filled' : 'empty'" type="submit" :value="text" v-bind="$attrs")
button.button(v-else :class="fill ? 'filled' : 'empty'") {{ text }}
</template>

<style lang="scss" scoped>
.button {
	@apply text-white bg-transparent rounded-md py-4 px-8 uppercase text-xs font-bold
		cursor-pointer no-underline box-border block text-center;
	border: 1px transparent solid;
	transition: background 0.3s ease, color 0.2s ease;
	letter-spacing: 1px;
	&.empty {
		@apply p-0 py-4 bg-transparent border-none text-dark-300;
		&:hover {
			@apply text-dark-300;
		}
	}
	&.filled {
		background-color: #333;
		&:hover {
			background: #555;
		}
	}
	&.create {
		@apply bg-green-500;
		&:hover {
			@apply bg-green-400;
		}
	}
	&:disabled,
	&:disabled:hover {
		@apply bg-slate-400 cursor-auto;
	}
}
</style>
