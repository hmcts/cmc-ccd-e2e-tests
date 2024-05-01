import { caseworker, judge, legalAdvisor } from '../../config/users';
import {test} from '../../playwright-fixtures/index';

test('caseworker test', async ({IdamSteps, ExuiDashboardSteps}) => {
  await IdamSteps.ManageCaseLogin(caseworker);
  await ExuiDashboardSteps.GoToCaseList();
});

test('judge test', async ({ IdamSteps, ExuiDashboardSteps }) => {
  await IdamSteps.ManageCaseLogin(judge);
  await ExuiDashboardSteps.GoToCaseList();
});

test('legal advisor test', async ({ IdamSteps, ExuiDashboardSteps }) => {
  await IdamSteps.ManageCaseLogin(legalAdvisor);
  await ExuiDashboardSteps.GoToCaseList();
});
