import { config } from '../../config/config';
import {caseworker, legalAdvisor, judge} from '../../config/users';
import { test as teardown } from '../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe.configure({mode: 'parallel'});

  teardown.describe('Signing out manage case users and deleting cookies', () => {
    teardown('judge', async ({ ExuiDashboardSteps }) => {
      await ExuiDashboardSteps.Login(judge);
      await ExuiDashboardSteps.SignOut();
      ExuiDashboardSteps.DeleteCookies(judge.cookiesPath!);
    });
    
    teardown('legal advisor', async ({ ExuiDashboardSteps }) => {
      await ExuiDashboardSteps.Login(legalAdvisor);
      await ExuiDashboardSteps.SignOut();
      ExuiDashboardSteps.DeleteCookies(legalAdvisor.cookiesPath!);
    });
    
    teardown('caseworker', async ({ ExuiDashboardSteps }) => {
      await ExuiDashboardSteps.Login(caseworker);
      await ExuiDashboardSteps.SignOut();
      ExuiDashboardSteps.DeleteCookies(caseworker.cookiesPath!);
    });
  });
}