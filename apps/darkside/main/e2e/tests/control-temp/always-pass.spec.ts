import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

// test.beforeEach(async ({ page }, testInfo) => {
//   console.log(`Running ${testInfo.title}`);
//   await page.goto('/');
// });

/**
 * Not ready to commit
 */
test.describe("Home flow - setting first", () => {

    
  test("Open Home Page", async ({ homePage , page}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Necklace ", async () => {
        const currentURL  = await page.url();

        console.log('Current URL is -> '+ currentURL);

        await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
        await page.getByRole('link', { name: 'Necklaces' }).first().click();

        await page.getByRole('button', { name: 'Petite Pave V Necklace' }).click();

        const pricing = StringHelper.extractPrice(await page.locator('.price-text').innerText());

        expect(pricing).toBe(Number('350'));     
    
    });


    })
});

