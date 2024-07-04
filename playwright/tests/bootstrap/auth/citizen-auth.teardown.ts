import config from '../../../config/config';
import { claimants } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users', () => {
    teardown('Worker 1: Claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.ClaimantLogin(0);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
    });
  });
}