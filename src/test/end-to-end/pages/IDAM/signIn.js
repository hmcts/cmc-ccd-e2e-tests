'use strict';

const testConfig = require('src/test/config.js');
const {ccdUserType} = require('../../common/userTypes');

module.exports = async function (userType, isAlreadyAtSignOnPage) {

    const I = this;

    if (!isAlreadyAtSignOnPage) {
        await I.amOnLoadedPage('/');
    }

    await I.waitForText('Sign in');

    switch (userType) {
    case ccdUserType.JUDGE:
        await I.fillField('#username', testConfig.TestEnvCWUser);
        await I.fillField('#password', testConfig.TestEnvCWPassword);
        break;
    case ccdUserType.LA:
        await I.fillField('#username', testConfig.TestEnvLAUser);
        await I.fillField('#password', testConfig.TestEnvLAPassword);
        break;
    case ccdUserType.CASEWORKER:
        await I.fillField('#username', testConfig.TestEnvJudgeUser);
        await I.fillField('#password', testConfig.TestEnvJudgePassword);
        break;
    default:
    }

    await I.waitForNavigationToComplete('input[type="submit"]');
};
