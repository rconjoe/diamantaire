import { Locator, Page } from "@playwright/test";

import HomePage from "./home-page";
import { metalList } from "../model/filterLists";


export default class JewerlyPage extends HomePage {

  readonly metalFilter : Locator;
  readonly priceFilter : Locator;
  readonly stylesFilter : Locator;

  constructor( page: Page){
    super(page);
    
    this.metalFilter = this.page.getByRole('button', { name: 'Metal' });
    this.priceFilter = this.page.getByRole('button', { name: 'Price' });
    this.stylesFilter = this.page.getByRole('button', { name: 'Styles' });

  }

  async selectMetalFilter(metal : metalList ){
    await this.metalFilter.click();
    await this.page.getByRole('button', { name: `${metal}`, exact: true }).click()

  }

  async selectJewerlyByName(settingName){
    console.log('Select Jewerly ' + settingName)
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(3000); // for stability
    await this.page.getByRole('link').filter({ hasText: `${settingName}`}).getByRole('button').first().click();



  }


  
}