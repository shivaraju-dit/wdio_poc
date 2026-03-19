import Base from '../Base'
import reviewdata from '../Resources/review.page.data'
const { percySnapshot } = require('@percy/webdriverio')

class ReviewPage extends Base {
	get payButton() {
		return $('div[data-qa="buyBtnFooter"] button')
	}
	get pncd() {
		return $('[data-qa="pncd"]~p')
	}
	get lCover() {
		return $('[data-qa="lCover"]')
	}

	clickPayButton() {
		this.payButton.waitForExist()
		percySnapshot(browser, reviewdata.reviewPageScreenshotLabel)
		this.captureScreenShot(reviewdata.reviewPageScreenshotLabel)
		this.payButton.click()
	}
	checkPNCDText(text) {
		this.pncd.waitForExist()
		this.validateText(this.pncd, text)
	}
	checkLCoverText(text) {
		this.lCover.waitForExist()
		this.validateText(this.lCover, text)
	}
}
export default new ReviewPage()
