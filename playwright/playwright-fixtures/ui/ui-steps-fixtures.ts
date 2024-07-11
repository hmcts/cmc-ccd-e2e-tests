import CitizenDashboardSteps from '../../steps/ui/citizen/citizen-dashboard-steps';
import CreateClaimSteps from '../../steps/ui/citizen/create-claim-steps';
import CaseworkerEventsSteps from '../../steps/ui/exui/caseworker-events-steps';
import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';
import ClaimantResponseSteps from '../../steps/ui/citizen/claimant-response-steps';
import DefendantResponseSteps from '../../steps/ui/citizen/defendant-response-steps';
import JudgeEventsSteps from '../../steps/ui/exui/judge-events-steps';
import LegalAdvisorEventsSteps from '../../steps/ui/exui/legal-advisor-events-steps';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSteps: CreateClaimSteps;
  CaseworkerEventsSteps: CaseworkerEventsSteps;
  DefendantResponseSteps: DefendantResponseSteps;
  ClaimantResponseSteps: ClaimantResponseSteps;
  JudgeEventsSteps: JudgeEventsSteps;
  LegalAdvisorEventsSteps: LegalAdvisorEventsSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({_idamFactory, _testData, _isSetupTest, _isTeardown, _verifyCookiesBanner}, use: (arg0: IdamSteps) => any) => {
    await use(new IdamSteps(_idamFactory, _isSetupTest, _isTeardown, _verifyCookiesBanner, _testData));
  },
  CitizenDashboardSteps: async ({_citizenDashboardFactory, _testData}, use: (arg0: CitizenDashboardSteps) => any) => {
    await use(new CitizenDashboardSteps(_citizenDashboardFactory, _testData));
  },
  ExuiDashboardSteps: async ({_exuiDashboardFactory, _testData}, use: (arg0: ExuiDashboardSteps) => any) => {
    await use(new ExuiDashboardSteps(_exuiDashboardFactory, _testData));
  },
  CreateClaimSteps: async ({_createClaimFactory, _citizenDashboardFactory ,_testData}, use: (arg0: CreateClaimSteps) => any) => {
    await use(new CreateClaimSteps(_createClaimFactory, _citizenDashboardFactory, _testData));
  },
  CaseworkerEventsSteps: async ({_caseworkerEventsFactory, _exuiDashboardFactory, _testData}, use: (arg0: CaseworkerEventsSteps) => any) => {
    await use(new CaseworkerEventsSteps(_caseworkerEventsFactory, _exuiDashboardFactory, _testData));
  },
  DefendantResponseSteps: async ({_linkClaimFactory, _idamFactory, _citizenDashboardFactory, _responseFactory, _defendantResponseFactory, _testData}, use: (arg0: DefendantResponseSteps) => any) => {
    await use(new DefendantResponseSteps(_linkClaimFactory, _idamFactory, _citizenDashboardFactory, _responseFactory, _defendantResponseFactory, _testData));
  },
  ClaimantResponseSteps: async ({_breathingSpaceFactory, _citizenDashboardFactory, _responseFactory, _testData}, use: (arg0: ClaimantResponseSteps) => any) => {
    await use(new ClaimantResponseSteps(_breathingSpaceFactory, _citizenDashboardFactory, _responseFactory, _testData));
  },
  JudgeEventsSteps: async ({_judgeEventsFactory ,_exuiDashboardFactory, _testData}, use: (arg0: JudgeEventsSteps) => any) => {
    await use(new JudgeEventsSteps(_judgeEventsFactory, _exuiDashboardFactory, _testData));
  },
  LegalAdvisorEventsSteps: async ({_legalAdvisorEventsFactory, _exuiDashboardFactory, _testData}, use: (arg0: LegalAdvisorEventsSteps) => any) => {
    await use(new LegalAdvisorEventsSteps(_legalAdvisorEventsFactory, _exuiDashboardFactory, _testData));
  },
});