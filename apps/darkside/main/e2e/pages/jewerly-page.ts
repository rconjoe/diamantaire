import { expect, Locator, Page } from "@playwright/test";

import HomePage from "./home-page";

type metalList = 
| "Platinum"
| "Rose Gold"
| "White Gold"
| "Yellow Gold"


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
    await this.page.getByRole('button', { name: `${settingName}` }).click();

  }


  
}