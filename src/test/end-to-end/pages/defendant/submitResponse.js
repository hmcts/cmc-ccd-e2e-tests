module.exports = async function() {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Check and submit your response');
    await I.waitInUrl('start-page');
    await I.click('I don\'t want to answer these questions');
    await I.waitInUrl('response/check-and-send');
    await I.click('#signedtrue');
    await I.click('input[type="submit"]');
    await I.waitForText('submitted your response');
};
