import { test as base, TestInfo } from '@playwright/test';
import CitizenDashboardSteps from '../steps/ui/citizen/citizen-dashboard-steps';
import ExuiDashboardSteps from '../steps/ui/exui/exui-dashboard-steps';
import CreateClaimSteps from '../steps/ui/citizen/create-claim-steps';

type StepsFixtures = {
  _isSetupTest: boolean;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSteps: CreateClaimSteps;
};

export const test = base.extend<StepsFixtures>({
  _isSetupTest: async ({page, _isSetupTest}: any, use: (arg0: boolean) => any, testInfo: TestInfo) => {
    await use(testInfo.tags.includes('@setup'));
  },
  CitizenDashboardSteps: async ({page}: any, use: (arg0: CitizenDashboardSteps) => any) => {
    await use(new CitizenDashboardSteps(page));
  },
  ExuiDashboardSteps: async ({page, _isSetupTest}: any, use: (arg0: ExuiDashboardSteps) => any) => {
    await use(new ExuiDashboardSteps(page));
  },
  CreateClaimSteps: async ({page}: any, use: (arg0: CreateClaimSteps) => any) => {
    await use(new CreateClaimSteps(page));
  },
});