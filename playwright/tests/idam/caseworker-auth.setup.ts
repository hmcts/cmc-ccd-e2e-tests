import { config } from '../../config/config';
import {judge, caseworker, legalAdvisor} from '../../config/users';
import { test as setup } from '../../playwright-fixtures/index';

setup.describe('Authenticating manage case users and saving cookies', {tag: '@setup'}, () => {
  if(!config.skipAuthSetup) {
    setup.describe.configure({mode: 'parallel'});
    
    setup('Judge', async ({ IdamSteps }) => {
      await IdamSteps.ManageCaseLogin(judge);
      await IdamSteps.SaveCookies(judge.cookiesPath!);
    });
    
    setup('Legal advisor', async ({ IdamSteps }) => {
      await IdamSteps.ManageCaseLogin(legalAdvisor);
      await IdamSteps.SaveCookies(legalAdvisor.cookiesPath!);
    });
    
    setup('Caseworker', async ({ IdamSteps }) => {
      await IdamSteps.ManageCaseLogin(caseworker);
      await IdamSteps.SaveCookies(caseworker.cookiesPath!);
    });
  } else {
    console.log('SKIP_AUTH_SETUP: Skipping authenticate manage case users and save cookies setup');
    console.log('SKIP_AUTH_SETUP: Manage case users will be logged in via Idam when needed during each test execution');
  }
});
