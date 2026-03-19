const { percySnapshot } = require('@percy/webdriverio')
describe('Google\'s Search Functionality', () => {
    it('can find search results', () => {
        browser.url('https://www.google.co.uk');
        browser.pause(3000)
        browser.saveScreenshot('./screenshots/'+'google.png')
        percySnapshot(browser,"google.png");
        $('[name="q"]').setValue('webdriverIO');
         $('[name="btnK"]').click();
        browser.getTitle().should.match(/webdriverio/i);
       
    });
  });
  