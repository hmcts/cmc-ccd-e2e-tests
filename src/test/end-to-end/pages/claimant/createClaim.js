const commonConfig = require('../common/commonConfig');

module.exports = async function() {
    const I = this;
    await I.amOnCitizenAppPage('/testing-support/create-claim-draft');
    await I.waitForNavigationToComplete(commonConfig.createDraftClaim);

    await I.waitInUrl('claim/check-and-send');
    await I.click('#signedtrue');
    await I.waitForNavigationToComplete(commonConfig.submitAndPay);

    await I.waitInUrl('card_details');
    await I.enterPaymentDetails();
    await I.confirmPayment();

    await I.waitInUrl('/confirmation');
    const claimRef = await I.extractClaimRef();
    return claimRef;
};
