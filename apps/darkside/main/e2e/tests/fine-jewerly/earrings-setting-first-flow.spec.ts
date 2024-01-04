import { test, expect } from "../../pages/page-fixture";

/**
 * Earrings Setting First flow
 */
test.describe("Earrings Setting First flow with filter", () => {
    
  let itemPrice;

  test("Open Home Page", async ({ homePage , jewerlyPage, productDetailedPage, checkoutSlidePage,checkoutPage}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Jewerly > Earrings ", async () => {
      await homePage.navigateToJewery('Earrings')
      await jewerlyPage.selectMetalFilter('Rose Gold')
      await jewerlyPage.selectJewerlyByName('Solitaire Stud Round Brilliant');

    
    });

    await test.step("Confirm selection and add to bag ", async () => {

      itemPrice = await productDetailedPage.getItemPrice();

      console.log(' Jewerly price -> ' + itemPrice);

      await productDetailedPage.clickAddToBag();
      
    
    });

    await test.step("Checkout ", async () => {

      await checkoutSlidePage.clickCheckout()
      const checkoutTotal = await checkoutPage.getCheckoutTotal();

      await expect(+checkoutTotal).toBe(+itemPrice);
   
       }); 

    })
});

