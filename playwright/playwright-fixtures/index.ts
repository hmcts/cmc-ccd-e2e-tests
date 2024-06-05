import { mergeTests, expect } from '@playwright/test';
import { test as uiSteps } from './ui/ui-steps-fixtures';
import { test as apiSteps } from './api/api-steps-fixtures';
import config from '../config/config';

const test = mergeTests(uiSteps, apiSteps);

const pageExpect = expect.configure({soft: config.playwright.softExpect});

export {test, pageExpect, expect};
