const config = require('../../config.js');
const apiRequest = require('./apiRequest.js');
const initiateClaimPaymentCitizenJson = require('../fixtures/data/InitiateClaimPaymentCitizen');
const {v4: uuidv4} = require('uuid');

const {ccdUserType, caseEventId, caseEventName} = require('../common/Constants');

async function initateCaseByCitizen() {
    initiateClaimPaymentCitizenJson.externalId = uuidv4();
    return await updateApiEvent(caseEventId.INITIATE_PAYMENT_CASE, initiateClaimPaymentCitizenJson);
}

async function updateApiEvent(eventName, json, caseId) {
    await apiRequest.startEvent(eventName, caseId);
    return await apiRequest.submitEvent(eventName, json, caseId);
}

async function updateCaseworkerEvent(I, eventName, caseId) {
    await I.authenticateWithIdam(ccdUserType.CASEWORKER);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function updateJudgeEvent(I, eventName, caseId) {
    await I.authenticateWithIdam(ccdUserType.JUDGE);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function updateLAEvent(I, eventName, caseId) {
    await I.authenticateWithIdam(ccdUserType.LA);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
}

async function setUpApiAuthToken(user) {
    await apiRequest.setupTokens(user);
}

function getNextClaimNumber() {
    return '00' + Math.random().toString(36)
        .slice(-6);
}

async function signOut(I) {
    await I.click('#sign-out');
    await I.waitForElement('#username');
}

async function createOpenCase(I, createCitizenCaseJson) {
    const initiatedClaim = await initateCaseByCitizen();
    const caseDetails = await initiatedClaim.json();
    createCitizenCaseJson.id = caseDetails.id;
    createCitizenCaseJson.previousServiceCaseReference = getNextClaimNumber();

    await updateApiEvent(caseEventId.STAY_CLAIM, createCitizenCaseJson, createCitizenCaseJson.id);
    await updateCaseworkerEvent(I, caseEventName.LIFT_STAY, createCitizenCaseJson.id);
    await signOut(I);
    return createCitizenCaseJson;
}

module.exports = {
    initateCaseByCitizen,
    createOpenCase,
    updateApiEvent,
    updateCaseworkerEvent,
    updateJudgeEvent,
    updateLAEvent,
    getNextClaimNumber,
    setUpApiAuthToken,
    signOut
};
