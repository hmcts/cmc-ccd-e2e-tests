import config from '../../../config/config';
import {judge} from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe.configure({mode: 'parallel'});

  teardown.describe('Signing out exui users', () => {
    teardown('Judge', async ({ IdamSteps, ExuiDashboardSteps }) => {
      await IdamSteps.JudgeLogin();
      await ExuiDashboardSteps.GoToCaseList();
      await ExuiDashboardSteps.SignOut();
    });
  });
}