import { test as base, TestInfo } from '@playwright/test';
import IdamSteps from '../steps/ui/idam/idam-steps';
import CitizenDashboardSteps from '../steps/ui/citizen/citizen-dashboard-steps';
import ExuiDashboardSteps from '../steps/ui/exui/exui-dashboard-steps';

type StepsFixtures = {
  IdamSteps: IdamSteps;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
};

export const test = base.extend<StepsFixtures>({
  IdamSteps: async ({page}: any, use: (arg0: IdamSteps) => any, testInfo: TestInfo) => {
    const isSetup = testInfo.tags.includes('@setup');
    await use(new IdamSteps(page, isSetup));
  },
  CitizenDashboardSteps: async ({page}: any, use: (arg0: CitizenDashboardSteps) => any) => {
    await use(new CitizenDashboardSteps(page));
  },
  ExuiDashboardSteps: async ({page}: any, use: (arg0: ExuiDashboardSteps) => any) => {
    await use(new ExuiDashboardSteps(page));
  },
});