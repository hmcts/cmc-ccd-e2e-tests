import CitizenUserStateHelper from '../helpers/citizen-users-state-helper';
import User from '../types/user';
import UserRole from '../enums/user-role';
import UserType from '../enums/user-type';
import filePaths from './filePaths';

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

export const claimant: User =
  CitizenUserStateHelper.getUserFromState(UserType.CLAIMANT, process.env.SMOKE_TEST_USER_PASSWORD);

export const defendant: User =
  CitizenUserStateHelper.getUserFromState(UserType.DEFENDANT, process.env.SMOKE_TEST_USER_PASSWORD);

export default {
  legalAdvisor,
  caseworker,
  judge,
  claimant,
  defendant,
};
