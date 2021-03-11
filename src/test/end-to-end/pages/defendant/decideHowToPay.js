module.exports = async function(response) {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Decide how you’ll pay');
    await I.waitInUrl('response/full-admission/payment-option');
    await I.click('//input[@id="optionBY_SPECIFIED_DATE"]');
    await I.click('Save and continue');

    await I.waitInUrl('response/full-admission/payment-date');
    await I.fillField('//input[@id="date[day]"]', 23);
    await I.fillField('//input[@id="date[month]"]', 9);
    await I.fillField('//input[@id="date[year]"]', 2025);
    await I.click('Save and continue');
};
