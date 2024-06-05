
import AxeBuilder from '@axe-core/playwright';
import IdamFactory from '../../pages/idam/idam-factory';
import CitizenDashboardSteps from '../../steps/ui/citizen/citizen-dashboard-steps';
import CreateClaimSteps from '../../steps/ui/citizen/create-claim-steps';
import CaseworkerEventsSteps from '../../steps/ui/exui/caseworker-events-steps';
import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  CitizenDashboardSteps: CitizenDashboardSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSteps: CreateClaimSteps;
  CaseworkerEventsSteps: CaseworkerEventsSteps;
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
  CreateClaimSteps: async ({_createClaimFactory, _testData}, use: (arg0: CreateClaimSteps) => any) => {
    await use(new CreateClaimSteps(_createClaimFactory, _testData));
  },
  CaseworkerEventsSteps: async ({_caseworkerEventsFactory, _exuiDashboardFactory, _testData}, use: (arg0: CaseworkerEventsSteps) => any) => {
    await use(new CaseworkerEventsSteps(_caseworkerEventsFactory, _exuiDashboardFactory, _testData));
  },
});