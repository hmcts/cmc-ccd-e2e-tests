import CaseworkerEventsSteps from '../../steps/ui/exui/caseworker-events-steps';
import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';
import JudgeEventsSteps from '../../steps/ui/exui/judge-events-steps';
import LegalAdvisorEventsSteps from '../../steps/ui/exui/legal-advisor-events-steps';
import OcmcDashboardSteps from '../../steps/ui/ocmc/ocmc-dashboard-steps';
import CreateClaimSteps from '../../steps/ui/ocmc/create-claim-steps';
import DefendantResponseSteps from '../../steps/ui/ocmc/defendant-response-steps';
import ClaimantResponseSteps from '../../steps/ui/ocmc/claimant-response-steps';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  OcmcDashboardSteps: OcmcDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSteps: CreateClaimSteps;
  CaseworkerEventsSteps: CaseworkerEventsSteps;
  DefendantResponseSteps: DefendantResponseSteps;
  ClaimantResponseSteps: ClaimantResponseSteps;
  JudgeEventsSteps: JudgeEventsSteps;
  LegalAdvisorEventsSteps: LegalAdvisorEventsSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamFactory, _testData, _isSetupTest, _isTeardown, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamFactory, _isSetupTest, _isTeardown, _verifyCookiesBanner, _testData));
  },
  OcmcDashboardSteps: async ({ _pageUtilsFactory, _ocmcDashboardFactory, _testData }, use) => {
    await use(new OcmcDashboardSteps(_pageUtilsFactory, _ocmcDashboardFactory, _testData));
  },
  ExuiDashboardSteps: async ({ _pageUtilsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new ExuiDashboardSteps(_pageUtilsFactory, _exuiDashboardFactory, _testData));
  },
  CreateClaimSteps: async ({ _createClaimFactory, _ocmcDashboardFactory, _testData }, use) => {
    await use(new CreateClaimSteps(_createClaimFactory, _ocmcDashboardFactory, _testData));
  },
  CaseworkerEventsSteps: async ({ _caseworkerEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new CaseworkerEventsSteps(_caseworkerEventsFactory, _exuiDashboardFactory, _testData));
  },
  DefendantResponseSteps: async ({ _ocmcLinkClaimFactory, _cuiLinkClaimFactory, _idamFactory, _ocmcDashboardFactory, _responseFactory, _defendantResponseFactory, _testData }, use) => {
    await use(new DefendantResponseSteps(_ocmcLinkClaimFactory, _cuiLinkClaimFactory, _idamFactory, _ocmcDashboardFactory, _responseFactory, _defendantResponseFactory, _testData));
  },
  ClaimantResponseSteps: async ({ _breathingSpaceFactory, _ocmcDashboardFactory, _responseFactory, _testData }, use) => {
    await use(new ClaimantResponseSteps(_breathingSpaceFactory, _ocmcDashboardFactory, _responseFactory, _testData));
  },
  JudgeEventsSteps: async ({ _judgeEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new JudgeEventsSteps(_judgeEventsFactory, _exuiDashboardFactory, _testData));
  },
  LegalAdvisorEventsSteps: async ({ _legalAdvisorEventsFactory, _exuiDashboardFactory, _testData }, use) => {
    await use(new LegalAdvisorEventsSteps(_legalAdvisorEventsFactory, _exuiDashboardFactory, _testData));
  }
});
