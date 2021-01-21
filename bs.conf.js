var browserstack = require('browserstack-local');

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',
   

    
    updateJob: false,
    specs: [
      './test/specs/PolicyJourney.e2e.js'
    //  './test/specs/single.js'
   //'./test/specs/google_test.js'
    ],
    exclude: [],
  
    maxInstances: 10,
    commonCapabilities: {
    
      name: process.env.BROWSERSTACK_BUILD_NAME,
      build: process.env.BROWSERSTACK_BUILD,
      'browserstack.local': true
    },
  
    capabilities: [
      {
      // name: process.env.BROWSERSTACK_BUILD_NAME,
      // build: process.env.BROWSERSTACK_BUILD,
        "os" : "OS X",
       // platform: "MAC",
        osVersion : "Big Sur",
        browser: 'Chrome',
        //name: 'local_test',
        build: 'webdriver-poc',
        'browserstack.local': true 
        },
    //   { browser: 'chrome'},
    //   { browser: 'firefox' },
    //   { browser: 'internet explorer' },
    //   { browser: 'safari' }

{
  
  "osVersion" : "13",
"deviceName" : "iPhone 11",
"realMobile" : "true",
"local" : "true",
build: 'webdriver-poc_mobile',

"browserName" : "iPhone",
}

  ],
  
    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    waitforTimeout: 100000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    host: 'hub.browserstack.com',
    
    // before: function () {

    // },
    reporters: [
      'dot',
      ['junit', {
          outputDir: './reports'
      }]
  ],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        
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
  
  // Code to support common capabilities
  exports.config.capabilities.forEach(function(caps){
    for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
  });
  
  
