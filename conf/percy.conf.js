var browserstack = require('browserstack-local');	

exports.config = {	
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',	
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',	
 
  updateJob: false,	
  specs: [	
   // './test/specs/google_test.js',	
    './test/specs/PolicyJourney.e2e.js'	
  ],	
  exclude: [],	
  commonCapabilities: {	
    name: process.env.BROWSERSTACK_BUILD_NAME,	
    build: process.env.BROWSERSTACK_BUILD,	
    'browserstack.local': true

   // browserstackLocal = process.env.BROWSERSTACK_LOCAL,
   //browserstackLocalIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER
  },	
  capabilities: [		
  {	
        "os" : "OS X",	
        osVersion : "Big Sur",	
        browser: 'Chrome',	
     //   build: 'webdriver-poc4',	
        name: 'local_test_osx',	
      'browserstack.local': true,	
  }
  ],	
  reporters: [
    'spec',
    //'dot',
      [
       'junit',
       {
         outputDir: './reports',
         outputFileFormat: function (options) {
           return `results-${new Date().getTime()}.xml`;
         },
       },
     ],
   ],
  logLevel: 'warn',	
  coloredLogs: true,	
  screenshotPath: './errorShots/',	
  baseUrl: '',	
  waitforTimeout: 10000,	
  connectionRetryTimeout: 90000,	
  connectionRetryCount: 3,	
  host: 'hub.browserstack.com',	
  framework: 'mocha',	
  mochaOpts: {	
    ui: 'bdd',	
    timeout: 60000	
  },	
    // Initializing Percy
  before: function (capabilities, specs) {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
    // Import percySnapshot function
    const { percySnapshot } = require('@percy/webdriverio');
    // Make percySnapshot available as a global variable in all wdio tests
    global.percySnapshot = percySnapshot;
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
