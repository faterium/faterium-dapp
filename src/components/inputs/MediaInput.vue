<script lang="ts" setup>
import { ref } from "vue"

interface Props {
	title: string
	modelValue?: any
	required?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(["onUpload"])

const imageData = ref(null)
const fileInput = ref(null)

const chooseImage = () => {
	fileInput.value.click()
}
const onSelectFile = () => {
	const { files } = fileInput.value
	if (files && files[0]) {
		const reader = new FileReader()
		reader.onload = (e) => {
			imageData.value = e.target.result
		}
		reader.readAsDataURL(files[0])
		emit("onUpload", files[0])
	}
}
const getImage = () =>
	!imageData.value
		? "url(/assets/poll_preview.png)"
		: `url(${imageData.value})`
</script>

<template lang="pug">
div.media-input
	h3.title {{ title }} {{ required ? "*" : "" }}
	div.description: slot
	div.image-input(:style="{ 'background-image': getImage() }" @click="chooseImage")
		input.file-input(ref="fileInput" type="file" @input="onSelectFile")
</template>

<style lang="scss" scoped>
div.media-input {
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
	.image-input {
		@apply mt-3 rounded-4px h-50 w-100 block cursor-pointer bg-cover bg-center;
		transition: all 0.2s ease;
		&:hover {
			filter: brightness(80%);
		}
	}
	.file-input {
		display: none;
	}
}
</style>
