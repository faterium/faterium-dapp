/* eslint-disable max-lines */

import Swal from "sweetalert2"
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"
import { ApiPromise, WsProvider } from "@polkadot/api"
import dayjs from "dayjs"
import { decodeAddress, signatureVerify } from "@polkadot/util-crypto"
import { u8aToHex } from "@polkadot/util"
import { PollDetails } from "./PollDetails"
import { PocketBase, simplifyError } from "./PocketBase"
import { APPS_URL, NODE_API } from "./consts"

export { ApiPromise } from "@polkadot/api"
export { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"

const handleSubstrateError = (status) => {
	Swal.fire({
		title: "Error during transaction!",
		text: "Substrate Node returned an error, click button below to see more details.",
		icon: "error",
		confirmButtonText: "Open explorer",
	}).then((result) => {
		if (result.isConfirmed) {
			window.open(`${APPS_URL}/#/explorer/query/${status.asInBlock.toString()}`, "_blank")
		}
	})
}

export const connectToNode = async () => {
	const wsProvider = new WsProvider(NODE_API)
	const api = await ApiPromise.create({
		provider: wsProvider,
		types: {
			RewardSettings: {
				_enum: ["None"],
			},
			PollCurrency: {
				_enum: {
					Asset: "u32",
					Native: null,
				},
			},
		},
	})
	return api
}

export const getAccount = async () => {
	// const keyring = new Keyring({ type: "sr25519" })
	// const alice = keyring.addFromUri("//Alice")

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
	return allAccounts[0]
}

export const isValidSignature = (signedMessage, signature, address) => {
	const publicKey = decodeAddress(address)
	const hexPublicKey = u8aToHex(publicKey)
	return signatureVerify(signedMessage, signature, hexPublicKey).isValid
}

export const substrateCreatePoll = async (
	pb: PocketBase,
	poll: PollDetails,
	beneficiaries: string[][],
	goal: number,
	optionsCount: number,
	selectedCurrency: { name: string, value: string | null },
	multipleVotes: boolean,
) => {
	const account = await getAccount()
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	const bnfs = beneficiaries.map(
		([address, interest]) => [
			address,
			Math.trunc(parseFloat(interest) * 100),
		],
	)
	console.log("beneficiaries", bnfs)
	// Connect to our substrate node
	const api = await connectToNode()
	const queryResult = await Promise.all([
		api.query.system.number(),
		api.query.fateriumPolls.pollCount(),
	])
	const blockNumber = parseInt(queryResult[0].toString(), 10)
	const pollId = parseInt(queryResult[1].toString(), 10)

	const settings = api.createType("RewardSettings", "None")
	const currency = api.createType(
		"PollCurrency",
		selectedCurrency.value === null
			? selectedCurrency.name
			: { [selectedCurrency.name]: parseInt(selectedCurrency.value, 10) }
	)
	console.log("currency", currency)
	const extrinsic = api.tx.fateriumPolls.createPoll(
		poll.cid,
		bnfs,
		settings,
		goal,
		optionsCount,
		multipleVotes,
		currency,
		dayjs(poll.dateStart).diff(dayjs(PollDetails.formatDate(dayjs())), "seconds") < 100
			? blockNumber + 2
			: poll.computeStartBlock(blockNumber, 6),
		poll.computeEndBlock(blockNumber, 6),
	)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ events = [], status }) => {
				if (status.isInBlock) {
					console.log("Events:", events);
					let actualResultError = ""
					events.forEach(({ event: { data, method, section }, phase }) => {
						console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString())
						if (method === "ExtrinsicFailed") {
							actualResultError = data.toString()
						}
					})
					Swal.close()
					if (actualResultError === "") {
						pb.collection("polls").update(poll.id, { pollId })
						Swal.fire({
							title: "Poll successfully created!",
							text: `Completed at block hash #${status.asInBlock.toString()}!`,
							icon: "success",
							confirmButtonText: "Cool, take me there!",
						}).then((_) => {
							window.location.replace(`/polls/${poll.id}`)
						})
					} else {
						handleSubstrateError(status)
					}
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 5000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: Error) => {
			Swal.fire({
				title: "Error during asset creation!",
				text: `Unexpected error: ${JSON.stringify(error)}`,
				icon: "error",
			})
		})
}

export const voteOnPoll = async (poll: PollDetails) => {
	const account = await getAccount()
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	// Connect to our substrate node
	const api = await connectToNode()
	const extrinsic = api.tx.fateriumPolls.vote(
		poll.pollId,
		poll.votingOptions(),
	)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ events = [], status }) => {
				if (status.isInBlock) {
					console.log("Events:", events);
					let actualResultError = ""
					events.forEach(({ event: { data, method, section }, phase }) => {
						console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString())
						if (method === "ExtrinsicFailed") {
							actualResultError = data.toString()
						}
					})
					Swal.close()
					if (actualResultError === "") {
						Swal.fire({
							title: "Successfully voted!",
							text: `Completed at block hash #${status.asInBlock.toString()}!`,
							icon: "success",
							confirmButtonText: "Cool!",
						})
					} else {
						handleSubstrateError(status)
					}
				} else if (status.isFinalized) {
					// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: Error) => {
			Swal.fire({
				title: "Error during asset creation!",
				text: `Unexpected error: ${JSON.stringify(error)}`,
				icon: "error",
			})
		})
}

// Call substrate FateriumPolls Vote extrinsic
export const collectFromPoll = async (poll: PollDetails) => {
	const account = await getAccount()
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	// Connect to our substrate node
	const api = await connectToNode()
	const extrinsic = api.tx.fateriumPolls.collect(poll.pollId)
	console.log("extrinsic", extrinsic)
	extrinsic
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ events = [], status }) => {
				if (status.isInBlock) {
					console.log("Events:", events);
					let actualResultError = ""
					let actualResult = ""
					events.forEach(({ event: { data, method, section }, phase }) => {
						console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString())
						if (method === "ExtrinsicFailed") {
							actualResultError = data.toString()
						}
						if (`${section}.${method}` === "fateriumPolls.Collected") {
							actualResult = data.toString()
						}
					})
					Swal.close()
					if (actualResultError === "") {
						Swal.fire({
							title: "Successfully collected!",
							text: `Completed at block hash #${status.asInBlock.toString()}! Tx data: ${actualResult}`,
							icon: "success",
							confirmButtonText: "Cool!",
						})
					} else {
						handleSubstrateError(status)
					}
				} else if (status.isFinalized) {
					// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: Error) => {
			Swal.fire({
				title: "Error during asset creation!",
				text: `Unexpected error: ${JSON.stringify(error)}`,
				icon: "error",
			})
		})
}

export const substrateCreateAssetInner = async (
	pb: PocketBase,
	api: ApiPromise,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	account: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	injector: any,
	formData: {
		icon: string,
		name: string,
		symbol: string,
		decimals: number,
		minBalance: number,
		assetId: number,
	}
) => {
	api.tx.assets.setMetadata(formData.assetId, formData.name, formData.symbol, formData.decimals)
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			async ({ events: e = [], status: s }) => {
				if (s.isInBlock) {
					console.log("Status:", s);
					console.log("Events:", e);
					let aResultError = ""
					e.forEach(({ event: { data, method, section }, phase }) => {
						console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString())
						if (method === "ExtrinsicFailed") {
							aResultError = data.toString()
						}
					})
					Swal.close()
					if (aResultError === "") {
						console.log("Upload data", formData)
						const formDataValue = new FormData()
						Object.keys(formData).forEach((k) => {
							formDataValue.append(k, formData[k])
						})
						await pb
							.collection("assets")
							.create(formDataValue)
							.then(() => {
								Swal.fire({
									title: "Successfully created!",
									text: `Completed at block hash #${s.asInBlock.toString()}! To mint open @polkadot/apps`,
									icon: "success",
									confirmButtonText: "Cool!",
								}).then((result) => {
									if (result.isConfirmed) {
										window.open(`${APPS_URL}/#/assets`, "_blank")
										window.location.replace("/create")
									}
								})
							})
							.catch(
								(err) => {
									Swal.fire({
										title: "Error during asset details upload!",
										html: `Server returned error: </br> ${simplifyError(err)}`,
										icon: "error",
										confirmButtonText: "Cool, let me fix it!",
									})
								},
							)
					} else {
						handleSubstrateError(s)
					}
				} else if (s.isFinalized) {
				// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${s.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			}
		)
}

export const substrateCreateAsset = async (
	pb: PocketBase,
	formData: {
		icon: string,
		name: string,
		symbol: string,
		decimals: number,
		minBalance: number,
		assetId: number,
	}
) => {
	const account = await getAccount()
	// To be able to retrieve the signer interface from this account
	// we can use web3FromSource which will return an InjectedExtension type
	const injector = await web3FromSource(account.meta.source)
	// Connect to our substrate node
	const api = await connectToNode()
	api.tx.assets.create(formData.assetId, account.address, formData.minBalance)
		.signAndSend(
			account.address,
			{ signer: injector.signer },
			({ events = [], status }) => {
				if (status.isInBlock) {
					console.log("Events:", events);
					let actualResultError = ""
					events.forEach(({ event: { data, method, section }, phase }) => {
						console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString())
						if (method === "ExtrinsicFailed") {
							actualResultError = data.toString()
						}
					})
					Swal.close()
					if (actualResultError === "") {
						substrateCreateAssetInner(pb, api, account, injector, formData)
					} else {
						handleSubstrateError(status)
					}
				} else if (status.isFinalized) {
					// do nothing
				} else {
					Swal.fire({
						title: `Please wait until extrinsic completion. Status: ${status.type}.`,
						toast: true,
						position: "bottom-right",
						timerProgressBar: true,
						timer: 3000,
						showConfirmButton: false,
						didOpen: () => Swal.showLoading(null),
					})
				}
			},
		)
		.catch((error: Error) => {
			Swal.fire({
				title: "Error during asset creation!",
				text: `Unexpected error: ${JSON.stringify(error.message)}`,
				icon: "error",
			})
		})
}
