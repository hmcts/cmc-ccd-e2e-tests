import CitizenUsersHelper from '../helpers/citizen-users-helper';
import User from '../types/user';
import UserRole from '../enums/user-role';
import UserType from '../enums/user-type';
import filePaths from './file-paths';
import config from './config';

export const legalAdvisor: User = {
  email: process.env.LA_USER_EMAIL,
  password: process.env.LA_USER_PASSWORD,
  type: UserType.LEGALADVISOR,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/legal-advisor.json`,
  userId: process.env.LA_USER_ID,
};

export const caseworker: User = {
  email: process.env.CW_USER_EMAIL,
  password: process.env.CW_USER_PASSWORD,
  type: UserType.CASEWORKER,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/caseworker.json`,
  userId: process.env.CW_USER_ID,
};

export const judge: User = {
  email: process.env.JUDGE_USER_EMAIL,
  password: process.env.JUDGE_USER_PASSWORD,
  type: UserType.JUDGE,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/judge.json`,
  userId: process.env.JUDGE_USER_ID,
};

export const claimants: User[] =
  CitizenUsersHelper.getUsersFromState(UserType.CLAIMANT, config.playwright.workers, process.env.SMOKE_TEST_USER_PASSWORD);

export const defendants: User[] =
  CitizenUsersHelper.getUsersFromState(UserType.DEFENDANT, config.playwright.workers, process.env.SMOKE_TEST_USER_PASSWORD);

export default {
  legalAdvisor,
  caseworker,
  judge,
  claimants,
  defendants,
};
