import { Locator, Page } from "@playwright/test";

import HomePage from "./home-page";
import { diamondList, clarityList } from "../model/filterLists";
import { StringHelper } from "../utils/StringHelper";

export default class DiamondTablePage extends HomePage {


  readonly selectBtn : Locator;
  readonly discoverCutForYouBtn : Locator
  readonly checkAvailabilityBtn:Locator
  readonly cutForYouDiamondPrice : Locator
  readonly completeYourRing : Locator

  constructor(page : Page){
    super(page);
    this.selectBtn = this.page.getByRole('button', { name : "Select"});
    this.discoverCutForYouBtn = this.page.getByRole('button', { name: 'Discover Cut for You™' }).first();
    this.checkAvailabilityBtn = this.page.getByRole('button', { name: 'Check availability' });
    this.cutForYouDiamondPrice =  page.locator('.primary-price')
    this.completeYourRing =  this.page.getByRole('button', { name: 'Complete your ring' });

  }

  async selectDiamondShape(diamond : diamondList){
    console.log('Select diamond shape -> '+ diamond +' on diamond table page');

    await this.page.getByRole('button', { name: `${diamond}` }).click();
    await this.page.waitForLoadState('domcontentloaded')
  }

    //TOBE implemented when needed
  async selectCaratRange(diamond : diamondList){
    await this.page.getByRole('button', { name: `${diamond}` }).click();
  }

  //TOBE implemented when needed
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
    await this.page.waitForLoadState('domcontentloaded'); 
    await this.page.click("[data-id='"+row+"']");
    await this.selectBtn.click();
  }

  async clickDiscoverCutForYou( ){
    this.discoverCutForYouBtn.click();
  }


  async selectCutForMeDiamondShape(diamond:diamondList){
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
  async getCutForYouDiamondPrice(){

    let price = await this.cutForYouDiamondPrice.first().textContent();

    //price =  Number(price.replace('$','')).toFixed(2)
    price = StringHelper.extractPrice(price).toFixed(2)

    return +price
  }

  async clickCompleteAndReviewRing() {
   await this.completeYourRing.click();
  }
  
}