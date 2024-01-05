import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";

/**
 * Fine Jewerly - basic flow - price validation
 */
test.describe("Fine Jewerly Basic flow", () => {

    const expectedCart = new QACart();

    
  test("Open Home Page", async ({ homePage , jewerlyPage,productDetailedPage,checkoutSlidePage,checkoutPage}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Necklace ", async () => {
        await homePage.navigateToJewery('Necklaces');
        await jewerlyPage.selectJewerlyByName('North Star Medallion')

        const itemPrice = await productDetailedPage.getItemPrice();

        console.log('Item price ->' + itemPrice)

        await expectedCart.addItem(1, 'North Star Medallion', itemPrice);
        await productDetailedPage.clickAddToBag();
    
    });

    await test.step("Checkout - Price validation", async () => {

        await checkoutSlidePage.clickCheckout()

        const total = await checkoutPage.getCheckoutTotal();
        const bagTotal = Number(await expectedCart.calculateTotal());
        
        expect(total).toBe(+bagTotal)   
       }); 

    })
});



