const testConfig = require('src/test/config.js');
const commonConfig = require('src/test/end-to-end/pages/common/commonConfig');
const eventSummaryConfig = require('src/test/end-to-end/pages/eventSummary/eventSummaryConfig');

module.exports = async function (nextStepName) {
  const I = this;

  let eventSummaryPrefix = nextStepName;

  await I.waitForText(nextStepName, testConfig.TestTimeToWaitForText);
  await I.runAccessibilityTest();

  eventSummaryPrefix =
    eventSummaryPrefix.replace(/\s+/g, '_').toLowerCase() + '_';

  await I.waitForElement('#field-trigger-summary');

  await I.fillField(
    '#field-trigger-summary',
    eventSummaryPrefix + eventSummaryConfig.summary,
  );
  await I.fillField(
    '#field-trigger-description',
    eventSummaryPrefix + eventSummaryConfig.comment,
  );

  await I.waitForNavigationToComplete(commonConfig.continueButton);
};
