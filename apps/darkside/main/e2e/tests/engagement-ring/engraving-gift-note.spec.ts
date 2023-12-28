import { test, expect } from "../../pages/page-fixture";

/**
 * Verify engraving and Gift note are showing at checkout
 */

test.describe("Engagement ring - Setting First flow", () => {


  test("Happy Path with engraving and gift note", async ({ homePage , page}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Engagement ring", async () => {

      await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
      await page.getByRole('link', { name: 'Create your engagement ring' }).click();
      await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
      await page.getByRole('button', { name: 'Signature Halo' }).click();

    });  

    await test.step("Select VRAI created diamond for type Radiant", async () => {

      await page.getByRole('button', { name: 'Radiant' }).click()
      await page.getByRole('button', { name: 'Select your VRAI created diamond' }).click();
      await page.click("[data-id='2']");
      await page.getByRole('button', { name: 'Select' }).click();

    });

    await test.step("Add engraving and gift note", async () => {

      await page.getByRole('button', { name: 'Add engraving' }).click();
      await page.locator('input[type="text"]').click();
      await page.locator('input[type="text"]').fill('Test Engraving');
      await page.locator('div').filter({ hasText: /^Character limit \(14\/16\)Add engraving$/ }).getByRole('button').click();
      await page.getByRole('button', { name: 'Add to bag' }).click();
      await page.getByRole('button', { name: 'Add gift note' }).click();
      await page.locator('textarea').fill("Test Gift Note");

    }); 
        
    await test.step("Add engraving and gift note", async () => {
      await page.getByRole('button', { name: 'Checkout | $' }).click();

    });
  })
});

