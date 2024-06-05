import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

if(!config.skipCitizenSetup) {
  setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`,  {tag: '@setup'}, () => {
    setup(`Claimant`, async ({ApiSteps}) => {
      await ApiSteps.CreateCitizenUsers(claimants);
    });
    setup(`Defendant`, async ({ApiSteps}) => {
      await ApiSteps.CreateCitizenUsers(defendants);
    });
  });
}
else {
  console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
}