'use strict';

const testConfig = require('src/test/config.js');
const {ccdUserType} = require('../../common/Constants');

module.exports = async function (userType, isAlreadyAtSignOnPage) {
    const I = this;
    let user = '';

    if (!isAlreadyAtSignOnPage) {
        await I.amOnLoadedPage('/');
    }

    await I.waitForText('Sign in');

    switch (userType) {
    case ccdUserType.JUDGE:
        user = testConfig.JudgeUser;
        break;
    case ccdUserType.LA:
        user = testConfig.LegalAdvisorUser;
        break;
    case ccdUserType.CASEWORKER:
        user = testConfig.CaseWorkerUser;
        break;
    default:
    }

    await I.fillField('#username', user.email);
    await I.fillField('#password', user.password);

    await I.waitForNavigationToComplete('input[type="submit"]');
};
