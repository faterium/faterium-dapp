import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
	testDir: "./tests",
	use: {
		baseURL: "http://localhost:3000",
	},
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
	webServer: {
	  command: "yarn start",
	  port: 3000,
	},
}

export default config
