import config from '../../../config/config';
import { caseworker, judge, legalAdvisor } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

if (!config.skipAuthSetup) {
  teardown.describe('Signing out exui users and deleting cookies', () => {
    teardown.describe.configure({ mode: 'parallel' });

    teardown('Judge', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.JudgeLogin();
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      await ExuiDashboardSteps.DeleteCookies(judge);
    });

    teardown('Legal Advisor', async ({ ExuiDashboardSteps }) => {
      await ExuiDashboardSteps.DeleteCookies(legalAdvisor);
    });

    teardown('Caseworker', async ({ ExuiDashboardSteps }) => {
      await ExuiDashboardSteps.DeleteCookies(caseworker);
    });
  });
}
