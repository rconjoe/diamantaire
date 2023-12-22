import exp from "constants";
import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

/**
 * Fine Jewerly - basic flow - price validation
 */
test.describe("Fine Jewerly Basic flow", () => {

    const expectedCart = new QACart();

    
  test("Open Home Page", async ({ homePage , page}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Necklace ", async () => {
        await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
        await page.getByRole('link', { name: 'Necklaces' }).first().click();

        await page.getByRole('button', { name: 'North Star Medallion' }).click();

        const pricing = StringHelper.extractPrice(await page.locator('.price-text').innerText());

        expect(pricing).toBe(Number('425'));        
    
        await page.waitForTimeout(2000); //replace this with better later. It is throwing some error since test is clicking too fast

        await page.getByRole('button', { name: 'Add to bag' }).click();
        const price = StringHelper.extractPrice(await page.getByRole('button', { name: 'Checkout' }).textContent());

        expect(pricing).toBe(price);
        const jewerlyPrice = price*100

        expectedCart.addItem(1, 'North Star Medallion', jewerlyPrice);
        expectedCart.displayCart();
    
    });

    await test.step("Checkout ", async () => {

        await page.waitForLoadState();
      //  await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$425');
        await page.getByRole('button', { name: 'Checkout' }).click();
    
        let total = await page.locator('tfoot').getByText('$').textContent();

        total = total.substring(1).trim();
        
        expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))   
       }); 

    })
});



