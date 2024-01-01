import { expect, Locator, Page } from "@playwright/test";

import HomePage from "./home-page";


type diamondType =
| "Asscher"
| "Round Brilliant"
| "Oval"
| "Emerald"
| "Pavé Marquise"
| "Pavé Cushion"
| "Pear"
| "Trillion"
| "Princess"
| "Radiant";

type metalList = 
| "Platinum"
| "Rose Gold"
| "White Gold"
| "Yellow Gold"

export default class DiamondToSettingPage extends HomePage {

// await page.getByRole('button', { name: 'Styles' }).click();
// await page.getByRole('button', { name: 'Price' }).click();
// await page.getByRole('button', { name: '$500-$1,500' }).click();
// await page.getByRole('button', { name: 'Styles' }).click();
// await page.getByRole('button', { name: 'Cathedral Cathedral' }).click();

  readonly metalFilter : Locator;
  readonly priceFilter : Locator;
  readonly stylesFilter : Locator;
  readonly nextBtn : Locator;

  constructor( page: Page){
    super(page);
    
    this.metalFilter = this.page.getByRole('button', { name: 'Metal' });
    this.priceFilter = this.page.getByRole('button', { name: 'Price' });
    this.stylesFilter = this.page.getByRole('button', { name: 'Styles' });
    this.nextBtn = this.page.getByRole('button', { name: 'Next' });

  }


  async selectMetalFilter(metal : metalList ){
    await this.metalFilter.click();
    await this.page.getByRole('button', { name: `${metal}`, exact: true }).click()

  }

  async selectSettingBySettingName(settingName){

    await this.page.getByRole('button', { name: `${settingName}` }).first().click();
  }

  async clickNext(){
    await this.nextBtn.click();
  }
  
}