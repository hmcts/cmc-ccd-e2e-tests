import filePaths from '../config/file-paths';
import FileSystemHelper from '../helpers/file-system-helper';
import UserStateHelper from '../helpers/users-state-helper';

const globalTeardownCI = () => {
  UserStateHelper.deleteAllUsersState();
  FileSystemHelper.delete(`${filePaths.userCookies}/`);
};

globalTeardownCI();
