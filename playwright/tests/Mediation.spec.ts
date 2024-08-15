import { test } from '../playwright-fixtures/index';

test.describe('Defendant full defence, claimant intent to proceed, both parties mediation', async () => {
  test('Mediation successful', async ({ ApiCaseEventsSteps, IdamSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await ApiCaseEventsSteps.CreateReferMediationFullDefenceDisputeAllClaim();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.MediationPending();
    await CaseworkerEventsSteps.MediationSuccessful();
  });

  test('Mediation failed', async ({ ApiCaseEventsSteps, IdamSteps, ExuiDashboardSteps, CaseworkerEventsSteps }) => {
    await ApiCaseEventsSteps.CreateReferMediationFullDefenceDisputeAllClaim();
    await IdamSteps.CaseworkerLogin();
    await ExuiDashboardSteps.GoToCaseDetails();
    await CaseworkerEventsSteps.MediationPending();
    await CaseworkerEventsSteps.MediationUnsuccessful();
  });
});
