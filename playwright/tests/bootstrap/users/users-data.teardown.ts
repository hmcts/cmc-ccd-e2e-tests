import config from '../../../config/config';
import { caseworker, claimants, defendants, judge, legalAdvisor } from '../../../config/users';
import { test as teardown } from '../../../playwright-fixtures/index';

teardown.describe('Deleting user data', () => {
  teardown.describe.configure({ mode: 'parallel' });
  if (config.skipCitizenSetup) {
    teardown('Claimant(s)', async ({ ApiUsersSteps }) => {
      await ApiUsersSteps.DeleteUsersData(claimants);
    });
    teardown('Defendant(s)', async ({ ApiUsersSteps }) => {
      await ApiUsersSteps.DeleteUsersData(defendants);
    });
  }
  teardown('Caseworker(s)', async ({ ApiUsersSteps }) => {
    await ApiUsersSteps.DeleteUserData(caseworker);
  });
  teardown('Judge(s)', async ({ ApiUsersSteps }) => {
    await ApiUsersSteps.DeleteUserData(judge);
  });
  teardown('Legal Advisor(s)', async ({ ApiUsersSteps }) => {
    await ApiUsersSteps.DeleteUserData(legalAdvisor);
  });
});
