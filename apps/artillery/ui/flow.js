module.exports = { simpleFlow };
 
async function simpleFlow(page, vuContext, events, test) {
    //1. simply add this line to your scenario function, or use test.step below instead
   const { step } = test;
   const userid = vuContext.vars.userid;
   const recordid = vuContext.vars.recordid;
  
   await step("Visit VVRAI page", async () => {
    await page.goto("https://main.vrai.qa");

   })

  await step("Select Jewerly > Necklace ", async () => {

    await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
    await page.getByRole('link', { name: 'Necklaces' }).click();

    //   await page.getByLabel('JEWELRY').first().first().hover();
    //   await page.getByRole('link', { name: 'Necklaces' }).click();

    })

}
