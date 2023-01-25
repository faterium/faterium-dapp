<script lang="ts" setup>
import { ref } from "vue"
import Swal from "sweetalert2"
import { web3Enable } from "@polkadot/extension-dapp"
import Button from "@components/inputs/Button.vue"
import { users, signedUser, changeSignedUser } from "@utils/store"
import { useStore } from "@nanostores/vue"

interface Props {
	user?: string
	users?: string[]
}
const props = defineProps<Props>()
const closed = ref(true)
const currentUser = useStore(signedUser)

const onClickConnect = async () => {
	const allInjected = await web3Enable("Faterium dApp")
	if (allInjected.length > 0) {
		Swal.fire({
			title: `Connected ${allInjected.length} account/s`,
			toast: true,
			icon: "success",
			position: "bottom-right",
			timer: 2000,
			showConfirmButton: false,
		})
	} else {
		Swal.fire({
			title: "No accounts connected or extension not found",
			toast: true,
			icon: "error",
			position: "bottom-right",
			timer: 2000,
			showConfirmButton: false,
		})
	}
}
const getUsers = () => {
	return users.get()
}
</script>

<template lang="pug">
div.header-connect
	Button.action.connect(
		v-if="false"
		text="Connect" fill
		@click="onClickConnect"
	)
	div.user.signed(
		v-if="currentUser !== null"
		@mouseover="closed = false"
		@mouseleave="closed = true"
	)
		img.picture(:src="currentUser.picture")
		div.text
			span.name {{ currentUser.displayName }}
			span.username @{{ currentUser.username }}
		div.dropdown(:class="{ closed }")
			div.user(
				v-for="(user, index) of getUsers()" :key="index"
				@click="() => changeSignedUser(user)"
			)
				img.picture(:src="user.picture")
				div.text
					span.name {{ user.displayName }}
					span.username @{{ user.username }}
</template>

<style lang="scss" scoped>
div.header-connect {
	@apply flex gap-4;
	.action {
		@apply py-2.5;
	}
	.user {
		@apply flex gap-2 cursor-pointer relative w-50;
		img.picture {
			@apply h-10 w-10 object-cover object-center rounded-1;
		}
		.text {
			@apply flex flex-col text-sm;
			.name {
				@apply font-bold;
			}
		}
		.dropdown {
			@apply absolute flex flex-col top-10/10 -left-3 -right-6 min-h-10 max-h-60
				overflow-scroll pt-2 bg-white rounded-md;
			.user {
				@apply px-3 py-3 first:rounded-t-md last:rounded-b-md bg-gray-100 hover:bg-gray-200;
			}
			&.closed {
				@apply hidden;
			}
		}
	}
}
</style>
