import User from '../types/user';
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
  UserStateHelper.getUsersFromState(UserType.CLAIMANT) ?? UserStateHelper.generateCitizenUsers(UserType.CLAIMANT);

// export const claimants: User[] = [
//   { 
//     email: `youonlytestonce1@gmail.com`,
//     password: 'Password12!',
//     role: UserRole.CITIZEN,
//     type: UserType.CLAIMANT,
//     userId: '00401f7b-6f9a-46c9-b9ea-0d260bfb58ee',
//     cookiesPath: `${filePaths.userCookies}/${UserType.CLAIMANT}.json`,
//   }
// ];

export const defendants: User[] =
UserStateHelper.getUsersFromState(UserType.DEFENDANT) ?? UserStateHelper.generateCitizenUsers(UserType.DEFENDANT);

  // export const defendants: User[] = [
  //   { 
  //     email: `youonlytestonce@gmail.com`,
  //     password: 'Password12!',
  //     role: UserRole.CITIZEN,
  //     type: UserType.CLAIMANT,
  //     userId: '78cc3784-46af-4746-9479-68227ca2b8ef',
  //     cookiesPath: `${filePaths.userCookies}/${UserType.DEFENDANT}.json`,
  //   }
  // ];