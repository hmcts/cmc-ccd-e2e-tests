const config = require('../../config.js');
const apiRequest = require('./apiRequest.js');
const initiateClaimPaymentCitizenJson = require('../fixtures/data/InitiateClaimPaymentCitizen');
const {v4: uuidv4} = require('uuid');

const {userType, caseEventId, caseEventName} = require('../common/Constants');

async function initateCaseByCitizen() {
    initiateClaimPaymentCitizenJson.externalId = uuidv4();
    return await updateApiEvent(caseEventId.INITIATE_PAYMENT_CASE, initiateClaimPaymentCitizenJson);
}

async function updateApiEvent(eventName, json, caseId) {
    await apiRequest.startEvent(eventName, caseId);
    return await apiRequest.submitEvent(eventName, json, caseId);
}

async function updateCaseworkerEvent(I, eventName, caseId) {
    await I.authenticateWithIdam(userType.CASEWORKER);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function updateJudgeEvent(I, eventName, caseId) {
    await I.authenticateWithIdam(userType.JUDGE);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function updateLAEvent(I, eventName, caseData, caseId) {
    await I.authenticateWithIdam(userType.LA);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterGenerateOrderPage1();
    await I.enterGenerateOrderPage2(caseData.previousServiceCaseReference);
    await I.enterEventSummary(eventName);
}

async function reviewOrder(I, eventName, caseData, caseId) {
    await I.authenticateWithIdam(userType.JUDGE);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterReviewOrderPage1(caseData.previousServiceCaseReference);
    await I.enterEventSummary(eventName);
}

async function actionReviewComments(I, eventName, caseData, caseId) {
    await I.authenticateWithIdam(userType.LA);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterActionReviewCommentsPage1();
    await I.enterActionReviewCommentsPage2(caseData.previousServiceCaseReference);
    await I.enterEventSummary(eventName);
}

async function approveDirectionOrder(I, caseData, caseId) {
    const eventName = caseEventName.APPROVE_DIRECTIONS_ORDER;
    await I.authenticateWithIdam(userType.JUDGE);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterApproveDirectionOrderPage1(caseData.previousServiceCaseReference);
    await I.enterApproveDirectionOrderPage2();
}

async function drawDirectionOrder(I, caseData, caseId) {
    const eventName = caseEventName.DRAW_DIRECTIONS_ORDER;
    await I.authenticateWithIdam(userType.LA);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterDrawDirectionsOrderPage1(caseData.previousServiceCaseReference);
    await I.enterEventSummary(eventName);
}

async function JudgeDrawDirectionOrder(I, caseData, caseId) {
    const eventName = caseEventName.JUDGE_DRAW_DIRECTIONS_ORDER;
    await I.authenticateWithIdam(userType.JUDGE);
    await I.amOnPage(`/case/${config.definition.jurisdiction}/${config.definition.caseType}/` + caseId);
    await I.chooseNextStep(eventName);
    await I.enterJudgeDrawDirectionsOrderPage1();
    await I.enterJudgeDrawDirectionsOrderPage2();
    await I.enterJudgeDrawDirectionsOrderPage3(caseData.previousServiceCaseReference);
}

async function updateMediationSuccessful(I) {
    const eventName = caseEventName.MEDIATION_SUCCESSFUL;
    await I.chooseNextStep(eventName);
    await I.enterMediationSuccessPage1();
    await I.enterMediationSuccessPage2();
    await I.enterEventSummary(eventName);
}

async function updateMediationUnsuccessful(I) {
    const eventName = caseEventName.MEDIATION_FAILED;
    await I.chooseNextStep(eventName);
    await I.enterMediationFailurePage1();
    await I.enterEventSummary(eventName);
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
    reviewOrder,
    actionReviewComments,
    approveDirectionOrder,
    drawDirectionOrder,
    JudgeDrawDirectionOrder,
    updateMediationSuccessful,
    updateMediationUnsuccessful,
    signOut
};
