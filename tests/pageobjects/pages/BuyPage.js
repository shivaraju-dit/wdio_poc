import Base from '../Base'
import buydata from '../Resources/buy.page.data'
const { percySnapshot } = require('@percy/webdriverio')

class BuyPage extends Base {
	get headerText() {
		return $('h6=All payments are safe and secure')
	}
	get payNowButton() {
		return $('[data-qa="payNowButton"]')
	}

	clickPayNowButton() {
		this.payNowButton.waitForExist()
		percySnapshot(browser, buydata.buyPageScreenShotLabel)
		this.captureScreenShot(buydata.buyPageScreenShotLabel)
		this.payNowButton.click()
	}
}
export default new BuyPage()
