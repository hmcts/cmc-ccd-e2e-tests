module.exports = async function(response) {
    const I = this;
    await I.waitInUrl('response/task-list');
    await I.click('Choose a response');
    await I.waitInUrl('response/response-type');
    await I.click(`//input[@id="type[value]${response}"]`);
    await I.click('Save and continue');
};
