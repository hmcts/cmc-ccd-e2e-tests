import { test } from '../playwright-fixtures/index';

test.describe('Caseworker events', () => {
  test('Claimant creates claim and then caseworker performs events', async ({ IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiCaseDataSteps, CaseworkerEventsSteps }) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseDataWithLetterId();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.CaseworkerLogin();
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
