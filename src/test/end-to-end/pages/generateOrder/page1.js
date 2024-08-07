const testConfig = require('../../../config');
const generateOrderConfig = require('./generateOrderConfig');
const commonConfig = require('../common/commonConfig');

module.exports = async function () {
  const I = this;
  const isSafariBrowser = await I.isSafariBrowser();

  if (isSafariBrowser) {
    await I.waitForClickable('#hearingCourt', testConfig.TestTimeToWaitForText);
    await I.waitForClickable(
      '#estimatedHearingDuration',
      testConfig.TestTimeToWaitForText,
    );
    await I.wait(5);
  } else {
    await I.waitForElement('#hearingCourt', testConfig.TestTimeToWaitForText);
  }
  await I.runAccessibilityTest();
  await I.selectOption('#hearingCourt', generateOrderConfig.page1_hearingCourt);
  await I.selectOption(
    '#estimatedHearingDuration',
    generateOrderConfig.page1_hearingDuration,
  );
  await I.waitForNavigationToComplete(commonConfig.continueButton);
};
