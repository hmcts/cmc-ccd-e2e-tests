import { test } from '../playwright-fixtures/index';

test.describe('Help With Fees actions', async () => {
  test('Claimant creates claim, caseworker performs Manage Documents action', async ({ IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiCaseDataSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimToHwf();
    await CreateClaimSteps.CheckAndSubmitHwf();
    await CreateClaimSteps.GetClaimReferenceHwf();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.UpdatedHwfNumber();
    await CaseworkerEventsSteps.InvalidHwfNumber();
  });
});
