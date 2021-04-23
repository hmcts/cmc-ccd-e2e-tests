const testConfig = require('../../../config');

module.exports = async function(type = '') {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Check and submit your response');
    if (testConfig.env === 'aat') {
        await I.waitInUrl('start-page');
        await I.click('I don\'t want to answer these questions');
    }
    await I.waitInUrl('response/check-and-send');
    await I.click('#signedtrue');
    if (type === 'PART_ADMISSION' || type === 'DEFENCE') {
        await I.click('#directionsQuestionnaireSignedtrue');
    }
    await I.click('input[type="submit"]');
    await I.waitForText('submitted your response');
};
