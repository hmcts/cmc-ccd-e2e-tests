import CaseworkerEventsFactory from '../../pages/exui/caseworker-events/caseworker-events-factory';
import ExuiDashboardFactory from '../../pages/exui/exui-dashboard/exui-dashboard-factory';
import JudgeEventsFactory from '../../pages/exui/judge-events/judge-events-factory';
import LegalAdvisorEventsFactory from '../../pages/exui/legal-advisor-events/legal-advisor-events-factory';
import IdamFactory from '../../pages/idam/idam-factory';
import { test as base } from '../api/api-steps-fixtures';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';
import OcmcDashboardFactory from '../../pages/ocmc/dashboard/ocmc-dashboard-factory';
import CreateClaimFactory from '../../pages/ocmc/create-claim/create-claim-factory';
import OcmcLinkClaimFactory from '../../pages/ocmc/link-claim/ocmc-link-claim-factory';
import ResponseFactory from '../../pages/ocmc/response/response/response-factory';
import DefendantResponseFactory from '../../pages/ocmc/response/defendant/defendant-response-factory';
import BreathingSpaceFactory from '../../pages/ocmc/breathing-space/breathing-space-factory';
import CuiDashboardFactory from '../../pages/cui/dashboard/cui-dashboard-factory';
import CuiLinkClaimFactory from '../../pages/cui/link-claim/cui-link-claim-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
  _idamFactory: IdamFactory;
  _ocmcDashboardFactory: OcmcDashboardFactory;
  _cuiDashboardFactory: CuiDashboardFactory;
  _exuiDashboardFactory: ExuiDashboardFactory;
  _createClaimFactory: CreateClaimFactory;
  _caseworkerEventsFactory: CaseworkerEventsFactory;
  _ocmcLinkClaimFactory: OcmcLinkClaimFactory;
  _cuiLinkClaimFactory: CuiLinkClaimFactory;
  _responseFactory: ResponseFactory;
  _defendantResponseFactory: DefendantResponseFactory;
  _judgeEventsFactory: JudgeEventsFactory;
  _legalAdvisorEventsFactory: LegalAdvisorEventsFactory;
  _breathingSpaceFactory: BreathingSpaceFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _pageUtilsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new PageUtilsFactory(page, _axeBuilder));
  },
  _idamFactory: async ({ page, _axeBuilder }, use) => {
    await use(new IdamFactory(page, _axeBuilder));
  },
  _ocmcDashboardFactory: async ({ page, _axeBuilder }, use) => {
    await use(new OcmcDashboardFactory(page, _axeBuilder));
  },
  _cuiDashboardFactory: async ({ page, _axeBuilder }, use) => {
    await use(new CuiDashboardFactory(page, _axeBuilder));
  },
  _exuiDashboardFactory: async ({ page, _axeBuilder }, use) => {
    await use(new ExuiDashboardFactory(page, _axeBuilder));
  },
  _createClaimFactory: async ({ page, _axeBuilder }, use) => {
    await use(new CreateClaimFactory(page, _axeBuilder));
  },
  _caseworkerEventsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new CaseworkerEventsFactory(page, _axeBuilder));
  },
  _ocmcLinkClaimFactory: async ({ page, _axeBuilder }, use) => {
    await use(new OcmcLinkClaimFactory(page, _axeBuilder));
  },
  _cuiLinkClaimFactory: async ({ page, _axeBuilder }, use) => {
    await use(new CuiLinkClaimFactory(page, _axeBuilder));
  },
  _responseFactory: async ({ page, _axeBuilder }, use) => {
    await use(new ResponseFactory(page, _axeBuilder));
  },
  _defendantResponseFactory: async ({ page, _axeBuilder }, use) => {
    await use(new DefendantResponseFactory(page, _axeBuilder));
  },
  _judgeEventsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new JudgeEventsFactory(page, _axeBuilder));
  },
  _legalAdvisorEventsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new LegalAdvisorEventsFactory(page, _axeBuilder));
  },
  _breathingSpaceFactory: async ({ page, _axeBuilder }, use) => {
    await use(new BreathingSpaceFactory(page, _axeBuilder));
  }
});
