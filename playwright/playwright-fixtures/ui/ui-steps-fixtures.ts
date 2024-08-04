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
  IdamSteps: async ({ _idamFactory, _testData, _isSetupTest, _isTeardown, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_idamFactory, _isSetupTest, _isTeardown, _verifyCookiesBanner, _testData));
  },
  CitizenDashboardSteps: async ({ _citizenDashboardFactory, _testData }, use) => {
    await use(new CitizenDashboardSteps(_citizenDashboardFactory, _testData));
  },
  ExuiDashboardSteps: async ({ _exuiDashboardFactory, _testData }, use) => {
    await use(new ExuiDashboardSteps(_exuiDashboardFactory, _testData));
  },
  CreateClaimSteps: async ({ _createClaimFactory, _citizenDashboardFactory, _testData }, use) => {
    await use(new CreateClaimSteps(_createClaimFactory, _citizenDashboardFactory, _testData));
  },
  CaseworkerEventsSteps: async ({ _caseworkerEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new CaseworkerEventsSteps(_caseworkerEventsFactory, _exuiDashboardFactory, _testData));
  },
  DefendantResponseSteps: async ({ _linkClaimFactory, _idamFactory, _citizenDashboardFactory, _responseFactory, _defendantResponseFactory, _testData }, use) => {
    await use(new DefendantResponseSteps(_linkClaimFactory, _idamFactory, _citizenDashboardFactory, _responseFactory, _defendantResponseFactory, _testData));
  },
  ClaimantResponseSteps: async ({ _breathingSpaceFactory, _citizenDashboardFactory, _responseFactory, _testData }, use) => {
    await use(new ClaimantResponseSteps(_breathingSpaceFactory, _citizenDashboardFactory, _responseFactory, _testData));
  },
  JudgeEventsSteps: async ({ _judgeEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new JudgeEventsSteps(_judgeEventsFactory, _exuiDashboardFactory, _testData));
  },
  LegalAdvisorEventsSteps: async ({ _legalAdvisorEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new LegalAdvisorEventsSteps(_legalAdvisorEventsFactory, _exuiDashboardFactory, _testData));
  },
});
