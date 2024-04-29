import CitizenUserStateHelper from "../helpers/citizen-users-state-helper";
import User from "../models/User";
import UserRole from "../models/UserRole";
import UserType from "../models/UserType";

export const legalAdvisor: User = {
  email: process.env.LA_USER_EMAIL || "civilmoneyclaims+la@gmail.com",
  password: process.env.LA_USER_PASSWORD || "Password12",
  type: UserType.LEGALADVISOR,
  role: UserRole.CASEWORKER,
  cookiesPath: "playwright/fixtures/.cookies/legal-advisor.json",
};

export const caseworker: User = {
  email: process.env.CW_USER_EMAIL || "civilmoneyclaims+ccda@gmail.com",
  password: process.env.CW_USER_PASSWORD || "Password12",
  type: UserType.CASEWORKER,
  role: UserRole.CASEWORKER,
  cookiesPath: "playwright/fixtures/.cookies/caseworker.json",
};

export const judge: User = {
  email: process.env.JUDGE_USER_EMAIL || "civilmoneyclaims+judge@gmail.com",
  password: process.env.JUDGE_USER_PASSWORD || "Password12",
  type: UserType.JUDGE,
  role: UserRole.CASEWORKER,
  cookiesPath: "playwright/fixtures/.cookies/judge.json",
};

export const claimant: User =
  CitizenUserStateHelper.getUserFromState(UserType.CLAIMANT);

export const defendant: User =
  CitizenUserStateHelper.getUserFromState(UserType.DEFENDANT);

export default {
  legalAdvisor,
  caseworker,
  judge,
  claimant,
  defendant,
};
