'use strict';

const testConfig = require('../../config');
const {userType} = require('../common/Constants');

Feature('Create claim flow)');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);

Scenario('Create Claimant flow', async ({I}) => {
    //claimant steps
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);
    const claimRef = await I.createClaim();
    logger.info({message: 'Claimant has created a claim with reference..', claimRef});
    await I.click('Sign out');
}).tag('@crossbrowser')
    .retry(testConfig.TestRetryScenarios);
