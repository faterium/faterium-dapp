<script lang="ts" setup>
import CategoryItem from "@components/CategoryItem.vue"
import BasePage from "./basePage.vue"
</script>

<template lang="pug">
BasePage(title="Create community or polls")
	div.top
		CategoryItem.poll(
			url="/create/poll"
			name="Create poll"
			stats="Poll in community"
			image="https://i.imgur.com/CeLJVYA.png"
		)
		CategoryItem.community(
			url="/create/community"
			name="Create community"
			stats="Community for polls"
			image="https://i.imgur.com/V4EITEJ.jpg"
		)
	div.bottom
		CategoryItem.profile(
			url="/create/profile"
			name="Update profile"
			stats="Profile for your address"
			image="https://i.imgur.com/eG5UxoU.jpg"
		)
		CategoryItem.asset(
			url="/create/asset"
			name="Create asset"
			stats="Asset for polls"
			image="https://i.imgur.com/W4Utjul.jpg"
		)
</template>

<style lang="scss" scoped>
div.top,
div.bottom {
	@apply flex flex-row mb-5 gap-5;
	a.category-item {
		@apply w-full pl-6;
	}
}
</style>
