import config from '../../../config/config';
import {judge, caseworker, legalAdvisor} from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';


setup.describe('Authenticating exui users and saving cookies', () => {
  setup.skip(config.skipAuthSetup, 'Skip authenticate exui users and save cookies setup');
  setup.describe.configure({mode: 'parallel'});
  
  setup('Judge', {tag: '@verify-cookies-banner'}, async ({ IdamSteps, ExuiDashboardSteps }) => {
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.AcceptCookies();
    await ExuiDashboardSteps.SaveCookies(judge.cookiesPath!);
  });
  
  setup('Legal advisor', async ({ IdamSteps, ExuiDashboardSteps }) => {
    await IdamSteps.LegalAdvisorLogin();
    await ExuiDashboardSteps.SaveCookies(legalAdvisor.cookiesPath!);
  });
  
  setup('Caseworker', async ({ IdamSteps, ExuiDashboardSteps }) => {
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.SaveCookies(caseworker.cookiesPath!);
  });
}); 

if(config.skipAuthSetup) {
  console.log('SKIP_AUTH_SETUP: Skip authenticate exui users and save cookies setup');
  console.log('SKIP_AUTH_SETUP: Exui users will be logged in via Idam when needed during each test execution');
}
