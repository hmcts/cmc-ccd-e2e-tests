import { test as base } from './test-data-fixture';
import CitizenApiSteps from '../steps/api/citizen/citizen-api-steps';
import ExuiApiSteps from '../steps/api/exui/exui-api-steps';

type ApiStepsFixtures = {
  CitizenApiSteps: CitizenApiSteps;
  ExuiApiSteps: ExuiApiSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  CitizenApiSteps: async ({page, testData}, use: (arg0: CitizenApiSteps) => any) => {
    await use(new CitizenApiSteps(page.request, testData));
  },
});