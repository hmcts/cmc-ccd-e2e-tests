import { test as base } from './test-data-fixture';
import ApiSteps from '../steps/api/api-steps';

type ApiStepsFixtures = {
  ApiSteps: ApiSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiSteps: async ({testData, request}, use: (arg0: ApiSteps) => any) => {
    await use(new ApiSteps(request, testData));
  },
  
});