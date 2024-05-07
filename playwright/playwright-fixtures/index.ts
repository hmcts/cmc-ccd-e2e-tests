import { mergeTests, expect } from '@playwright/test';
import { test as uiSteps } from './ui-steps-fixtures';
import { test as apiSteps } from './api-steps-fixtures';

const test = mergeTests(uiSteps, apiSteps);

export {test, expect};
