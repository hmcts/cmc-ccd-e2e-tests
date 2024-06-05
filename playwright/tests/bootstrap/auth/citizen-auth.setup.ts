import config from '../../../config/config';
import { test as setup } from '../../../playwright-fixtures/index';
import {claimants, defendants} from '../../../config/users';

if(!config.skipAuthSetup) {
  setup.describe('Authenticating citizen users and saving cookies',  {tag: '@setup'}, () => {
    setup.describe.configure({mode: 'parallel'});

    setup('Worker 1: Claimant', {tag: '@verify-cookies-banner'}, async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenLogin(claimants, 0);
      await CitizenDashboardSteps.AcceptCookies();
      await CitizenDashboardSteps.SaveCookies(claimants, 0);
    });

    for(let workerIndex = 0; workerIndex < config.playwright.workers; workerIndex++) {
      if(workerIndex > 0)
        setup(`Worker ${workerIndex + 1}: Claimant`, async ({ IdamSteps, CitizenDashboardSteps }) => {
          await IdamSteps.CitizenLogin(claimants, workerIndex);
          await CitizenDashboardSteps.SaveCookies(claimants, workerIndex);
        });

      setup(`Worker ${workerIndex + 1}: Defendant`, async ({ IdamSteps, CitizenDashboardSteps }) => {
        await IdamSteps.CitizenLogin(defendants, workerIndex);
        await CitizenDashboardSteps.SaveCookies(defendants, workerIndex);
      });
    }
  });

} else {
  console.log('SKIP_AUTH_SETUP: Skip authenticate citizen users and save cookies setup');
  console.log('SKIP_AUTH_SETUP: Citizen users will be logged in via Idam when needed during each test execution');
}