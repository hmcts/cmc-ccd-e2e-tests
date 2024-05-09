import { config } from '../../config/config';
import { test as setup } from '../../playwright-fixtures/index';
import {claimant, defendant} from '../../config/users';

setup.describe('Authenticating citizen frontend users and saving cookies',  {tag: '@setup'}, () => {
  if(!config.skipAuthSetup) {
    setup.describe.configure({mode: 'parallel'});
    setup('Claimant', async ({ CitizenDashboardSteps }) => {
      await CitizenDashboardSteps.Login(claimant);
      await CitizenDashboardSteps.SaveCookies(claimant.cookiesPath!);
    });
    setup('Defendant', async ({ CitizenDashboardSteps }) => {
      await CitizenDashboardSteps.Login(defendant);
      await CitizenDashboardSteps.SaveCookies(defendant.cookiesPath!);
    });
  } else {
    console.log('SKIP_AUTH_SETUP: Skipping authenticate citizen users and save cookies setup');
    console.log('SKIP_AUTH_SETUP: citizen users will be logged in via Idam when needed during each test execution');
  }
});