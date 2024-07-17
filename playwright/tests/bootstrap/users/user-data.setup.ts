import config from '../../../config/config';
import { caseworker, claimants, defendants, judge, legalAdvisor } from '../../../config/users';
import { test as setup } from '../../../playwright-fixtures/index';

setup.describe('Setting up user data', () => {
  setup.describe.configure({mode: 'parallel'});
  
  setup('Claimant(s)', async ({ApiUsersSteps}) => {
    setup.skip(!config.skipCitizenSetup);
    await ApiUsersSteps.SetupUsersData(claimants);
  });
  setup('Defendant(s)', async ({ApiUsersSteps}) => {
    setup.skip(!config.skipCitizenSetup);
    await ApiUsersSteps.SetupUsersData(defendants);
  });
  setup('Caseworker(s)', async ({ApiUsersSteps}) => {
    await ApiUsersSteps.SetupUserData(caseworker);
  });
  setup('Judge(s)', async ({ApiUsersSteps}) => {
    await ApiUsersSteps.SetupUserData(judge);
  });
  setup('Legal Advisor(s)', async ({ApiUsersSteps}) => {
    await ApiUsersSteps.SetupUserData(legalAdvisor);
  });
});