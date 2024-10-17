import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

if (!config.skipCitizenSetup) {
  setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`, () => {
    setup.describe.configure({ mode: 'parallel' });
    setup('Claimant(s)', async ({ ApiUsersSteps }) => {
      await ApiUsersSteps.CreateCitizenUsers(claimants);
    });
    setup('Defendant(s)', async ({ ApiUsersSteps }) => {
      await ApiUsersSteps.CreateCitizenUsers(defendants);
    });
  });
} else {
  console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
}
