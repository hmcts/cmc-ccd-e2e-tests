import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`, () => {
  setup.skip(config.skipCitizenSetup, 'Skip claimant and defendant user creation');
  setup.describe.configure({mode: 'parallel'});
  setup('Claimant(s)', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
    await ApiCitizenUsersSteps.CreateCitizenUsers(claimants);
  });
  setup('Defendant(s)', async ({ApiUsersSteps: ApiCitizenUsersSteps}) => {
    await ApiCitizenUsersSteps.CreateCitizenUsers(defendants);
  });
});

if(config.skipCitizenSetup) {
  console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
}