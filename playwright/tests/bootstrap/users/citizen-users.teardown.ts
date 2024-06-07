import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

if(!config.skipCitizenSetup) {
  teardown.describe(`Deleting citizen users for ${config.playwright.workers} worker(s)`, () => {
    teardown.describe.configure({mode: 'parallel'});

    teardown('Claimant', async ({ApiSteps}) => {
      await ApiSteps.DeleteCitizenUsers(claimants);
    });
    teardown('Defendant', async ({ApiSteps}) => {
      await ApiSteps.DeleteCitizenUsers(defendants);
    });
  });
}