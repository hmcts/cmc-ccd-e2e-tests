import { test } from '../playwright-fixtures/index';

test.describe('Help With Fees actions @debug', async () => {
  test('Claimant creates claim, caseworker performs Manage Documents action', async({IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiCaseDataSteps, CaseworkerEventsSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimToHwf();
    await CreateClaimSteps.CheckAndSubmitHwf();
    await CreateClaimSteps.GetHwfClaimReference();
    await ApiCaseDataSteps.FetchHwfCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToHwfCaseDetails();
    await CaseworkerEventsSteps.UpdateHwfNumber(); // change
    await CaseworkerEventsSteps.InvalidHwfNumber();
  });
});