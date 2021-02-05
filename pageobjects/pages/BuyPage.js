import Base from '../Base'
const { percySnapshot } = require('@percy/webdriverio')

class BuyPage extends Base {
     get headerText(){
        return $('h6=All payments are safe and secure')
    }
    get payNowButton(){
        return  $('[data-qa="payNowButton"]')
    }

    clickPayNowButton(){
        this.payNowButton.waitForExist()
        percySnapshot(browser, '2_BuyPage.png')
		this.captureScreenShot('2_BuyPage.png')
        this.payNowButton.click()
    }
} export default new BuyPage()


