<script lang="ts" setup>
interface Props {
	text: string
	fill?: boolean
	url?: string
	target?: string
}
const props = defineProps<Props>()
</script>

<template lang="pug">
a.button(v-if="url" :class="fill ? 'filled' : 'empty'" :href="url" :target="target") {{ text }}
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
		border: 1px #333 solid;

		&:hover {
			background: #fff;
			color: rgba(234, 108, 85, 1);
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
}
</style>
