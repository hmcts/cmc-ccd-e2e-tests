import { test } from '../playwright-fixtures/index';

test.describe('Full reject flow', async () => {
  test('Full reject flow',  async ({IdamSteps, CreateClaimSteps, ApiSteps}) => {
    await IdamSteps.ClaimantLogin();
    await CreateClaimSteps.CreateClaimDefAsIndividual();
    await ApiSteps.FetchClaimStoreCaseDataWithLetterId();
  });
});
