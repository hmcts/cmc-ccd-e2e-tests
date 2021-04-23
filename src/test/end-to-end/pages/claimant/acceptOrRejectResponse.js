module.exports = async function(type = 'ccj', admitType = '') {
    const I = this;
    await I.waitInUrl('claimant-response/task-list');
    if (admitType === 'PART_ADMISSION') {
        await I.click('Accept or reject the £2');
        await I.waitInUrl('claimant-response/settle-admitted');
        await I.click('#admittedyes');
        await I.click('Save and continue');
        await I.waitInUrl('claimant-response/task-list');
    }
    await I.click('Accept or reject their repayment plan');
    await I.waitInUrl('claimant-response/accept-payment-method');
    await I.click('//input[@id="acceptyes"]');
    await I.click('Save and continue');

    await I.waitInUrl('claimant-response/task-list');
    await I.click('Choose how to formalise repayment');
    await I.waitInUrl('claimant-response/choose-how-to-proceed');
    if (type === 'signAgreement') {
        await I.click('//input[@id="optionsignSettlementAgreement"]');
    } else if (type === 'ccj') {
        await I.click('//input[@id="optionrequestCCJ"]');
    }
    await I.click('Save and continue');
};
