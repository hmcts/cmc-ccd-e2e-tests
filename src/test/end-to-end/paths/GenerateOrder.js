'use strict';

const testConfig = require('../../config');
const caseHelper = require('../api/caseHelper');
const createCitizenCaseJson = require('../fixtures/data/CreateCaseByCitizen');
const {caseEventId, caseEventName} = require('../common/Constants');

const logger = require('@hmcts/nodejs-logging').Logger.getLogger(__filename);

Feature('Draw Direction Order by LA').retry(testConfig.TestRetryFeatures);

Scenario('Generate Order flow - claim amount < 500', async ({I}) => {
    await caseHelper.setUpApiAuthToken(testConfig.citizenUser);

    logger.info({message: 'Creating a case in ccd with given json'});
    const updatedCaseJson = await caseHelper.createOpenCase(I, createCitizenCaseJson);
    const caseId = updatedCaseJson.id;
    logger.info({message: 'Created a case in ccd with id: ', caseId});

    await caseHelper.updateApiEvent(caseEventId.CLAIMANT_REJECTS, updatedCaseJson, caseId);
    await caseHelper.updateApiEvent(caseEventId.ASSIGN_FOR_DIRECTIONS, updatedCaseJson, caseId);

    await caseHelper.updateJudgeEvent(I, caseEventName.PROVIDE_DIRECTIONS, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'Judge has updated the event PROVIDE_DIRECTIONS on ', caseId});

    await caseHelper.updateLAEvent(I, caseEventName.GENERATE_ORDER, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'LA has updated the event GENERATE_ORDER on ', caseId});

    await caseHelper.reviewOrder(I, caseEventName.REVIEW_ORDER, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'Judge has updated the event REVIEW_ORDER on ', caseId});

    await caseHelper.actionReviewComments(I, caseEventName.ACTION_REVIEW_COMMENTS, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'LA has updated the event ACTION_REVIEW_COMMENTS on ', caseId});

    await caseHelper.approveDirectionOrder(I, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'Judge has updated the event APPROVE DIRECTION ORDER on ', caseId});

    await caseHelper.drawDirectionOrder(I, updatedCaseJson, caseId);
    await caseHelper.signOut(I);
    logger.info({message: 'LA has updated the event DRAW DIRECTION ORDER on ', caseId});
}).tag('@crossbrowser')
    .retry(testConfig.TestRetryScenarios);
