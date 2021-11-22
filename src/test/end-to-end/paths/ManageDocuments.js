'use strict';

const caseHelper = require('../ccdApi/caseHelper');
const apiRequest = require('../claimStoreApi/apiRequest.js');
const {userType} = require('../common/Constants');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);
const testConfig = require('src/test/config.js');
const {caseEventName} = require('../common/Constants');

Feature('ManageDocuments functionality').retry(testConfig.TestRetryFeatures);

Scenario('Claimant create a case --> Caseworker submit Manage Document Other', async ({I}) => {
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);
    const claimRef = await I.createClaimDefendantAsOrg();
    await I.click('Sign out');

    logger.info({message: 'Created a claim in ccd with claim ref: ', claimRef});

    const claim = await apiRequest.retrieveByReferenceNumber(claimRef);
    const caseId = claim.ccdCaseId;

    //login as caseworker and verify created event
    await I.authenticateWithIdam(userType.CASEWORKER);
    await I.amOnPage(`/case/${testConfig.definition.jurisdiction}/${testConfig.definition.caseType}/` + caseId);
    await I.waitForText('Claim created by citizen');
    await I.see('Claim submitted');
    await caseHelper.manageDocumentsEventTriggered(I, 'Other');
}).retry(testConfig.TestRetryScenarios);

Scenario('Claimant create a case --> Caseworker submit manage Document Correspondance', async ({I}) => {
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);
    const claimRef = await I.createClaimDefendantAsOrg();
    await I.click('Sign out');

    logger.info({message: 'Created a claim in ccd with claim ref: ', claimRef});

    const claim = await apiRequest.retrieveByReferenceNumber(claimRef);
    const caseId = claim.ccdCaseId;

    //login as caseworker and verify created event
    await I.authenticateWithIdam(userType.CASEWORKER);
    await I.amOnPage(`/case/${testConfig.definition.jurisdiction}/${testConfig.definition.caseType}/` + caseId);
    await I.waitForText('Claim created by citizen');
    await I.see('Claim submitted');
    await caseHelper.manageDocumentsEventTriggered(I, 'Correspondence');
}).retry(testConfig.TestRetryScenarios);

Scenario('Full Defence → Dispute All → Accept mediation by Defendant → Decide to proceed is Yes (claimant)→ Accept mediation by claimant → ManageDocument Event triggered for Mediation Agreement ', async ({I}) => {
    const createCitizenCaseJson = require('../fixtures/data/ReferMediationFullDefenceDisputeAll');
    await runFeatureTestSteps(I, createCitizenCaseJson);
}).retry(testConfig.TestRetryScenarios);

async function runFeatureTestSteps(I, createCitizenCaseJson) {
    await caseHelper.setUpApiAuthToken(testConfig.citizenUser);

    logger.info({message: 'Creating a case in ccd with given json'});
    const updatedCaseJson = await caseHelper.createOpenCase(I, createCitizenCaseJson);
    const caseId = updatedCaseJson.id;

    logger.info({message: 'Created a case in ccd with id: ', caseId});

    await caseHelper.updateCaseworkerEvent(I, caseEventName.REFERRED_MEDIATION, caseId);
    logger.info({message: 'Case status changed to REFFERED_MEDIATION for ', caseId});

    await caseHelper.manageDocumentsEventTriggered(I, 'Mediation agreement');
    await caseHelper.signOut(I);
}
