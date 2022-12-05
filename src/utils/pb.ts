import PocketBase from "pocketbase"

export { default as PocketBase } from "pocketbase"

export const connectPB = () => new PocketBase("https://dapp-api.faterium.com")
