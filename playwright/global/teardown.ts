import filePaths from '../config/file-paths';
import urls from '../config/urls';
import UserType from '../enums/user-type';
import CitizenUsersHelper from '../helpers/citizen-users-helper';
import FileSystemHelper from '../helpers/file-system-helper';
//This is last resort teardown for citizen users if test execution gets interupted.

const deleteUsers = async (userType: UserType) => {
  if(CitizenUsersHelper.userStateExists(userType)) {
    try {
      const users = CitizenUsersHelper.getUsersFromState(userType);
      for(const user of users) {
        const response = await fetch(`${urls.idamApi}/testing-support/accounts/${user.email}`, {method: 'DELETE'});
        if(response.status !== 204) {
          throw new Error(`Error deleting user: ${user.email}`);
        }
        console.log(`User with email: ${user.email} successfully deleted`);
      }
    } catch(error) {
      if(error.name !== 'FileError') 
        console.log(error);
    }
  }
};

const globalTeardown = async () => {
  await deleteUsers(UserType.CLAIMANT);
  await deleteUsers(UserType.DEFENDANT);
  CitizenUsersHelper.deleteAllUsersState();
  // FileSystemHelper.delete(`${filePaths.userCookies}/`);
};

export default globalTeardown;