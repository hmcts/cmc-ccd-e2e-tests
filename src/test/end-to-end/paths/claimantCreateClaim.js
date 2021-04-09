const {userType} = require('../common/Constants');

Feature('Create claim flow)');

 Scenario('Create Claimant flow', async ({I}) => {
    //claimant steps
    await I.amOnCitizenAppPage('');
    await I.authenticateWithIdam(userType.CITIZEN, true);
    const claimRef = await I.createClaim();
    console.log('Create claim ref..', claimRef);
    await I.click('Sign out');
 }).tag('@crossbrowser')
      .retry(testConfig.TestRetryScenarios);