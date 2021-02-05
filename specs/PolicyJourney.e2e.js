import App from '../pageobjects/App'
import BuyPage from '../pageobjects/pages/BuyPage'
import DrivePage from '../pageobjects/pages/DrivePage'
import ReviewPage from '../pageobjects/pages/ReviewPage'
const { percySnapshot } = require('@percy/webdriverio')

describe('Policy Journey', () => {
	it('Buy a Policy', () => {
		App.openHomePage()
		ReviewPage.checkPNCDText('We will protect your 13 years no claims discount')
		ReviewPage.checkLCoverText('Motor Legal Cover')
		ReviewPage.clickPayButton()

		
		// Buy page
		BuyPage.clickPayNowButton()
	
		// drive page
	   DrivePage.checkPolicyNo('PL0321789')
	   DrivePage.checkCoverStartDate('15 December 2020')
	})
})
