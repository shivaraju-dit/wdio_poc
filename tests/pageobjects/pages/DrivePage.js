import Base from '../Base'
import drivedata from '../Resources/drive.page.data'
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
		percySnapshot(browser, drivedata.drivePageScreenShotLabel)
		this.captureScreenShot(drivedata.drivePageScreenShotLabel)
		this.validateText(this.policyNo, text)
	}
	checkCoverStartDate(text) {
		this.validateText(this.coverStartDate, text)
	}
}
export default new DrivePage()
