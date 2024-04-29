const urls = {
  citizenFrontEnd:
    process.env.CITIZEN_APP_URL ||
    "https://moneyclaims.aat.platform.hmcts.net",
  manageCase:
    process.env.EXUI_URL || "https://manage-case.aat.platform.hmcts.net",
  authProviderApi:
    process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL ||
    "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal",
  ccdDataStore:
    process.env.CCD_DATA_STORE_URL ||
    "http://ccd-data-store-api-aat.service.core-compute-aat.internal",
  dmStore:
    process.env.DM_STORE_URL ||
    "http://dm-store-aat.service.core-compute-aat.internal",
  idamApi:
    process.env.IDAM_API_URL || "https://idam-api.aat.platform.hmcts.net",
  claimStore:
    process.env.CLAIM_STORE_URL ||
    "http://cmc-claim-store-aat.service.core-compute-aat.internal",
};

export default urls;
