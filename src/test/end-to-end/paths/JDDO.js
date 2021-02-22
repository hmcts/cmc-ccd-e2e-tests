'use strict';

const {ccdUserType} = require('../common/Constants');
const testConfig = require('../../config');

Feature('JDDO').retry(testConfig.TestRetryFeatures);

Scenario('JDDO', async ({I}) => {
    await I.authenticateWithIdam(ccdUserType.JUDGE, false);
}).tag('@crossbrowser')
    .retry(testConfig.TestRetryScenarios);
