import { config } from '../../config/config';
import { claimant, defendant } from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies', () => {
    teardown.describe.configure({mode: 'parallel'});
    
    teardown('claimant', async ({ CitizenDashboardSteps }) => {
      await CitizenDashboardSteps.Login(claimant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      await CitizenDashboardSteps.DeleteCookies(claimant.cookiesPath!);
    });
    
    teardown('defendant', async ({ CitizenDashboardSteps }) => {
      await CitizenDashboardSteps.Login(defendant);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      await CitizenDashboardSteps.DeleteCookies(defendant.cookiesPath!);
    });
  });
}