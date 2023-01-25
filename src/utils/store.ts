import { atom, action } from "nanostores"
import { persistentAtom } from "@nanostores/persistent"

export interface User {
	picture: string
	username: string
	displayName: string
}

export const users = atom<User[]>([
	// {
	// 	picture: "https://variety.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-02-at-8.33.52-AM.png",
	// 	username: "kiri",
	// 	displayName: "Kiri Sully",
	// },
	// {
	// 	picture: "https://animecorner.me/wp-content/uploads/2022/07/anya-diary.png",
	// 	username: "Anya Forger",
	// 	displayName: "anyaforger",
	// },
	// {
	// 	picture: "https://dailysuperheroes.com/wp-content/uploads/2020/02/tony-stark.jpg",
	// 	username: "tonystark",
	// 	displayName: "Tony Stark",
	// },
])
export const signedUser = persistentAtom<User | null>("signedUser", users.get()[0], {
	encode: JSON.stringify,
	decode: JSON.parse,
})

export const changeSignedUser = action(signedUser, "changeSignedUser", (store, user: User) => {
	store.set(user)
})
export const addUser = action(users, "addUser", (store, user: User) => {
	store.set(store.get().concat(user))
})
