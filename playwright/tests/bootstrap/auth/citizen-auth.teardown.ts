import config from '../../../config/config';
import { test as teardown } from '../../../playwright-fixtures/index';

if (!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies', () => {
    teardown.describe.configure({ mode: 'parallel' });

    teardown('Worker 1: Claimant', async ({ IdamSteps, OcmcDashboardSteps }) => {
      await IdamSteps.ClaimantLogin(0);
      await OcmcDashboardSteps.GoToDashboard();
      await OcmcDashboardSteps.SignOut();
    });
  });
}
