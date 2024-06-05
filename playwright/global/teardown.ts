import urls from "../config/urls";
import { claimants, defendants } from "../config/users";
import UserType from "../enums/user-type";
import CitizenUsersHelper from "../helpers/citizen-users-helper";
import FileSystemHelper from "../helpers/file-system-helper";
import User from "../types/user";

//This is last resort teardown for citizen users if test execution gets interupted.

const deleteUsers = async (users: User[]) => {
  const params = users
      .map(function ({email}) {
        return `userNames=${encodeURIComponent(email)}`;
      })
      .join('&');
  try {
    await fetch(`${urls.idamApi}/testing-support/test-data?${params}&async=true`, {method: 'DELETE'});
    console.log(`Users of type ${users[0].type} successfully deleted`);
  } catch(error) {
    console.log(`error deleting user/s ${params}: ` + error);
  }
}

const globalTeardown = async () => {
  const claimantsExist = FileSystemHelper.exists(CitizenUsersHelper.statePaths.claimant);
  const defendantExists = FileSystemHelper.exists(CitizenUsersHelper.statePaths.defendant);
  if(claimantsExist || defendantExists) {
    if(claimantsExist) {
      await deleteUsers(claimants)
      CitizenUsersHelper.deleteUsersState(UserType.CLAIMANT)
    }
    if(defendantExists) {
      await deleteUsers(defendants)
      CitizenUsersHelper.deleteUsersState(UserType.DEFENDANT)
    }
  }
}

export default globalTeardown;