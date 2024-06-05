import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import FileSystemHelper from '../../../helpers/file-system-helper';
import { test as teardown } from '../../../playwright-fixtures/index';

if(!config.skipAuthSetup) {
  teardown.describe('Signing out citizen users and deleting cookies',{tag: '@teardown'}, () => {
    teardown.describe.configure({mode: 'parallel'});

    teardown('Worker 1: Claimant', async ({ IdamSteps, CitizenDashboardSteps }) => {
      await IdamSteps.CitizenLogin(claimants, 0);
      await CitizenDashboardSteps.GoToDashboard();
      await CitizenDashboardSteps.SignOut();
      FileSystemHelper.deleteFile(claimants[0].cookiesPath);
    });

    for(let workerIndex = 0; workerIndex < config.playwright.workers; workerIndex++) {
      if(workerIndex > 0)
        teardown(`Worker ${workerIndex + 1}: Claimant`, async () => {
          FileSystemHelper.deleteFile(claimants[workerIndex].cookiesPath);
        });
      
      teardown(`Worker ${workerIndex + 1}: Defendant`, async () => {
        FileSystemHelper.deleteFile(defendants[workerIndex].cookiesPath);
      });
    }

  });
}