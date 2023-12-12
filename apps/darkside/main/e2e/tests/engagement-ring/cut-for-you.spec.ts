import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

/**
 * Cut for you flow
 * Need to include slider
 * Issue with flow - Test not ready
 */

test.describe("Setting First flow - Discover Cut for You flow", () => {

  test("Happy flow - Discover Cut for You flow", async ({ homePage , page}) => {

    const expectedCart = new QACart();
    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select an engagement ring", async () => {

      await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
      await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click()
  
      await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
      await page.getByRole('link', { name: 'The Classic' }).first().click();
      await page.getByRole('button', { name: 'Oval' }).click()
      await page.getByRole('button', { name: 'Select your VRAI created' }).click();

    });  

    await test.step("Select Cut For You", async () => {

      await expect(page.getByText("We’ll cut and polish one for you — in any size")).toBeVisible({ timeout: 30000 });

      await page.getByRole('button', { name: 'Discover Cut for You™' }).first().click();
      await page.getByTitle('Oval', { exact: true }).getByRole('img').click()
      //Add sliding here
      await page.getByRole('link', { name: 'Check availability' }).click();
      await expect(page.getByText('We’re ready to Cut for You')).toBeVisible({ timeout: 30000 });

      // Broken here
      await page.getByRole('button', { name: 'Select and add a setting' }).click()

    });


    // not tested
    await test.step("Checkout and verify pricing", async () => {

      await page.getByRole('button', { name: 'Add to bag' }).click();
      await page.getByRole('button', { name: 'Checkout' }).click();

      let total = await page.locator('tfoot').getByText('$').textContent();

      total = total.substring(1).trim();
      console.log('Actual total -> ' + total)
  
      expectedCart.displayCart();
     
      expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))

    }); 

  })
});

