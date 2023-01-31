import { atom, action } from "nanostores"
import { persistentAtom } from "@nanostores/persistent"

export interface User {
	id: string
	picture: string
	username: string
	displayName: string
}

export const users = atom<User[]>([])
export const signedUser = persistentAtom<User | null>("signedUser", null, {
	encode: JSON.stringify,
	decode: JSON.parse,
})

export const changeSignedUser = action(signedUser, "changeSignedUser", (store, user: User | null) => {
	store.set(user)
})
export const addUser = action(users, "addUser", (store, user: User) => {
	store.set(store.get().concat(user))
})
