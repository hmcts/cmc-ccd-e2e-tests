'use strict';

const bsConfig = require('./bsConfig');
const commonConfig = require('../common/commonConfig');

module.exports = async function () {
    const I = this;
    await I.fillField('#breathingSpace_bsLiftedDateByInsolvencyTeam-day', bsConfig.page1_BS_day);
    await I.fillField('#breathingSpace_bsLiftedDateByInsolvencyTeam-month', bsConfig.page1_BS_month);
    await I.fillField('#breathingSpace_bsLiftedDateByInsolvencyTeam-year', bsConfig.page1_BS_year);
    await I.waitForNavigationToComplete(commonConfig.continueButton);
};
