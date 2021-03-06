module.exports = async function() {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Confirm your details');
    await I.waitInUrl('response/your-details');
    await I.click('Save and continue');

    await I.waitInUrl('response/your-dob');
    await I.fillField('//input[@id="date[day]"]', 23);
    await I.fillField('//input[@id="date[month]"]', 9);
    await I.fillField('//input[@id="date[year]"]', 1980);
    await I.click('Save and continue');

    await I.waitInUrl('response/your-phone');
    await I.fillField('#number', '07444515326');
    await I.click('Save and continue');
};
