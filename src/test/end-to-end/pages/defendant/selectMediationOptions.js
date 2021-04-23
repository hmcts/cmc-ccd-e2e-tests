module.exports = async function(optForMediation) {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Free telephone mediation');

    await I.waitInUrl('mediation/free-mediation');
    await I.click('input[type="submit"]');
    await I.waitInUrl('mediation/how-mediation-works');
    if (optForMediation === 'yes') {
        await I.click('Continue with free mediation');

        await I.waitInUrl('mediation/mediation-agreement');
        await I.click('I agree');

        await I.waitInUrl('mediation/can-we-use');
        await I.click('#freeMediationOptionNO');
        await I.fillField('#mediationPhoneNumber', '0788788788');
        await I.click('Save and continue');
    } else {
        await I.click('I don’t want to try free mediation');

        await I.waitInUrl('mediation/mediation-disagreement');
        await I.click('//input[@id="optionno"]');
        await I.click('Save and continue');
    }

};
