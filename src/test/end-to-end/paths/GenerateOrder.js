'use strict';

const testConfig = require('../../config');
const caseHelper = require('../api/caseHelper');
const createCitizenCaseJson = require('../fixtures/data/CreateCaseByCitizen');
const {caseEventId, caseEventName} = require('../common/Constants');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);

Feature('Generate Order').retry(testConfig.TestRetryFeatures);

Scenario('Create case and draw Directions Order', async ({I}) => {
    await caseHelper.setUpApiAuthToken(testConfig.citizenUser);

    logger.info({message: 'Creating a case in ccd with given json'});
    const updatedCaseJson = await caseHelper.createOpenCase(I, createCitizenCaseJson);
    const caseId = updatedCaseJson.id;

    await caseHelper.updateApiEvent(caseEventId.CLAIMANT_REJECTS, updatedCaseJson, caseId);
    await caseHelper.updateApiEvent(caseEventId.ASSIGN_FOR_DIRECTIONS, updatedCaseJson, caseId);

    logger.info({message: 'Created a case in ccd with id: ', caseId});
    await caseHelper.updateJudgeEvent(I, caseEventName.PROVIDE_DIRECTIONS, caseId);
    await caseHelper.signOut(I);
    await caseHelper.updateLAEvent(I, caseEventName.GENERATE_ORDER, caseId);
}).tag('@crossbrowser')
    .retry(testConfig.TestRetryScenarios);
