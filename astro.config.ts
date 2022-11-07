import { defineConfig } from "astro/config"
import sitemap, { ChangeFreq } from "@astrojs/sitemap"
import vue from "@astrojs/vue"
import windiCSS from "vite-plugin-windicss"

// https://astro.build/config
export default defineConfig({
	site: "https://dapp.faterium.com",
	vite: {
		plugins: [windiCSS()],
	},
	integrations: [
		vue(),
		sitemap({
			changefreq: ("weekly" as ChangeFreq),
			priority: 1.0,
			lastmod: new Date("2022-08-30"),
		}),
	],
})
