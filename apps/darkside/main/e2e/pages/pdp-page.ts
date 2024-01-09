import { expect, Locator, Page } from "@playwright/test";

import HomePage from "./home-page";
import { diamondList,metalList, prongStyle, bandStyle } from "../model/filterLists";
import { StringHelper } from "../utils/StringHelper";

export default class ProductDetailedPage extends HomePage {



  readonly metalFilter ={
    platinum: this.page.getByRole('button', { name: "Platinum"}),
    roseGold: this.page.getByRole('button', { name: "Rose Gold"}),
    whiteGold: this.page.getByRole('button', { name: "White Gold"}),
    yellowGold: this.page.getByRole('button', { name: "Yellow Gold"}),
  }

 

  readonly diamondTypeFilter ={
    asscher: this.page.locator('button').filter({ hasText: 'Asscher' }),
    roundBrilliant: this.page.locator('button').filter({ hasText: 'Round Brilliant' }),
    oval: this.page.locator('button').filter({ hasText: 'Oval' }),
    emerald: this.page.locator('button').filter({ hasText: 'Emerald' }),
    paveMarquise: this.page.locator('button').filter({ hasText: 'Pavé Marquise' }),
    paveCushion: this.page.locator('button').filter({ hasText: 'Pavé Cushion' }),
    pear: this.page.locator('button').filter({ hasText: 'Pear' }),
    trillion: this.page.locator('button').filter({ hasText: 'Trillion' }),
    princess: this.page.locator('button').filter({ hasText: 'Princess' }),
    radiant: this.page.locator('button').filter({ hasText: 'Radiant' }),

  }

  readonly itemPrice : Locator
  readonly selectYourVraiCreatedDiamond : Locator;
  readonly addToBag : Locator;
  readonly addEngravingLink: Locator;
  readonly engravingTextArea: Locator
  readonly updateEngraving: Locator
  readonly giftNote:Locator;
  readonly selectYourDiamondBtn: Locator


  constructor( page: Page){
    super(page);

    this.itemPrice = page.locator('.price-text')
    //this.itemPrice = page.getByText('$')
    this.selectYourVraiCreatedDiamond = page.getByRole('button',{name:' Select your VRAI created diamond'})
    this.addToBag = page.getByRole('button',{ name:'Add to bag'});
    this.addEngravingLink = page.getByRole('button', { name: 'Add engraving' });
    this.engravingTextArea = page.locator('input[type="text"]');
    this.updateEngraving = page.getByRole('button', { name: 'Update engraving' })
    this.selectYourDiamondBtn = page.getByRole('button', { name: 'Select your diamond' });

  }

  async checkAllFilters(){
    await this.metalFilter.platinum.click();
    await this.metalFilter.roseGold.click();
    await this.metalFilter.whiteGold.click();
    await this.metalFilter.platinum.click();
  }

  //They are working. But not sure why test will failed after 4 times.
  async checkAllDiamondType(){

    await this.diamondTypeFilter.roundBrilliant.click();
    await this.diamondTypeFilter.asscher.click();
    await this.diamondTypeFilter.roundBrilliant.click();
    await this.diamondTypeFilter.oval.click();
    
    await this.diamondTypeFilter.emerald.click();
    await this.diamondTypeFilter.paveMarquise.click();
    await this.diamondTypeFilter.paveCushion.click();
    await this.diamondTypeFilter.pear.click();
    await this.diamondTypeFilter.trillion.click();
    await this.diamondTypeFilter.princess.click();
    await this.diamondTypeFilter.radiant.click();
  }

  async selectDiamondShape(diamond : diamondList){
    await this.page.getByRole('button', { name: `${diamond}` }).click();
   //await this.page.locator('button').filter({ hasText: `${diamond}` }).click(); 
  }
  async nextDiamondShapeList(){
    await this.page.locator('button:nth-child(3)').click();

  }
  async selectMetalType(metal : metalList){
    await this.page.getByRole('radio', { name: `${metal}` }).click();

  }

  async selectProngStyle(prong : prongStyle){
    await this.page.getByRole('button', { name: `${prong}` }).click();
  }

  async selectBand(band : bandStyle){
    await this.page.getByRole('button', { name: `${band}` }).click();
  }

  async getItemPrice(){

    let price = await this.itemPrice.first().textContent();

    //price =  Number(price.replace('$','')).toFixed(2)
    price = StringHelper.extractPrice(price).toFixed(2)

    return +price
  }

  async clickAddToBag(){
    await this.addToBag.click();
  }

  async clickSelectYourDiamond(){
    await this.selectYourDiamondBtn.click()
  }
  async clickSelectYourVRAICreatedDiamond(){
    await this.selectYourVraiCreatedDiamond.click();

  }
  async addEngraving( engravingNotes) {
    
    const engravingLength = String(engravingNotes).length;

    await this.addEngravingLink.click();
    await this.engravingTextArea.click()
    await this.engravingTextArea.fill(engravingNotes);
    
    const text  = "/^Character limit ("+engravingLength+"/16)$/";

    expect(this.page.getByText(text).isVisible).toBeTruthy();
    await this.page.locator('div').filter({ hasText: /\/16\)Add engraving$/ }).getByRole('button').click();

  }

}