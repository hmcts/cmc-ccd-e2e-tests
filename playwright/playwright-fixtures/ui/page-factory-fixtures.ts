
import CitizenDashboardFactory from '../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import CreateClaimFactory from '../../pages/citizen/create-claim/create-claim-factory';
import LinkClaimFactory from '../../pages/citizen/link-claim/link-claim-factory';
import ResponseFactory from '../../pages/citizen/response/common/response-factory';
import DefendantResponseFactory from '../../pages/citizen/response/defendant/defendant-response-factory';
import CaseworkerEventsFactory from '../../pages/exui/caseworker-events/caseworker-events-factory';
import ExuiDashboardFactory from '../../pages/exui/exui-dashboard/exui-dashboard-factory';
import IdamFactory from '../../pages/idam/idam-factory';
import { test as base } from '../utils/test-utils-fixtures';

type PageFactoryFixtures = {
  _idamFactory: IdamFactory;
  _citizenDashboardFactory: CitizenDashboardFactory;
  _exuiDashboardFactory: ExuiDashboardFactory;
  _createClaimFactory: CreateClaimFactory;
  _caseworkerEventsFactory: CaseworkerEventsFactory;
  _linkClaimFactory: LinkClaimFactory;
  _responseFactory: ResponseFactory;
  _defendantResponseFactory: DefendantResponseFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _idamFactory: async ({page, _axeBuilder}, use: (arg0: IdamFactory) => any) => {
    await use(new IdamFactory(page, _axeBuilder));
  },
  _citizenDashboardFactory: async ({page, _axeBuilder}, use: (arg0: CitizenDashboardFactory) => any) => {
    await use(new CitizenDashboardFactory(page, _axeBuilder));
  },
  _exuiDashboardFactory: async ({page, _axeBuilder}, use: (arg0: ExuiDashboardFactory) => any) => {
    await use(new ExuiDashboardFactory(page, _axeBuilder));
  },
  _createClaimFactory: async ({page, _axeBuilder}, use: (arg0: CreateClaimFactory) => any) => {
    await use(new CreateClaimFactory(page, _axeBuilder));
  },
  _caseworkerEventsFactory: async ({page, _axeBuilder}, use: (arg0: CaseworkerEventsFactory) => any) => {
    await use(new CaseworkerEventsFactory(page, _axeBuilder));
  },
  _linkClaimFactory: async ({page, _axeBuilder}, use: (arg0: LinkClaimFactory) => any) => {
    await use(new LinkClaimFactory(page, _axeBuilder));
  },
  _responseFactory: async ({page, _axeBuilder}, use: (arg0: ResponseFactory) => any) => {
    await use(new ResponseFactory(page, _axeBuilder));
  },
  _defendantResponseFactory: async ({page, _axeBuilder}, use: (arg0: DefendantResponseFactory) => any) => {
    await use(new DefendantResponseFactory(page, _axeBuilder));
  },
});