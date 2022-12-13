import PocketBase from "pocketbase"

export { default as PocketBase, Record } from "pocketbase"

export const connectPB = () => new PocketBase(
	import.meta.env.CONNECT_TESTNET
		? "https://dapp-api.faterium.com"
		: "http://127.0.0.1:8090")
