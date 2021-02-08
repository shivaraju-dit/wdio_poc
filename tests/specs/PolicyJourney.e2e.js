import App from '../pageobjects/App'
import BuyPage from '../pageobjects/pages/BuyPage'
import DrivePage from '../pageobjects/pages/DrivePage'
import ReviewPage from '../pageobjects/pages/ReviewPage'
import reviewdata from '../pageobjects/Resources/review.page.data'
import drivedata from '../pageobjects/Resources/drive.page.data'
const { percySnapshot } = require('@percy/webdriverio')

describe('Policy Journey', () => {
	it('Buy a Policy', () => {
		App.openHomePage()
		ReviewPage.checkPNCDText(reviewdata.pncdText)
		ReviewPage.checkLCoverText(reviewdata.lCoverText)
		ReviewPage.clickPayButton()
		// Buy page
		BuyPage.clickPayNowButton()
		// drive page
	   DrivePage.checkPolicyNo(drivedata.policyNo)
	   DrivePage.checkCoverStartDate(drivedata.coverStartDate)
	})
})
