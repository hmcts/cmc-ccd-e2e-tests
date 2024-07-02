import { test } from '../playwright-fixtures/index';

test.describe('Manage Documents', async () => {
  test('Claimant creates claim, caseworker performs Manage Documents action', async({IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiSteps, CaseworkerEventsSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiSteps.FetchClaimStoreCaseData();
    await ApiSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.ManageDocuments();
  });
});
