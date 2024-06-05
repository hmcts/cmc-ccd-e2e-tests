import { test as base } from './requests-factory-fixtures';
import ApiSteps from '../../steps/api/api-steps';

type ApiStepsFixtures = {
  ApiSteps: ApiSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiSteps: async ({_testData, _requestsFactory, _isSetupTest}, use: (arg0: ApiSteps) => any) => {
    await use(new ApiSteps(_requestsFactory, _testData, _isSetupTest));
  }
});