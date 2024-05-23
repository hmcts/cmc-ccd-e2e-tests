import { claimant, judge } from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Create claim flow', () =>{
  test('Create claim flow then perform caseworker events', async ({IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiSteps}) =>{
    await IdamSteps.CitizenLogin(claimant);
    await CreateClaimSteps.CreateClaimDefAsIndividual();
    await ApiSteps.SaveCaseDataByClaimRef();
    await IdamSteps.ExuiLogin(judge);
    await ExuiDashboardSteps.GoToCaseDetails();
  });
});