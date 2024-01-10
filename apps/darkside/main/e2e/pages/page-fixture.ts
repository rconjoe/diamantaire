import { test as base } from "@playwright/test";

import HomePage from "././home-page";
import CheckoutPage from "./checkout-page";
import CheckoutSlidePage from "./components/checkoutslide-component";
import DiamondTablePage from "./diamond-table-page";
import DiamondToSettingPage from "./diamond-to-setting-page";
import JewerlyPage from "./jewerly-page";
import ProductDetailedPage from "./pdp-page";
import SettingPage from "./setting-page";

export type PageObjects = {
  homePage: HomePage;
  checkoutPage: CheckoutPage;
  settingPage: SettingPage;
  productDetailedPage : ProductDetailedPage;
  diamondTablePage : DiamondTablePage;
  jewerlyPage : JewerlyPage;
  checkoutSlidePage : CheckoutSlidePage;
  diamondToSettingPage : DiamondToSettingPage
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await use(homePage);
  },
  settingPage: async ({ page }, use) => {
    const settingPage = new SettingPage(page);

    await use(settingPage);
  },
  productDetailedPage: async ({ page }, use) => {
    const productDetailedPage = new ProductDetailedPage(page);

    await use(productDetailedPage);
  },
  diamondTablePage: async ({ page }, use) => {
    const diamondTablePage = new DiamondTablePage(page);

    await use(diamondTablePage);
  },
  diamondToSettingPage: async ({ page }, use) => {
    const diamondToSettingPage = new DiamondToSettingPage(page);

    await use(diamondToSettingPage);
  },

  jewerlyPage: async ({ page }, use) => {
    const jewerlyPage = new JewerlyPage(page);

    await use(jewerlyPage);
  },
  checkoutSlidePage: async ({ page }, use) => {
    const checkoutSlidePage = new CheckoutSlidePage(page);

    await use(checkoutSlidePage);
  },  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);
  },



});

export { expect} from "@playwright/test";