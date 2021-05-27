const testConfig = require('src/test/config.js');
const idamUserHelper = require('./helpers/IdamUserHelper');

const citizenUser = `civilmoneyclaimsclaimant${require('randomstring').generate(7)
    .toLowerCase()}@gmail.com`;
const testPassword = 'genericPassword123';

exports.config = {
    async bootstrapAll() {
        await idamUserHelper.createAUser(citizenUser, testPassword);
    },
    async teardownAll() {
        await idamUserHelper.deleteUser(citizenUser, testPassword);
    },
    'tests': testConfig.TestPathToRun,
    'output': testConfig.TestOutputDir,
    'helpers': {
        'Puppeteer': {
            'url': testConfig.TestEndToEndUrl,
            'waitForTimeout': 60000,
            'getPageTimeout': 60000,
            // 'waitForAction': 1,
            'show': testConfig.TestShowBrowserWindow,
            'waitForNavigation': ['domcontentloaded', 'networkidle0'],
            'chrome': {
                'ignoreHTTPSErrors': true,
                'ignore-certificate-errors': true,
                'defaultViewport': {
                    'width': 1280,
                    'height': 960
                },
                args: [
                    // '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--allow-running-insecure-content',
                    '--ignore-certificate-errors',
                    '--window-size=1440,1400'
                ]
            },

        },
        'PuppeteerHelper': {
            'require': './helpers/PuppeteerHelper.js'
        },
        'JSWait': {
            require: './helpers/JSWait.js'
        },
        'Mochawesome': {
            uniqueScreenshotNames: 'true'
        }
    },
    'include': {
        'I': './pages/steps.js'
    },
    'plugins': {
        'autoDelay': {
            'enabled': testConfig.TestAutoDelayEnabled
        },
        screenshotOnFail: {
            enabled: true,
            fullPageScreenshots: 'true'
        }
    },
    'multiple': {
        'parallel': {
            // Splits tests into 2 chunks
            'chunks': 2
        }
    },
    'mocha': {
        'reporterOptions': {
            'reportDir': testConfig.TestOutputDir,
            'reportName': 'index',
            'inlineAssets': true
        }
    },
    'name': 'CMC Codecept Tests'
};
