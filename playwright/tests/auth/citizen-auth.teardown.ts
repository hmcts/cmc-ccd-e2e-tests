import { config } from '../../config/config';
import { claimant, defendant } from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies',{tag: '@teardown'}, () => {
    teardown.describe.configure({mode: 'parallel'});
    
    teardown('claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenLogin(claimant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      await CitizenDashboardSteps.DeleteCookies(claimant.cookiesPath!);
    });
    
    teardown('defendant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenLogin(defendant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      await CitizenDashboardSteps.DeleteCookies(defendant.cookiesPath!);
    });
  });
}