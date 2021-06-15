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
    //Need to reload the page as xui is not loading the page properly
    await I.amOnPage(`/cases/case-details/` + caseId + '/trigger/DrawJudgesOrder/DrawJudgesOrder1');
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

async function issuePaperDefenceForms(I) {
    const eventName = caseEventName.ISSUE_PAPER_DEFENCE_FORMS;
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function paperResponseReviewed(I) {
    const eventName = caseEventName.PAPER_RESP_REVIEWED;
    await I.chooseNextStep(eventName);
    await I.enterPaperRespReviewPage1();
    await I.enterPaperRespReviewPage2();
    await I.enterEventSummary(eventName);
}

async function reviewOcon9xEvent(I) {
    const eventName = caseEventName.REVIEW_OCON9X_RESP;
    await I.chooseNextStep(eventName);
    await I.enterReviewOcon9xPage1();
    await I.enterEventSummary(eventName);
}

async function paperRespAdmission(I) {
    const eventName = caseEventName.PAPER_RESP_ADMISSIOON;
    await I.chooseNextStep(eventName);
    await I.enterPaperRespAdmissionPage1();
    await I.enterEventSummary(eventName);
}

async function paperRespDefence(I) {
    const eventName = caseEventName.PAPER_RESP_DEFENCE;
    await I.chooseNextStep(eventName);
    await I.enterPaperRespDefencePage1();
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
    await I.click('Sign out');
    await I.waitForElement('#username');
}

async function createOpenCase(I, createCitizenCaseJson) {
    const initiatedClaim = await initateCaseByCitizen();
    const caseDetails = await initiatedClaim.json();
    createCitizenCaseJson.id = caseDetails.id;
    createCitizenCaseJson.previousServiceCaseReference = getNextClaimNumber();

    await updateApiEvent(caseEventId.STAY_CLAIM, createCitizenCaseJson, createCitizenCaseJson.id);
    await updateApiEvent(caseEventId.LIFT_STAY, createCitizenCaseJson, createCitizenCaseJson.id);
    return createCitizenCaseJson;
}

async function enterBreathingSpace(I) {
    const eventName = caseEventName.ENTER_BREATHING_SPACE;
    await I.chooseNextStep(eventName);
    await I.enterBreathingSpacePage1();
    await I.enterBreathingSpacePage2();
    await I.enterEventSummary(eventName);
}

async function liftBreathingSpace(I) {
    const eventName = caseEventName.LIFT_BREATHING_SPACE;
    await I.chooseNextStep(eventName);
    await I.liftBreathingSpacePage1();
    await I.liftBreathingSpacePage2();
    await I.enterEventSummary(eventName);
}

async function handedToCCBC(I) {
    const eventName = caseEventName.CASE_HANDED_TO_CCBC;
    await I.chooseNextStep(eventName);
    await I.enterEventSummary(eventName);
}

async function enterBreathingSpaceOnline(I) {
    await I.enterBreathingSpaceOnlinePage();
}

async function enterBreathingSpaceError(I) {
    const eventName = caseEventName.ENTER_BREATHING_SPACE;
    await I.chooseNextStep(eventName);
    await I.see('The callback data failed validation');
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
    issuePaperDefenceForms,
    paperResponseReviewed,
    reviewOcon9xEvent,
    paperRespAdmission,
    paperRespDefence,
    enterBreathingSpace,
    liftBreathingSpace,
    handedToCCBC,
    enterBreathingSpaceOnline,
    enterBreathingSpaceError,
    signOut
};
