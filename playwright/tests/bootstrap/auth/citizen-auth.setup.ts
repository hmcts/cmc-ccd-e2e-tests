import config from '../../../config/config';
import { test as setup } from '../../../playwright-fixtures/index';
import { claimants, defendants } from '../../../config/users';

if (!config.skipAuthSetup) {
  setup.describe('Authenticating citizen users and saving cookies', () => {
    setup.describe.configure({ mode: 'parallel' });

    setup('Worker 1: Claimant', { tag: '@verify-cookies-banner' }, async ({ IdamSteps, OcmcDashboardSteps }) => {
      await IdamSteps.ClaimantLogin(0);
      await OcmcDashboardSteps.AcceptCookies();
      await OcmcDashboardSteps.SaveCookies(claimants, 0);
    });

    for (let workerIndex = 0; workerIndex < config.playwright.workers; workerIndex++) {
      if (workerIndex > 0)
        setup(`Worker ${workerIndex + 1}: Claimant`, async ({ IdamSteps, OcmcDashboardSteps }) => {
          await IdamSteps.ClaimantLogin(workerIndex);
          await OcmcDashboardSteps.SaveCookies(claimants, workerIndex);
        });

      setup(`Worker ${workerIndex + 1}: Defendant`, async ({ IdamSteps, OcmcDashboardSteps }) => {
        await IdamSteps.DefendantLogin(workerIndex);
        await OcmcDashboardSteps.SaveCookies(defendants, workerIndex);
      });
    }
  });
} else {
  console.log('SKIP_AUTH_SETUP: Skip authenticate citizen users and save cookies setup');
  console.log('SKIP_AUTH_SETUP: Citizen users will be logged in via Idam when needed during each test execution');
}
