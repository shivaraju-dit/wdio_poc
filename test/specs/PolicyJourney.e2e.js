const { percySnapshot } = require('@percy/webdriverio')
describe('Policy Journey', () => {
  
    it('Buy a Policy', () => {
  // browser.url(`http://Bs-local.com:3000/ux1/review`)
    browser.url(`http://localhost:3000/ux1/review`)
      browser.pause(2000);
   
    percySnapshot(browser,'1_ReviewPage.png')
    browser.pause(1000)
    const payButton = $('div[data-qa="buyBtnFooter"] button')
    payButton.click()

    // Buy page
    const headerText = $('h6=All payments are safe and secure')
    headerText.waitForExist()
    browser.saveScreenshot('./screenshots/'+'2_BuyPage.png')
    percySnapshot(browser,'2_BuyPage.png')
    browser.pause(1000)
    const payNow = $('[data-qa="payNowButton"]')
    payNow.click()   
    // drive page
      const policyNo = $('[data-qa="drivePolicyNumber"]')
  
    const coverStartOn = $('[data-qa="drivePolicyStartDate"]')
    percySnapshot(browser,'3_DrivePage.png')

    const crossSellText = $('h6=Home Insurance')
    browser.saveScreenshot('./screenshots/'+'3_DrivePage.png')  
    policyNo.waitForExist()
    browser.pause(2000)  
    });
});

