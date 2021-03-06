
describe('Policy Journey', () => {
  
    it('Buy a Policy', () => {
    browser.url(`http://localhost:3000/ux1/review`)
    browser.pause(3000);
    const pcnd = $('[data-qa="pncd"]=Protected NCD')
    pcnd.waitForExist()
    expect(pcnd).toHaveText('Protected NCD')
    const pcndText = $('[data-qa="pncd"]~p')
    expect(pcndText).toHaveText('We will protect your 13 years no claims discount')
    const mlCover = $('[data-qa="lCover"]')
    expect(mlCover).toHaveText('Motor Legal Cover')
    browser.saveScreenshot('./screenshots/'+'1_ReviewPage.png')
    const payButton = $('div[data-qa="buyBtnFooter"] button')
    payButton.click()
    // Buy page
    const headerText = $('h6=All payments are safe and secure')
    headerText.waitForExist()
    browser.saveScreenshot('./screenshots/'+'2_BuyPage.png')
    const payNow = $('[data-qa="payNowButton"]')
    payNow.click()   
    // drive page
      const policyNo = $('[data-qa="drivePolicyNumber"]')
    policyNo.waitForExist()
    expect(policyNo).toHaveText('PL0321789')
    const coverStartOn = $('[data-qa="drivePolicyStartDate"]')
    expect(coverStartOn).toHaveText('15 December 2020')
    const crossSellText = $('h6=Home Insurance')
    browser.saveScreenshot('./screenshots/'+'3_DrivePage.png')    
    });
});

