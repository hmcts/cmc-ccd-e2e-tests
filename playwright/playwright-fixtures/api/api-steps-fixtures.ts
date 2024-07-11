import { test as base } from './requests-factory-fixtures';
import ApiCaseDataSteps from '../../steps/api/api-case-data-steps';
import ApiUsersSteps from '../../steps/api/api-users-steps';
import ApiCaseEventSteps from '../../steps/api/api-case-events-steps';

type ApiStepsFixtures = {
  _setupUserIds: void;
  _setupAuthTokens: void;
  ApiUsersSteps: ApiUsersSteps;
  ApiCaseDataSteps: ApiCaseDataSteps;
  ApiCaseEventsSteps: ApiCaseEventSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiUsersSteps: async ({_testData, _isSetupTest, _requestsFactory}, use: (arg0: ApiUsersSteps) => any) => {
    await use(new ApiUsersSteps(_requestsFactory, _isSetupTest, _testData));
  },
  ApiCaseDataSteps: async ({_testData, _requestsFactory, _isSetupTest}, use: (arg0: ApiCaseDataSteps) => any) => {
    await use(new ApiCaseDataSteps(_requestsFactory, _isSetupTest, _testData));
  },
  ApiCaseEventsSteps: async ({_testData, _requestsFactory, _caseDataFactory, _isSetupTest}, use: (arg0: ApiCaseEventSteps) => any) => {
    await use(new ApiCaseEventSteps(_requestsFactory, _caseDataFactory, _isSetupTest, _testData));
  },
});