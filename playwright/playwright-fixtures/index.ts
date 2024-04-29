import { mergeTests, expect } from "@playwright/test";
import { test as steps } from "./ui-steps-fixtures";

const test = mergeTests(steps);

export {test, expect}
