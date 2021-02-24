'use strict';

const testConfig = require('../../config');
const caseHelper = require('../api/caseHelper');
const createCitizenCaseJson = require('../fixtures/data/CreateCaseByCitizenForJDDO');
const {caseEventId} = require('../common/Constants');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);

Feature('Judge Draw Direction Order').retry(testConfig.TestRetryFeatures);

Scenario('Create case and JDDO - claim amount > 500', async ({I}) => {
    await caseHelper.setUpApiAuthToken(testConfig.citizenUser);

    logger.info({message: 'Creating a case in ccd with given json'});
    const updatedCaseJson = await caseHelper.createOpenCase(I, createCitizenCaseJson);
    const caseId = updatedCaseJson.id;

    logger.info({message: 'Created a case in ccd with id: ', caseId});

    await caseHelper.updateApiEvent(caseEventId.CLAIMANT_REJECTS, updatedCaseJson, caseId);
    await caseHelper.updateApiEvent(caseEventId.ASSIGN_FOR_JUDGE_DIRECTIONS, updatedCaseJson, caseId);
    logger.info({message: 'Case is updated to Ready for direction - judge: ', caseId});

    await caseHelper.JudgeDrawDirectionOrder(I, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'Judge has updated the event JUDGE DRAW DIRECTION ORDER on ', caseId});
}).tag('@crossbrowser')
    .retry(testConfig.TestRetryScenarios);
