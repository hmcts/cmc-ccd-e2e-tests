import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

if(!config.skipCitizenSetup) {
  setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`, () => {
    setup.describe.configure({mode: 'parallel'});
    setup('Claimant', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
      await ApiCitizenUsersSteps.CreateCitizenUsers(claimants);
    });
    setup('Defendant', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
      await ApiCitizenUsersSteps.CreateCitizenUsers(defendants);
    });
  });
}
else {
  console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
}