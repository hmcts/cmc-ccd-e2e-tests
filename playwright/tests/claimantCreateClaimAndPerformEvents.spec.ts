import { claimant, judge } from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Create claim flow', () => {
  test.fail('Create claim flow then perform caseworker events', async ({IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiSteps, CaseworkerEventsSteps}) =>{
    await IdamSteps.CitizenLogin(claimant);
    await CreateClaimSteps.CreateClaimDefAsIndividual();
    await ApiSteps.FetchClaimStoreCaseData();
    await ApiSteps.FetchCCDCaseData();
    await IdamSteps.ExuiLogin(judge);
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