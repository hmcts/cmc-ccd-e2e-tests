const testConfig = require('../../config');
const {userType} = require('../common/Constants');
const apiRequest = require('../claimStoreApi/apiRequest.js');
const idamHelper = require('../ccdApi/idamHelper');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);

Feature('Part Admission - CCJ').retry(testConfig.TestRetryFeatures);

let pinValue;
let claim;

Scenario('Defendant submit part admission and claimant raise CCJ', async ({I}) => {

    //claimant steps
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);
    const claimRef = await I.createClaim();
    await I.click('Sign out');

    claim = await apiRequest.retrieveByReferenceNumber(claimRef);
    const caseId = claim.ccdCaseId;
    const externalId = claim.externalId;

    logger.info({message: 'Claimant created a case with id: ', caseId});

    if (typeof claim.letterHolderId === 'undefined') {
        await I.wait(5);
        claim = await apiRequest.retrieveByReferenceNumber(claimRef);
    }

    pinValue = await idamHelper.getPin(claim.letterHolderId);

    await I.linkDefendant(claimRef, pinValue);

    //Defendant steps

    await I.waitInUrl('first-contact/claim-summary');
    await I.click('Respond to claim');

    await I.wait(10);
    await I.click('Sign in to your account.');
    await I.wait(5);
    await I.authenticateWithIdam(userType.CITIZEN, true);

    await I.waitInUrl('/dashboard');
    await I.see(claimRef);
    await I.amOnCitizenAppPage(`dashboard/${externalId}/defendant`);
    await I.click('Respond to claim');

    //Prepare your response
    await I.confirmDefendantDetails();
    await I.defendantExtraTimeNeeded('no');

    //Respond to claim
    await I.chooseDefendantResponse('PART_ADMISSION');
    await I.moneyOweAndDisagreement('specificDate');
    await I.shareDefendantFinancialDetails();
    await I.selectMediationOptions('yes');
    await I.hearingDetails();

    //Submit
    await I.submitDefendantResponse('PART_ADMISSION');
    await I.click('Sign out');
    await I.wait(5);

    await I.authenticateWithIdam(userType.CASEWORKER);
    await I.amOnPage(`/case/${testConfig.definition.jurisdiction}/${testConfig.definition.caseType}/` + caseId);
    await I.see('Admitted Part');
    await I.click('#sign-out');
    await I.wait(5);

    //Claimant response
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);

    await I.amOnCitizenAppPage(`dashboard/${externalId}/claimant`);
    await I.click('View and respond');

    //How they responded
    await I.viewDefendantResponse('PART_ADMISSION');
    await I.acceptOrRejectResponse('ccj', 'PART_ADMISSION');
    await I.requestCCJ();

    await I.checkAndSumbitResponse();
    await I.waitInUrl('claimant-response/confirmation');

    //login as caseworker and verify created event
    await I.authenticateWithIdam(userType.CASEWORKER);
    await I.amOnPage(`/case/${testConfig.definition.jurisdiction}/${testConfig.definition.caseType}/` + caseId);
    await I.see('Claimant accepted');
    await I.see('CCJ requested');
    await I.see('CCJ upload');
    await I.click('#sign-out');
}).retry(testConfig.TestRetryScenarios);
