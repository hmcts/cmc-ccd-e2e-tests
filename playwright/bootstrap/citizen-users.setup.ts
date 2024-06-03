import IdamClient from '../helpers/idam-client';
import CitizenUserStateHelper from '../helpers/citizen-users-state-helper';
import { claimant, defendant } from '../config/users';
import User from '../types/user';
import config from '../config/config';
import UserRole from '../enums/user-role';

const handleError = (error: any) => {
  console.log('Error during bootstrap, exiting', error);
  process.exit(1);
};

const createCitizenUserIfDoesntExist = async ({
  email,
  password,
  role = UserRole.CITIZEN,
}: User) => {
  let bearerToken: string | undefined;
  try {
    console.log(`Authenticate user: ${email} `);
    bearerToken = await IdamClient.authenticateUser({ email, password });
  } catch (error: any) {
    if(error.response) {
      console.warn(`Failed authenticate User for: ${email}`);
      console.warn(`Status Code: ${error.response.status}`);
      console.warn(`Status Message: ${error.response.statusText}`);
    }
    try {
      const userData = await IdamClient.createCitizenUser({ email, password, role });
      bearerToken = await IdamClient.authenticateUser({ email, password });
      return userData;
    } catch (err: any) {
      if (err && err.statusCode === 409) {
        console.log(`ERROR:: User ${email} already exists.`);
      } else {
        throw err;
      }
    }
  }
};

const globalSetup = async () => {
  if(!config.skipCitizenSetup) {
    try {
      const results = await Promise.all([
        createCitizenUserIfDoesntExist(claimant),
        createCitizenUserIfDoesntExist(defendant),
      ]);
      const citizenUsers = {};
      if(results[0] || results[1]) {
        CitizenUserStateHelper.addUsersToState({
          claimant: {
            ...claimant,
            userId: results[0]?.id ?? undefined,
          },
          defendant: {
            ...defendant,
            userId: results[1]?.id ?? undefined,
          },
        });
      }
    } catch (error) {
      handleError(error);
    }
  } else {
    console.log('SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation');
  }
};

export default globalSetup;
