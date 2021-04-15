
import App from '../pageobjects/App'
import BuyPage from '../pageobjects/pages/BuyPage'
import DrivePage from '../pageobjects/pages/DrivePage'
import ReviewPage from '../pageobjects/pages/ReviewPage'
import reviewdata from '../pageobjects/Resources/review.page.data'
import drivedata from '../pageobjects/Resources/drive.page.data'
const { percySnapshot } = require('@percy/webdriverio')

describe('Given I am on policy journey', () => {
	
	it('Then I can buy  a policy by interacting review, buy and drive pages', () => {
		App.openHomePage()
		
		// review page
		ReviewPage.checkPNCDText('We will protect your 13 years no claims discount')
		ReviewPage.checkLCoverText('Motor Legal Cover')
		ReviewPage.clickPayButton()
		  		
		// Buy page
		BuyPage.clickPayNowButton()
		
		// drive page
	   DrivePage.checkPolicyNo('PL0321789')
	   DrivePage.checkCoverStartDate('15 December 2020')
	    
	})

	it('Run test in different browsers', () => {
		
		
	});
})
