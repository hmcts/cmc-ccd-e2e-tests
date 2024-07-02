import { test } from '../playwright-fixtures/index';

test.describe('Ocon9x', async () => {
  test('Claimant create claim then caseworker submits ocon9x event and paper response admission', async ({IdamSteps, CreateClaimSteps, ApiSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) =>{
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiSteps.FetchClaimStoreCaseData();
    await ApiSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.IssuePaperDefenceForms();
    await CaseworkerEventsSteps.PaperResponseReviewed();
    await CaseworkerEventsSteps.ReviewOcon9xPaperResponse();
    await CaseworkerEventsSteps.PaperResponseAdmission();
  });

  test('Claimant create claim then caseworker submits ocon9x event and paper response defence', async ({IdamSteps, CreateClaimSteps, ApiSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) =>{
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiSteps.FetchClaimStoreCaseData();
    await ApiSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.IssuePaperDefenceForms();
    await CaseworkerEventsSteps.PaperResponseReviewed();
    await CaseworkerEventsSteps.ReviewOcon9xPaperResponse();
    await CaseworkerEventsSteps.PaperResponseDefence();
  });
});