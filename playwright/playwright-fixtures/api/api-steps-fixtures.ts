import { test as base } from './requests-factory-fixtures';
import ApiCaseDataSteps from '../../steps/api/api-case-data-steps';
import ApiUsersSteps from '../../steps/api/api-users-steps';
import ApiCaseEventSteps from '../../steps/api/api-case-events-steps';

type ApiStepsFixtures = {
  ApiUsersSteps: ApiUsersSteps;
  ApiCaseDataSteps: ApiCaseDataSteps;
  ApiCaseEventsSteps: ApiCaseEventSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiUsersSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiUsersSteps(_requestsFactory, _testData));
  },
  ApiCaseDataSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiCaseDataSteps(_requestsFactory, _testData));
  },
  ApiCaseEventsSteps: async ({ _testData, _requestsFactory, _caseDataFactory }, use) => {
    await use(new ApiCaseEventSteps(_requestsFactory, _caseDataFactory, _testData));
  },
});
