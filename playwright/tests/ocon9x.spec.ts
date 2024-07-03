import { test } from '../playwright-fixtures/index';

test.describe('Ocon9x', async () => {

  test.beforeEach('Claimant create claim then caseworker submits ocon9x event', async ({IdamSteps, CreateClaimSteps, ApiCaseDataSteps, ExuiDashboardSteps, CaseworkerEventsSteps}) =>{
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateDraftClaim();
    await CreateClaimSteps.ChangeDraftClaimDefAsOrg();
    await CreateClaimSteps.CheckAndSubmit();
    await CreateClaimSteps.GetClaimReference();
    await ApiCaseDataSteps.FetchClaimStoreCaseData();
    await ApiCaseDataSteps.FetchCCDCaseData();
    await IdamSteps.JudgeLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.IssuePaperDefenceForms();
    await CaseworkerEventsSteps.PaperResponseReviewed();
    await CaseworkerEventsSteps.ReviewOcon9xPaperResponse();
  });

  test('Paper response admission', async ({ CaseworkerEventsSteps}) =>{
    await CaseworkerEventsSteps.PaperResponseAdmission();
  });

  test('Paper response defence', async ({CaseworkerEventsSteps}) =>{
    await CaseworkerEventsSteps.PaperResponseDefence();
  });

});