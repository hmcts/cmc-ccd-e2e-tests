import IdamClient from '../helpers/idam-client';
import { claimant, defendant } from '../config/users';
import urls from '../config/urls';
import CitizenUserStateHelper from '../helpers/citizen-users-state-helper';
import config from '../config/config';

const teardown = async () => {
  if(!config.skipCitizenSetup) {
    try {
      if (urls.idamApi) {
        await Promise.all([
          console.log('Deleting test users...'),
          IdamClient.deleteUser(claimant.email),
          IdamClient.deleteUser(defendant.email),
          IdamClient.deleteUsers([claimant.email, defendant.email]),
        ]);
        CitizenUserStateHelper.deleteUsersState();
      }
    } catch (error) {
      console.error('Error during teardown, exiting', error);
    }
  }
};

export default teardown;
