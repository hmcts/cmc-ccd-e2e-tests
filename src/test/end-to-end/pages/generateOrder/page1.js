'use strict';

const testConfig = require('../../../config');
const generateOrderConfig = require('./generateOrderConfig');
const commonConfig = require('../common/commonConfig');

module.exports = async function () {
    const I = this;
    await I.waitForElement('#hearingCourt', testConfig.TestTimeToWaitForText);
    await I.selectOption('#hearingCourt', generateOrderConfig.page1_hearingCourt);
    await I.selectOption('#estimatedHearingDuration', generateOrderConfig.page1_hearingDuration);
    await I.waitForNavigationToComplete(commonConfig.continueButton);
};
