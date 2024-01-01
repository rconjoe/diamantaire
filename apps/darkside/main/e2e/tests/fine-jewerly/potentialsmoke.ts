import exp from "constants";
import { test, expect } from "../../pages/page-fixture";

/**
 * Fine Jewerly - basic flow - price validation
 */
test.describe("Fine Jewerly Basic flow", () => {
    
  // eslint-disable-next-line playwright/expect-expect
  test("Open Home Page", async ({ homePage, settingPage, productDetailedPage, diamondTablePage,diamondToSettingPage,checkoutSlidePage,checkoutPage}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    // await test.step("select a setting", async () => {
    //   await homePage.navigateToEngagementStartWithASetting();
    // });

    // await test.step("Check All metal filter", async () => {
    //   await settingPage.checkAllFilters();
    // });

    // await test.step("select a setting", async () => {
    //   await homePage.navigateToEngagementStartWithASetting();
    // });

    // await test.step("Select Emarald", async () => {

    //   await settingPage.selectDiamondType('Emerald')
    // });

    // await test.step("Select Pave Cushion", async () => {

    //   await settingPage.selectDiamondType('Pavé Cushion')
    // });

    // await test.step("Select setting", async () => {

    //   await settingPage.selectSettingBySettingName('Classic Hidden')
    //  // await productDetailedPage.clickSelectYourVRAICreatedDiamond();
    //   await productDetailedPage.clickAddToBag();
    // });

    // await test.step("Checkout slide", async () => {
    //   await checkoutSlidePage.clickCheckout();

    //   const element = await checkoutPage.page.getByText('Express Checkout');

    //   await expect(element !== undefined ).toBeTruthy();  

    //   await checkoutPage.getCheckoutTotal();
    // });

    // await test.step("Diamond Table", async () => {
    //   await diamondTablePage.checkAllDiamondType()

    // });

    await test.step("select a diamond first", async () => {
      await homePage.navigateToEngagementStartWithAVRAICreatedDiamond();
    });

    await test.step("select a diamond shape", async () => {
      await diamondTablePage.selectDiamondShape('Radiant');
      await diamondTablePage.getDiamondPriceByRow(4)
      await diamondTablePage.selectDiamondByRow(4);
    });

    await test.step("select a diamond setting", async () => {
      await diamondToSettingPage.selectMetalFilter('Platinum');
      await diamondToSettingPage.selectSettingBySettingName('Signature Prong Engagement')
      await diamondToSettingPage.clickNext();
      await productDetailedPage.clickAddToBag();
      await checkoutSlidePage.clickCheckout();
      
    });
  })
  
});