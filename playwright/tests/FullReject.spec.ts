import { claimants } from '../config/users';
import { test } from '../playwright-fixtures/index';

test.describe('Full reject flow', async () => {
  test('Full reject flow',  async ({IdamSteps, CreateClaimSteps, ApiSteps}) => {
    await IdamSteps.CitizenLogin(claimants);
    await CreateClaimSteps.CreateClaimDefAsIndividual();
    await ApiSteps.FetchClaimStoreCaseDataWithLetterId();
  });
});
