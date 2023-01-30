import PocketBase from "pocketbase"

export { default as PocketBase, Record } from "pocketbase"

export const connectPB = () => new PocketBase(
	import.meta.env.PUBLIC_NETWORK === "testnet"
		? "https://dapp-api.faterium.com"
		: "http://127.0.0.1:8090")

export const simplifyError = (err) => {
	const res = Object.entries(err.data.data)
		.map((v, i) => `${i+1}) ${v[0]}: ${(v[1] as { code, message }).message}`)
	return res.join("</br>")
}
