import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

teardown.describe(`Deleting citizen users for ${config.playwright.workers} worker(s)`, () => {
  teardown.skip(config.skipCitizenSetup);
  teardown.describe.configure({mode: 'parallel'});

  teardown('Claimant(s)', async ({ApiUsersSteps}) => {
    await ApiUsersSteps.DeleteCitizenUsers(claimants);
  });
  teardown('Defendant(s)', async ({ApiUsersSteps}) => {
    await ApiUsersSteps.DeleteCitizenUsers(defendants);
  });
});
