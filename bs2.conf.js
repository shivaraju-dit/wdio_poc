var browserstack = require('browserstack-local');

exports.config = {
  // user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  // key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',

  user:  'shivaraju3',
  key:  'nxNG3uyysNNxEkzBvqtz',
  updateJob: false,
  specs: [
   // './test/specs/google_test.js',
    './test/specs/PolicyJourney.e2e.js'

  ],
  exclude: [],
  commonCapabilities: {
    
    name: process.env.BROWSERSTACK_BUILD_NAME,
    build: process.env.BROWSERSTACK_BUILD,
   
   
  },
  capabilities: [
   {
        browser: 'chrome',
        name: 'local_test_win',
        'browserstack.local': true,
        build: 'webdriver-poc2',
  },
  {
        "os" : "OS X",
        osVersion : "Big Sur",
        browser: 'Chrome',
        build: 'webdriver-poc2',
        name: 'local_test_osx',
  },
  {
        "osVersion" : "13",
        "deviceName" : "iPhone 11",
        "realMobile" : "true",
        "local" : "true",
        build: 'webdriver-poc2',
        "browserName" : "iPhone",
        name: 'local_test_iphone'
  }

 , {
        "os_version" : "10.0",
        "device" : "Samsung Galaxy Note 20 Ultra",
        "real_mobile" : "true",
        "browserName" : "Android",
        build: 'webdriver-poc2',
        name: 'local_test_android',
        'browserstack.local': true, 
    }
  ],
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': exports.config.key }, function (error) {
        if (error) return reject(error);

        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },

  // Code to mark the status of test on BrowserStack based on the assertion status
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilties, specs) {
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(function() {
        console.log("Binary stopped");
        resolve();
      });
    });
  }
}
