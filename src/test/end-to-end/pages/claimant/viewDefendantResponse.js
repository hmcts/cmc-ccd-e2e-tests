module.exports = async function() {
    const I = this;
    await I.click('View the defendant’s response');
    await I.waitInUrl('claimant-response/defendants-response');
    await I.click('input[type="submit"]');
};
