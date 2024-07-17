import config from '../../../config/config';
import { test as teardown } from '../../../playwright-fixtures/index';

teardown.describe('Signing out citizen users', () => {
  teardown.describe.configure({mode: 'parallel'});
  teardown.skip(config.skipAuthSetup);
  
  teardown('Worker 1: Claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
    await IdamSteps.ClaimantLogin(0);
    await CitizenDashboardSteps.GoToDashboard();
    await CitizenDashboardSteps.SignOut();
  });
});
