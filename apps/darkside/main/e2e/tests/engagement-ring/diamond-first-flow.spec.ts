import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";

/**
 * Engagement ring - Diamond First flow with Price validation
 */

test.describe("Engagement ring - Diamond First flow", () => {

    const expectedCart = new QACart();
    let diamondPrice ;

  test("Happy Path", async ({ homePage ,diamondTablePage,diamondToSettingPage,productDetailedPage, checkoutSlidePage, checkoutPage}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select VRAI created diamond", async () => {

      await homePage.navigateToEngagementStartWithAVRAICreatedDiamond();
      await diamondTablePage.selectDiamondShape('Round Brilliant')
      diamondPrice = await diamondTablePage.getDiamondPriceByRow(2)

      console.log('Diamond price -> ' + diamondPrice)
      expectedCart.addItem(1, "diamonds", diamondPrice ,1);
      await diamondTablePage.selectDiamondByRow(2);
    });  

    await test.step("Select an engagement ring setting", async () => {

      await diamondToSettingPage.selectMetalFilter('White gold');
      await diamondToSettingPage.page.keyboard.press('PageDown');

      await diamondToSettingPage.selectSettingBySettingName('The V Round')

      const itemPrice = await productDetailedPage.getItemPrice();

      console.log('Item price ->' + itemPrice)
      const settingPrice = itemPrice - diamondPrice;

      expectedCart.addItem(2,"Setting", settingPrice ,1);
      await diamondToSettingPage.clickCompleteYourRing();
      await productDetailedPage.clickAddToBag()
    });

    await test.step("Checkout and validate price", async () => {

      await checkoutSlidePage.clickCheckout();
      const total = await checkoutPage.getCheckoutTotal();

      console.log('Actual total -> ' + total)
      expectedCart.displayCart();
      expect(+total).toBe(Number(expectedCart.calculateTotal()))

       }); 

    })
});

