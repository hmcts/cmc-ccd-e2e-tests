import { claimants, judge} from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Manage Documents', async () => {

    test('Claimant creates claim, caseworker performs Manage Documents action @debug', async({IdamSteps, ExuiDashboardSteps, CreateClaimSteps, ApiSteps, CaseworkerEventsSteps}) => {
        await IdamSteps.CitizenLogin(claimants);
        await CreateClaimSteps.CreateClaimDefAsIndividual();
        await ApiSteps.FetchClaimStoreCaseData();
        await ApiSteps.FetchCCDCaseData();
        await IdamSteps.ExuiLogin(judge);
        await ExuiDashboardSteps.GoToCaseDetails();
        await CaseworkerEventsSteps.ManageDocuments();
    }
    )
})
