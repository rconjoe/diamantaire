import { test, expect } from "../../pages/page-fixture";

/**
 * Earrings Setting First flow
 */
test.describe("Earrings Setting First flow with filter", () => {
    
  test("Open Home Page", async ({ homePage , page}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Earrings ", async () => {
      await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
      await page.getByRole('link', { name: 'Earrings' }).click();
  
      await page.getByRole('button', { name: 'Metal' }).click();
      await page.getByRole('button', { name: 'White Gold'}).first().click();

      await page.getByRole('link', { name: 'Solitaire Diamond Studs' }).click();

    
    });

    await test.step("Checkout ", async () => {

      await page.getByRole('button', { name: 'Add to bag' }).click();
      await page.waitForLoadState();
      await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$500');
      await page.getByRole('button', { name: 'Checkout' }).click();
       }); 

    })
});

