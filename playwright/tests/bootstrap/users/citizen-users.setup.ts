import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

if(!config.skipCitizenSetup) {
  setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`, () => {
    setup.describe.configure({mode: 'parallel'});
    setup('Claimant(s)', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
      await ApiCitizenUsersSteps.CreateCitizenUsers(claimants);
      throw new Error();
    });
    setup('Defendant(s)', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
      await ApiCitizenUsersSteps.CreateCitizenUsers(defendants);
      throw new Error();
    });
  });
}
else {
  console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
}