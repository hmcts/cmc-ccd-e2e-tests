const testConfig = require('../../../config');
const commonConfig = require('../common/commonConfig');

module.exports = async function (claimNumber) {
  const I = this;
  if (testConfig.TestForCrossBrowser) {
    await I.wait(5);
  }
  await I.waitInUrl('GenerateOrder2', testConfig.TestTimeToWaitForText);
  await I.runAccessibilityTest();
  const linkXPath = `//a[contains(text(), '${claimNumber}-Legal-Adviser-Directions-Order.pdf')]`;
  await I.waitForClickable(linkXPath, testConfig.TestTimeToWaitForText);
  await I.click('//input[@id="reviewOrDrawOrder-LA_REQUESTS_REVIEW_BY_JUDGE"]');
  //await I.click(claimNumber + '-Legal-Adviser-Directions-Order.pdf');
  await I.waitForNavigationToComplete(commonConfig.continueButton);
};
