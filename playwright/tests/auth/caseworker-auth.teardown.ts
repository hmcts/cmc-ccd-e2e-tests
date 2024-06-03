import config from '../../config/config';
import {caseworker, legalAdvisor, judge} from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe.configure({mode: 'parallel'});

  teardown.describe('Signing out manage case users and deleting cookies', {tag: '@teardown'}, () => {
    teardown('judge', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ExuiLogin(judge);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      await ExuiDashboardSteps.DeleteCookies(judge.cookiesPath!);
    });
    
    teardown('legal advisor', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ExuiLogin(legalAdvisor);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      await ExuiDashboardSteps.DeleteCookies(legalAdvisor.cookiesPath!);
    });
    
    teardown('caseworker', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ExuiLogin(caseworker);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      await ExuiDashboardSteps.DeleteCookies(caseworker.cookiesPath!);
    });
  });
}