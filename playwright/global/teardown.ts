import filePaths from '../config/filePaths';
import urls from '../config/urls';
import FileType from '../enums/file-type';
import UserType from '../enums/user-type';
import CitizenUsersHelper from '../helpers/citizen-users-helper';
import FileSystemHelper from '../helpers/file-system-helper';
import { request } from 'playwright-core';

//This is last resort teardown for citizen users if test execution gets interupted.




const deleteUsers = async (userType: UserType) => {
  
  try {
    const users = FileSystemHelper.readFile(CitizenUsersHelper.statePaths[userType], FileType.JSON);
    for(const user of users) {
      const response = await fetch(`${urls.idamApi}/testing-support/accounts/${user.email}`, {method: 'DELETE'});
      console.log(`User with email: ${user.email} successfully deleted`);
      if(response.status !== 204) {
        throw new Error(`Error deleting user: ${user.email}`);
      }
    }
  } catch(error) {
    if(error.name !== 'FileError') 
      console.log(error);
  }
};

const globalTeardown = async () => {
  await deleteUsers(UserType.CLAIMANT);
  await deleteUsers(UserType.DEFENDANT);
  CitizenUsersHelper.deleteAllUsersState();
  FileSystemHelper.delete(`${filePaths.userCookies}/`);
};

export default globalTeardown;