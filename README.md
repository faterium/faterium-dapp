# Faterium Decentralized Application

Faterium - a place where fates are forged.

Published by [Cloudflare Pages](https://pages.cloudflare.com/). Look at the [Astro](https://astro.build) documentation to learn more. Also, we use [WindiCSS](https://windicss.org/) and [SCSS](https://sass-lang.com/) preprocessors.

## Commands

All commands are run from the root of the project, from a terminal:

| Command				| Action											 |
| :--------------------- | :------------------------------------------------- |
| `yarn`			| Installs dependencies							  |
| `yarn dev`		  | Starts local dev server at `localhost:3000` |
| `yarn build`		| Build your production site to `./dist/`			|
| `yarn preview`	  | Preview your build locally, before deploying	   |
| `yarn astro ...`	| Run CLI commands like `astro add`, `astro preview` |
| `yarn astro --help` | Get help using the Astro CLI					   |
| `yarn test` 		| Run PlayWright tests for all devices				   |

## Local setup

If you want to run local node, server, and dapp - use our [Launch local network](https://github.com/faterium/faterium-server#docker-and-local-network) from our `faterium-server` repository to launch `faterium-node`, `faterium-server`, and `polkadot-apps` locally.

Then run the following command to launch and connect to local services (`localhost:9944` and `localhost:8090`):

```sh
yarn dev
```

Then run the following command to launch and connect to `dapp-*.faterium.com` services:

```sh
PUBLIC_NETWORK=testnet yarn dev
```

## Local testing setup

If you want to run tests - make sure you have installed all required [PlayWright](https://playwright.dev/docs/intro) dependencies for your system.

And you have local services up and running. To run `server` and `node` locally - run the following `docker-compose` command in the root of this directory:

```sh
docker-compose up -d
```

After services are launched - you can launch all End-to-End tests by simple command:

```sh
yarn test
```

It will launch all PlayWright tests against local services and create report.

To stop and remove services - use the following command:

```sh
docker-compose down
```

## Testing against testnet

If you want to test against testnet server for some reason - you can launch this command instead:

```sh
PUBLIC_NETWORK=testnet yarn test
```
