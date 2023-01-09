
export const SERVER_API = import.meta.env.PUBLIC_NETWORK === "testnet"
	? "https://dapp-api.faterium.com"
	: "http://127.0.0.1:8090"

export const NODE_API = import.meta.env.PUBLIC_NETWORK === "testnet"
	? "wss://dapp-node.faterium.com"
	: "ws://127.0.0.1:9944"
