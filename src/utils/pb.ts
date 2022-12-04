import PocketBase from "pocketbase"

export const connectPB = () => new PocketBase("https://dapp-api.faterium.com")
