import { config } from '../../config/config';
import {caseworker, legalAdvisor, judge} from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe.configure({mode: 'parallel'});

  teardown.describe('Signing out manage case users and deleting cookies', () => {
    teardown('judge', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ManageCaseLogin(judge);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      IdamSteps.DeleteCookies(judge.cookiesPath!);
    });
    
    teardown('legal advisor', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ManageCaseLogin(legalAdvisor);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      IdamSteps.DeleteCookies(legalAdvisor.cookiesPath!);
    });
    
    teardown('caseworker', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ManageCaseLogin(caseworker);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      IdamSteps.DeleteCookies(caseworker.cookiesPath!);
    });
  });
}