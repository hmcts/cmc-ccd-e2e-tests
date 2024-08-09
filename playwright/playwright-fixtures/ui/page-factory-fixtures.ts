import BreathingSpaceFactory from '../../pages/citizen/breathing-space/breathing-space-factory';
import CitizenDashboardFactory from '../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import CreateClaimFactory from '../../pages/citizen/create-claim/create-claim-factory';
import LinkClaimFactory from '../../pages/citizen/link-claim/link-claim-factory';
import ResponseFactory from '../../pages/citizen/response/response/response-factory';
import DefendantResponseFactory from '../../pages/citizen/response/defendant/defendant-response-factory';
import CaseworkerEventsFactory from '../../pages/exui/caseworker-events/caseworker-events-factory';
import ExuiDashboardFactory from '../../pages/exui/exui-dashboard/exui-dashboard-factory';
import JudgeEventsFactory from '../../pages/exui/judge-events/judge-events-factory';
import LegalAdvisorEventsFactory from '../../pages/exui/legal-advisor-events/legal-advisor-events-factory';
import IdamFactory from '../../pages/idam/idam-factory';
import { test as base } from '../api/api-steps-fixtures';

type PageFactoryFixtures = {
  _idamFactory: IdamFactory;
  _citizenDashboardFactory: CitizenDashboardFactory;
  _exuiDashboardFactory: ExuiDashboardFactory;
  _createClaimFactory: CreateClaimFactory;
  _caseworkerEventsFactory: CaseworkerEventsFactory;
  _linkClaimFactory: LinkClaimFactory;
  _responseFactory: ResponseFactory;
  _defendantResponseFactory: DefendantResponseFactory;
  _judgeEventsFactory: JudgeEventsFactory;
  _legalAdvisorEventsFactory: LegalAdvisorEventsFactory;
  _breathingSpaceFactory: BreathingSpaceFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _idamFactory: async ({ page, _axeBuilder }, use) => {
    await use(new IdamFactory(page, _axeBuilder));
  },
  _citizenDashboardFactory: async ({ page, _axeBuilder }, use) => {
    await use(new CitizenDashboardFactory(page, _axeBuilder));
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
  _linkClaimFactory: async ({ page, _axeBuilder }, use) => {
    await use(new LinkClaimFactory(page, _axeBuilder));
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
  },
});
