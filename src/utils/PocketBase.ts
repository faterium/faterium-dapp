import PocketBase from "pocketbase"

export { default as PocketBase, Record } from "pocketbase"

export const connectPB = () => new PocketBase("https://dapp-api.faterium.com")
// export const connectPB = () => new PocketBase("http://127.0.0.1:8090")
