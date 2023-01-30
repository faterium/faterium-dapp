<script lang="ts" setup>
import CategoryItem from "@components/CategoryItem.vue"
import BasePage from "./basePage.vue"
</script>

<template lang="pug">
BasePage(title="Create community or polls")
	div.block
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
	div.block
		CategoryItem.profile(
			url="/create/profile"
			name="Create profile"
			stats="User profile"
			image="https://i.imgur.com/eG5UxoU.jpg"
		)
		CategoryItem.asset(
			url="/create/asset"
			name="Create asset"
			stats="Asset for polls"
			image="https://i.imgur.com/W4Utjul.jpg"
		)
	div.block
		CategoryItem.category(
			url="/create/category"
			name="Create category"
			stats="Category for communities"
			image="https://i.imgur.com/SLMyK4j.png"
		)
		CategoryItem.empty(
			url=""
			name=""
			stats=""
			image="https://i.imgur.com/SLMyK4j.png"
		)
</template>

<style lang="scss" scoped>
div.block {
	@apply flex flex-row mb-5 gap-5;
	a.category-item {
		@apply w-full pl-6;
		&.empty {
			@apply invisible;
		}
	}
}
</style>
