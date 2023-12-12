import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

// test.beforeEach(async ({ page }, testInfo) => {
//   console.log(`Running ${testInfo.title}`);
//   await page.goto('/');
// });

/**
 * Not ready to commit
 */
test.describe("Basic flow - setting first", () => {

    const expectedCart = new QACart();

    
  test("Open Home Page", async ({ homePage , page}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Necklace ", async () => {
        await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
        await page.getByRole('link', { name: 'Necklaces' }).click();

        await page.getByRole('button', { name: 'North Star Medallion' }).click();
        await expect(page.getByText('Starting at $')).toHaveText('Starting at $425');
    
        await page.getByRole('button', { name: 'Add to bag' }).click();
    
        const price = await page.textContent("li.checkout-button > div > button");
        const jewerlyPrice = StringHelper.extractPrice(price)*100

        expectedCart.addItem(1, 'North Star Medallion', jewerlyPrice);
        expectedCart.displayCart();
    
    });

    await test.step("Checkout ", async () => {

        await page.waitForLoadState();
        await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$425');
        await page.getByRole('button', { name: 'Checkout' }).click();
    
        let total = await page.locator('tfoot').getByText('$').textContent();

        total = total.substring(1).trim();
        
        expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))   
       }); 

    })
});

