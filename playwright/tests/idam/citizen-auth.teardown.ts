import { config } from '../../config/config';
import { claimant, defendant } from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies', () => {
    teardown.describe.configure({mode: 'parallel'});
    
    teardown('claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenFrontEndLogin(claimant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      IdamSteps.DeleteCookies(claimant.cookiesPath!);
    });
    
    teardown('defendant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenFrontEndLogin(defendant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      IdamSteps.DeleteCookies(defendant.cookiesPath!);
    });
  });
}