const urls = {
  citizenFrontEnd: process.env.CITIZEN_APP_URL,
  manageCase: process.env.EXUI_URL,
  authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL,
  ccdDataStore: process.env.CCD_DATA_STORE_URL,
  dmStore: process.env.DM_STORE_URL,
  idamWeb: process.env.IDAM_WEB_URL,
  idamApi: process.env.IDAM_API_URL,
  claimStore: process.env.CLAIM_STORE_URL,
};

export const getDomain = (url: string) => {
  return new URL(url).host;
};

export default urls;
