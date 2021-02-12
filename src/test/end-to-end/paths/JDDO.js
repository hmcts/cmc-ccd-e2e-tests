const {ccdUserType} = require('../common/userTypes');
const testConfig = require('../../config');

Feature('JDDO').retry(testConfig.TestRetryFeatures);

Scenario('JDDO', async function (I) {
    await I.authenticateWithIdamIfAvailable(ccdUserType.JUDGE, false);
});
