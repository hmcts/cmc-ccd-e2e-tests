'use strict';

const testConfig = require('../../../config');
const actionReviewCommentsConfig = require('./actionReviewCommentsConfig');
const commonConfig = require('../common/commonConfig');

module.exports = async function () {
    const I = this;
    await I.waitForElement('#hearingCourt', testConfig.TestTimeToWaitForText);
    await I.selectOption('#hearingCourt', actionReviewCommentsConfig.page1_hearingCourt);
    await I.selectOption('#estimatedHearingDuration', actionReviewCommentsConfig.page1_hearingDuration);
    await I.waitForNavigationToComplete(commonConfig.continueButton);
};
