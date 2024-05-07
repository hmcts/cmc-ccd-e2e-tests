import CitizenDashboardSteps from '../steps/ui/citizen/citizen-dashboard-steps';
import CreateClaimSteps from '../steps/ui/citizen/create-claim-steps';
import ExuiDashboardSteps from '../steps/ui/exui/exui-dashboard-steps';
import { test as base } from './test-data-fixture';

type UiStepsFixtures = {
  _isSetupTest: boolean;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSteps: CreateClaimSteps;
};

export const test = base.extend<UiStepsFixtures>({
  CitizenDashboardSteps: async ({page, testData}, use: (arg0: CitizenDashboardSteps) => any) => {
    await use(new CitizenDashboardSteps(page, testData));
  },
  ExuiDashboardSteps: async ({page, testData}, use: (arg0: ExuiDashboardSteps) => any) => {
    await use(new ExuiDashboardSteps(page, testData));
  },
  CreateClaimSteps: async ({page, testData}, use: (arg0: CreateClaimSteps) => any) => {
    await use(new CreateClaimSteps(page, testData));
  },
});