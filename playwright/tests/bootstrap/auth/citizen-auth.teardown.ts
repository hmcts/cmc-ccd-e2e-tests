import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

if (!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies', () => {
    teardown.describe.configure({ mode: 'parallel' });

    teardown('Worker 1: Claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.ClaimantLogin(0);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      await CitizenDashboardSteps.DeleteCookies(claimants, 0);
    });

    for (let workerIndex = 0; workerIndex < config.playwright.workers; workerIndex++) {
      if (workerIndex > 0)
        teardown(`Worker ${workerIndex + 1}: Claimant`, async ({ CitizenDashboardSteps }) => {
          await CitizenDashboardSteps.DeleteCookies(claimants, workerIndex);
        });

      teardown(`Worker ${workerIndex + 1}: Defendant`, async ({ CitizenDashboardSteps }) => {
        await CitizenDashboardSteps.DeleteCookies(defendants, workerIndex);
      });
    }
  });
}
