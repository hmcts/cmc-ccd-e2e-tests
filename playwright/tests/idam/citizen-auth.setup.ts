import { config } from '../../config/config';
import { test as setup } from '../../playwright-fixtures/index';
import {claimant, defendant} from '../../config/users';

setup.describe('Authenticating citizen frontend users and saving cookies',  {tag: '@setup'}, () => {
  if(!config.skipAuthSetup) {
    setup.describe.configure({mode: 'parallel'});
    setup('Claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenFrontEndLogin(claimant);
      await CitizenDashboardSteps.AcceptCookies();
      await IdamSteps.SaveCookies(claimant.cookiesPath!);
    });
    setup('Defendant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenFrontEndLogin(defendant);
      await CitizenDashboardSteps.AcceptCookies();
      await IdamSteps.SaveCookies(defendant.cookiesPath!);
    });
  } else {
    console.log('SKIP_AUTH_SETUP: Skipping authenticate citizen users and save cookies setup');
    console.log('SKIP_AUTH_SETUP: citizen users will be logged in via Idam when needed during each test execution');
  }
});