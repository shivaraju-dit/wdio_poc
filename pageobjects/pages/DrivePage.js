import Base from '../Base'
const { percySnapshot } = require('@percy/webdriverio')

class DrivePage extends Base {
	get policyNo() {
		return $('[data-qa="drivePolicyNumber"]')
	}
	get coverStartDate() {
		return $('[data-qa="drivePolicyStartDate"]')
	}
	checkPolicyNo(text) {
		this.policyNo.waitForExist()
		percySnapshot(browser, '3_DrivePage.png')
		this.captureScreenShot('3_DrivePage.png')
		this.validateText(this.policyNo, text)
	}
	checkCoverStartDate(text) {
		this.validateText(this.coverStartDate, text)
	}
}
export default new DrivePage()
