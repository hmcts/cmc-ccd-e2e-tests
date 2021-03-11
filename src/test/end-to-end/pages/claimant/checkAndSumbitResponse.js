module.exports = async function() {
    const I = this;
    await I.click('Check and submit your response');
    await I.waitInUrl('claimant-response/check-and-send');
    await I.click('input[type="submit"]');
};
