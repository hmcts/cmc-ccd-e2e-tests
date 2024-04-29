import { test as base, TestInfo } from "@playwright/test";
import CaseworkerSteps from "../steps/ui/exui/caseworker-steps";
import JudgeSteps from "../steps/ui/exui/judge-steps";
import LegalAdvisorSteps from "../steps/ui/exui/legal-advisor-steps";
import ClaimantSteps from "../steps/ui/citizen/claimant-steps";
import DefendantSteps from "../steps/ui/citizen/defendant-steps";
import IdamSteps from "../steps/ui/idam/idam-steps";
import CitizenDashboardSteps from "../steps/ui/citizen/citizen-dashboard-steps";
import ExuiDashboardSteps from "../steps/ui/exui/exui-dashboard-steps";

type StepsFixtures = {
  IdamSteps: IdamSteps;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  ClaimantSteps: ClaimantSteps;
  DefendantSteps: DefendantSteps;
  CaseworkerSteps: CaseworkerSteps;
  JudgeSteps: JudgeSteps;
  LegalAdvisorSteps: LegalAdvisorSteps;
};

export const test = base.extend<StepsFixtures>({
  IdamSteps: async ({page}: any, use: (arg0: IdamSteps) => any, testInfo: TestInfo) => {
    const isSetup = testInfo.tags.includes('@setup');
    await use(new IdamSteps(page, isSetup));
  },
  CitizenDashboardSteps: async ({page}: any, use: (arg0: CitizenDashboardSteps) => any) => {
    await use(new CitizenDashboardSteps(page));
  },
  ExuiDashboardSteps: async ({page}: any, use: (arg0: ExuiDashboardSteps) => any) => {
    await use(new ExuiDashboardSteps(page));
  },
  ClaimantSteps: async ({page}: any, use: (arg0: ClaimantSteps) => any) => {
    await use(new ClaimantSteps(page));
  },
  DefendantSteps: async ({page}: any, use: (arg0: DefendantSteps) => any) => {
    await use(new DefendantSteps(page));
  },
  CaseworkerSteps: async ({page}: any, use: (arg0: CaseworkerSteps) => any) => {
    await use(new CaseworkerSteps(page));
  },
  JudgeSteps: async ({page}: any, use: (arg0: JudgeSteps) => any) => {
    await use(new JudgeSteps(page));
  },
  LegalAdvisorSteps: async ({page}: any, use: (arg0: LegalAdvisorSteps) => any) => {
    await use(new LegalAdvisorSteps(page));
  },
});