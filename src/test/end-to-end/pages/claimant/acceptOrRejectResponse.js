module.exports = async function() {
    const I = this;
    await I.waitInUrl('claimant-response/task-list');
    await I.click('Accept or reject their repayment plan');
    await I.waitInUrl('claimant-response/accept-payment-method');
    await I.click('//input[@id="acceptyes"]');
    await I.click('Save and continue');

    await I.waitInUrl('claimant-response/task-list');
    await I.click('Choose how to formalise repayment');
    await I.waitInUrl('claimant-response/choose-how-to-proceed');
    await I.click('//input[@id="optionrequestCCJ"]');
    await I.click('Save and continue');
};
