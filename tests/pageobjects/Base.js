class Base {
	pauseShort() {
		browser.pause(3000)
	}
	captureScreenShot(filename) {
		browser.saveScreenshot('./tests/screenshots/' + filename)
		return filename
	}
	validateText(selector, text) {
		selector.waitForExist()
		expect(selector).toHaveText(text)
	}
}
export default Base
