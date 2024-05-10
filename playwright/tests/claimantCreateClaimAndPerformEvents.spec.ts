import { caseworker, claimant, defendant, judge } from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Create claim flow', () =>{
  test('Create claim flow then perform caseworker events', async ({CitizenDashboardSteps, ExuiDashboardSteps, CreateClaimSteps, ApiSteps}) =>{
    await CitizenDashboardSteps.Login(claimant);
    await CitizenDashboardSteps.Login(defendant);
    await ExuiDashboardSteps.Login(caseworker);
    await ExuiDashboardSteps.Login(judge);
    // await CreateClaimSteps.CreateClaimDefAsIndividual();
    // await ApiSteps.SaveCaseDataByClaimRef();
  });
});