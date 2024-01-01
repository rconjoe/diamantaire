import { expect, Locator, Page } from "@playwright/test";

import HomePage from "./home-page";


type diamondType =
| "Asscher"
| "Round Brilliant"
| "Oval"
| "Emerald"
| "Marquise"
| "Cushion"
| "Pear"
| "Trillion"
| "Princess"
| "Radiant";

type clarityList =
| "VVS"
| "VS"
| "SI"


export default class DiamondTablePage extends HomePage {

  readonly selectBtn : Locator;
  readonly discoverCutForYouBtn : Locator
  readonly checkAvailabilityBtn:Locator

  constructor(page : Page){
    super(page);
    this.selectBtn = this.page.getByRole('button', { name : "Select"});
    this.discoverCutForYouBtn = this.page.getByRole('button', { name: 'Discover Cut for You™' }).first();
    this.checkAvailabilityBtn = this.page.getByRole('button', { name: 'Check availability' });
  }

  async selectDiamondShape(diamond : diamondType){
    await this.page.getByRole('button', { name: `${diamond}` }).click();

    // await page.getByRole('button', { name: 'Excellent' }).click();
    // await page.getByRole('button', { name: 'VS', exact: true }).click();
    // await page.getByRole('button', { name: 'VS', exact: true }).click();
    // await page.locator('div:nth-child(2) > .vo-table-row-head > div').first().click();
  }

  async selectCaratRange(diamond : diamondType){
    await this.page.getByRole('button', { name: `${diamond}` }).click();

    // await page.getByRole('button', { name: 'Excellent' }).click();
    // await page.getByRole('button', { name: 'VS', exact: true }).click();
    // await page.getByRole('button', { name: 'VS', exact: true }).click();
    // await page.locator('div:nth-child(2) > .vo-table-row-head > div').first().click();
  }

  //tobe implemented when needed
  // async selectPriceRange(diamond : diamondType){
    
  //  // await this.page.getByRole('button', { name: `${diamond}` }).click();
  // }

  async selectCut(){
    await this.page.getByRole('button', { name: 'Excellent' }).click();
 }
  
  async selectClarity(clarity : clarityList){
    await this.page.getByRole('button', { name: `${clarity}`, exact: true }).click();
  }

  async selectDiamondByRow(row){
    await this.page.click("[data-id='"+row+"']");
    await this.selectBtn.click();
  }

  async clickDiscoverCutForYou( ){
    this.discoverCutForYouBtn.click()
  }


  async selectCutForMeDiamondShape(diamond:diamondType){
    await this.page.getByTitle(`${diamond}`, { exact: true }).click();
  }

  async clickCheckAvailability(){
    this.checkAvailabilityBtn.click()
  }

  async getDiamondPriceByRow(row) : Promise<number> {
    let diamondPrice =  await this.page.textContent("[data-id='"+row+"']");

    diamondPrice = diamondPrice.substring(diamondPrice.indexOf("$")+1).replace(',','');
    const diamondAmount = Number(diamondPrice).toFixed(2)

    console.log('Diamond Price -> ' + diamondAmount);

    return Number(diamondAmount);
    
  }
  
}