'use strict';

const requireDirectory = require('require-directory');
const steps = requireDirectory(module);

module.exports = function () {
    return actor({
        authenticateWithIdam: steps.IDAM.signIn,
        chooseNextStep: steps.nextStep.nextStep,
        enterEventSummary: steps.eventSummary.eventSummary,
        enterGenerateOrderPage1: steps.generateOrder.page1,
        enterGenerateOrderPage2: steps.generateOrder.page2,
        enterReviewOrderPage1: steps.reviewOrder.page1,
        enterActionReviewCommentsPage1: steps.actionReviewComments.page1,
        enterActionReviewCommentsPage2: steps.actionReviewComments.page2,
        enterApproveDirectionOrderPage1: steps.approveDirectionOrder.page1,
        enterApproveDirectionOrderPage2: steps.approveDirectionOrder.page2,
        enterDrawDirectionsOrderPage1: steps.drawDirectionsOrder.page1,
        enterJudgeDrawDirectionsOrderPage1: steps.judgeDrawDirectionOrder.page1,
        enterJudgeDrawDirectionsOrderPage2: steps.judgeDrawDirectionOrder.page2,
        enterJudgeDrawDirectionsOrderPage3: steps.judgeDrawDirectionOrder.page3,
        enterJudgeDrawDirectionsOrderPage4: steps.judgeDrawDirectionOrder.page4,
        enterMediationSuccessPage1: steps.mediationSuccessful.page1,
        enterMediationSuccessPage2: steps.mediationSuccessful.page2,
        enterMediationFailurePage1: steps.mediationUnsuccessful.page1
    });
};
