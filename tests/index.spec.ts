import { test, expect } from "@playwright/test"

test("Meta Title is correct", async ({ page }) => {
	await page.goto("http://localhost:3000/")

	await expect(page).toHaveTitle("Faterium dApp")
})

test("Base usage test", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.getByRole("heading", { name: "Trending Polls" }).click()
	await page.getByRole("link", { name: "Polkadot ecosystem and socials networks? Polkadot @polkadot" }).click()
	await page.getByRole("link", { name: "poll preview" }).click()
	await page.getByRole("link", { name: "twitter", exact: true }).click({
		modifiers: ["Meta"]
	})
	await expect(page).toHaveTitle("Faterium Community")
})

test("Create community test", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.getByRole("banner").getByRole("link", { name: "Create" }).click()
	await page.getByRole("link", { name: "category image Create community Community for polls" }).click()
	await page.getByRole("textbox", { name: "e.g. jon_snow_fans" }).click()
	const i = Math.floor(Math.random() * 100000000)
	await page.getByRole("textbox", { name: "e.g. jon_snow_fans" }).fill(`community${i}`)
	await page.getByRole("textbox", { name: "e.g. Jon Snow fan club" }).click()
	await page.getByRole("textbox", { name: "e.g. Jon Snow fan club" }).fill("Community Test")
	await page.getByRole("textbox", { name: "Provide a detailed description or biography." }).click()
	await page.getByRole("textbox", { name: "Provide a detailed description or biography." }).fill("Description")
	await page.setInputFiles(".logo-image input[type='file']", "./public/preview.png")
	await page.setInputFiles(".banner-image input[type='file']", "./public/preview.png")
	await page.setInputFiles(".featured-image input[type='file']", "./public/preview.png")
	await page.getByRole("button", { name: "Create community" }).click()
	await page.getByRole("button", { name: "Cool, take me there!" }).click()
})
