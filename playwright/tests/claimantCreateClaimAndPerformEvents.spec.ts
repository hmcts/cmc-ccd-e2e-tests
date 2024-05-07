import { claimant } from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Create claim flow', () =>{
  test('Create claim flow then perform caseworker events', async ({CitizenDashboardSteps, CreateClaimSteps, CitizenApiSteps}) =>{
    await CitizenDashboardSteps.Login(claimant);
    await CreateClaimSteps.CreateClaimDefAsIndividual();
    await CitizenApiSteps.RetrieveByReferenceNumber();
  });
});