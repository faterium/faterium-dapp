import { web3Accounts, web3Enable } from "@polkadot/extension-dapp"
import { ApiPromise, WsProvider } from "@polkadot/api"

export { ApiPromise } from "@polkadot/api"
export { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"

export const connectToNode = async () => {
	const wsProvider = new WsProvider("wss://dapp-node.faterium.com")
	const api = await ApiPromise.create({
		provider: wsProvider,
		types: {
			AssetId: "u64",
			RewardSettings: {
				_enum: ["None"],
			},
			PollCurrency: {
				_enum: {
					Asset: "AssetId",
					Native: null,
				},
			},
		},
	})
	return api
}

export const getAccounts = async () => {
	// This call fires up the authorization popup
	const extensions = await web3Enable("my cool dapp")
	if (extensions.length === 0) {
		// No extension installed, or the user did not accept the authorization -
		// in this case we should inform the use and give a link to the extension
		return
	}
	// We are now informed that the user has at least one extension and that we
	// will be able to show and use accounts
	const allAccounts = await web3Accounts()
	// eslint-disable-next-line consistent-return
	return allAccounts
}
