declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: string;
      FUNCTIONAL: string;
      ENVIRONMENT: string;
      CITIZEN_APP_URL: string;
      CUI_APP_URL: string;
      EXUI_URL: string;
      SERVICE_AUTH_PROVIDER_API_BASE_URL: string;
      CCD_DATA_STORE_URL: string;
      DM_STORE_URL: string;
      IDAM_API_URL: string;
      IDAM_WEB_URL: string;
      CLAIM_STORE_URL: string;
      LA_USER_EMAIL: string;
      LA_USER_ID: string;
      LA_USER_PASSWORD: string;
      CW_USER_EMAIL: string;
      CW_USER_ID: string;
      CW_USER_PASSWORD: string;
      JUDGE_USER_EMAIL: string;
      JUDGE_USER_ID: string;
      JUDGE_USER_PASSWORD: string;
      SMOKE_TEST_USER_PASSWORD: string;
      SHOW_BROWSER_WINDOW: string;
      WORKERS: string;
      SKIP_AUTH_SETUP: string;
      SKIP_CITIZEN_SETUP: string;
      UI_SOFT_EXPECT: string;
      IDAM_STUB_ENABLED: string;
      RUN_ACCESSIBILITY_TESTS: string;
      S2S_MICROSERVICE_KEY_CMC: string;
      S2S_MICROSERVICE_KEY_PWD: string;
    }
  }
}

export {};
