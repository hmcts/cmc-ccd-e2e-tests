import { test } from '../playwright-fixtures/index';

test.describe('Manage Documents', async () => {
  test('Claimant creates claim, caseworker performs Manage Documents action', async ({ IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiCaseDataSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetailsAndWait();
    await CaseworkerEventsSteps.MediationPending();
    await CaseworkerEventsSteps.ManageDocuments();
  });
});
