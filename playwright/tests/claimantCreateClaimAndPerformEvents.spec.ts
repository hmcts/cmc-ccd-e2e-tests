import { test } from '../playwright-fixtures/index';

test.describe('Caseworker events', () => {
  test('Claimant creates claim and then caseworker performs events', { tag: '@crossbrowser' }, async ({ IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiCaseDataSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.ClaimNotes();
    await CaseworkerEventsSteps.ChangeClaimantDetails();
    await CaseworkerEventsSteps.ChangeDefendantDetails();
    await CaseworkerEventsSteps.ResendRpa();
    await CaseworkerEventsSteps.WaitingToBeTransferred();
    await CaseworkerEventsSteps.LinkLetterHolder();
    await CaseworkerEventsSteps.AttachViaBulkScan();
    await CaseworkerEventsSteps.SupportUpdate();
    await CaseworkerEventsSteps.TransferCase();
  });
});
