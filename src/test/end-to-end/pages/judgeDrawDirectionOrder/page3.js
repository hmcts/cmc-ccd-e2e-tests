'use strict';

const testConfig = require('../../../config');
const commonConfig = require('../common/commonConfig');

module.exports = async function (claimNumber) {
    const I = this;
    const linkXPath = `//a[contains(text(), '${claimNumber}-Judge-Directions-Order.pdf')]`;
    await I.waitForClickable(linkXPath, testConfig.TestTimeToWaitForText);
    //await I.click(claimNumber + '-Judge-Directions-Order.pdf');
    await I.waitForNavigationToComplete(commonConfig.continueButton);
    await I.waitIn;
    await I.waitForNavigationToComplete(commonConfig.continueButton);
};
