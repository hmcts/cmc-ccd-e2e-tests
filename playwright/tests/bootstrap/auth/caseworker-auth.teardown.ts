import config from '../../../config/config';
import {caseworker, legalAdvisor, judge} from '../../../config/users';
import FileSystemHelper from '../../../helpers/file-system-helper';
import { test as teardown } from '../../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe.configure({mode: 'parallel'});

  teardown.describe('Signing out exui users', {tag: '@teardown'}, () => {
    teardown('Judge', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.ExuiLogin(judge);
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
      FileSystemHelper.deleteFile(judge.cookiesPath);
    });
    
    teardown('Legal Advisor', async () => {
      FileSystemHelper.deleteFile(legalAdvisor.cookiesPath);
    });
    
    teardown('Caseworker', async () => {
      FileSystemHelper.deleteFile(caseworker.cookiesPath);
    });
  });
}