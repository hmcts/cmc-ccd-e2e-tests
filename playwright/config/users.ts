import User from '../models/user';
import UserRole from '../enums/user-role';
import UserType from '../enums/user-type';
import filePaths from './file-paths';
import UserStateHelper from '../helpers/users-state-helper';

export const legalAdvisor: User = UserStateHelper.getUserFromState(UserType.LEGALADVISOR) ?? {
  email: process.env.LA_USER_EMAIL,
  password: process.env.LA_USER_PASSWORD,
  type: UserType.LEGALADVISOR,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/legal-advisor.json`,
};

export const caseworker: User = UserStateHelper.getUserFromState(UserType.CASEWORKER) ?? {
  email: process.env.CW_USER_EMAIL,
  password: process.env.CW_USER_PASSWORD,
  type: UserType.CASEWORKER,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/caseworker.json`,
};

export const judge: User = UserStateHelper.getUserFromState(UserType.JUDGE) ?? {
  email: process.env.JUDGE_USER_EMAIL,
  password: process.env.JUDGE_USER_PASSWORD,
  type: UserType.JUDGE,
  role: UserRole.CASEWORKER,
  cookiesPath: `${filePaths.userCookies}/judge.json`,
};

export const claimants: User[] =
  UserStateHelper.getUsersFromState(UserType.CLAIMANT) ??
  UserStateHelper.generateCitizenUsers(UserType.CLAIMANT);

export const defendants: User[] =
  UserStateHelper.getUsersFromState(UserType.DEFENDANT) ??
  UserStateHelper.generateCitizenUsers(UserType.DEFENDANT);
