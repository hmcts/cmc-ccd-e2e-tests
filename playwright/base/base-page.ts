import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import config from '../config/config';
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';
import { pageExpect } from '../playwright-fixtures';
import Timer from '../helpers/timer';
import { getDomain } from '../config/urls';
import { DetailedStep, Step } from '../decorators/test-steps';
import { test } from '../playwright-fixtures/index';

const classKey = 'BasePage';
export default abstract class BasePage {
  private page: Page;
  private axeBuilder?: AxeBuilder;

  constructor(page: Page, axeBuilder?: AxeBuilder) {
    this.page = page;
    this.axeBuilder = axeBuilder;
  }

  @DetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async clickBySelector(selector: string, options: { count?: number } = {}) {
    await this.page.locator(selector).click({ clickCount: options.count });
  }

  @DetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickButtonByName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  @DetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickLink(name: string, { index } = { index: 0 }) {
    await this.page.getByRole('link', { name }).nth(index).click();
  }

  @DetailedStep(classKey, 'selector')
  @TruthyParams(classKey)
  protected async selectorExists(selector: string): Promise<boolean> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return await this.page.locator(selector!).isVisible();
  }

  @DetailedStep(classKey, 'content', 'selector')
  @TruthyParams(classKey)
  protected async elementIncludes(content: string, selector?: string): Promise<boolean> {
    const textContent = await this.page.locator(selector!).textContent();
    if (!textContent) return false;
    return textContent.includes(content);
  }

  @DetailedStep(classKey, 'url')
  @TruthyParams(classKey, 'url')
  protected async goTo(url: string, options: { force?: boolean } = {}) {
    const { origin, pathname } = new URL(this.page.url());
    if (`${origin}${pathname}` !== url || options.force) {
      await this.page.goto(url);
    }
  }

  protected async isDomain(url: string) {
    const currentDomain = getDomain(this.page.url());
    const urlDomain = getDomain(url);
    return urlDomain === currentDomain;
  }

  @DetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async clickByText(text: string) {
    await this.page.getByText(text).click();
  }

  @DetailedStep(classKey, 'input', 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputText(input: string | number, selector: string, options: { timeout?: number } = {}) {
    await this.page.fill(selector, input.toString(), {
      timeout: options.timeout,
    });
  }

  @DetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputSensitiveText(input: string | number, selector: string, options: { timeout?: number; hideInput?: boolean } = {}) {
    await this.page.fill(selector, input.toString(), {
      timeout: options.timeout,
    });
  }

  @TruthyParams(classKey)
  protected async getText(selector: string) {
    return (await this.page.textContent(selector)) ?? undefined;
  }

  @DetailedStep(classKey, 'option', 'selector')
  @TruthyParams(classKey, 'selector')
  protected async selectFromDropdown(option: string | number, selector: string) {
    if (typeof option === 'number') await this.page.selectOption(selector, { index: option });
    else await this.page.selectOption(selector, option);
  }

  @Step(classKey)
  protected async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  @Step(classKey)
  protected async reload() {
    await this.page.reload();
  }

  @Step(classKey)
  protected async clearCookies() {
    await this.page.context().clearCookies();
  }

  @Step(classKey)
  protected async addCookies(cookies: Cookie[]) {
    await this.page.context().addCookies(cookies);
  }

  @DetailedStep(classKey, 'filePath', 'selector')
  @TruthyParams(classKey)
  protected async uploadFile(filePath: string, selector: string) {
    await this.page.locator(selector).setInputFiles([]);
    await this.page.locator(selector).setInputFiles([filePath]);
  }

  @DetailedStep(classKey, 'selector')
  protected async waitForSelectorToDetach(selector: string, options: { timeout?: number } = { timeout: 25_000 }) {
    const locator = this.page.locator(selector);
    try {
      await locator.waitFor({ state: 'attached', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await locator.waitFor({ state: 'detached', ...options });
  }

  @DetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async waitForTextToDetach(text: string, options: { timeout?: number } = { timeout: 25_000 }) {
    const locator = this.page.getByText(text);
    try {
      await locator.waitFor({ state: 'attached', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await locator.waitFor({ state: 'detached', ...options });
  }

  public async pause() {
    await this.page.pause();
  }

  public async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  abstract verifyContent(...args: any[]): Promise<void>;

  protected async runVerifications(expects?: Promise<void> | Promise<void>[], { axe = true, expectedAxeViolations = 0, axeExclusions = [] } = {}) {
    if (expects) {
      Array.isArray(expects) ? await Promise.all(expects) : await expects;
    }

    if (config.runAxeTests && this.axeBuilder && axe) {
      await this.expectAxe(expectedAxeViolations, axeExclusions);
    }
  }

  @DetailedStep(classKey, 'expectedAxeViolations')
  private async expectAxe(expectedAxeViolations: number, axeExclusions: string[]) {
    let axeBuilder = this.axeBuilder;
    for (const axeExclusion of axeExclusions) {
      axeBuilder = axeBuilder.exclude(axeExclusion);
    }
    const results = await axeBuilder.analyze();
    const violations = results.violations;

    await pageExpect.soft(violations).toHaveAxeViolations(expectedAxeViolations, this.constructor.name, this.page);

    if (expectedAxeViolations !== violations.length) {
      const errors = test.info().errors;
      errors[errors.length - 1].value = 'accessibility';
    }
  }

  @DetailedStep(classKey, 'domain')
  protected async expectDomain(domain: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`), {
      ...options,
    });
  }

  @DetailedStep(classKey, 'path')
  protected async expectUrlStart(path: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`^${path}`), {
      ...options,
    });
  }

  @DetailedStep(classKey, 'endpoints')
  protected async expectUrlEnd(endpoints: string | string[], options: { timeout?: number } = {}) {
    const regex = new RegExp(Array.isArray(endpoints) ? `(${endpoints.join('|')})$` : `${endpoints}$`);
    await pageExpect(this.page).toHaveURL(regex, { ...options });
  }

  @DetailedStep(classKey, 'text')
  protected async expectHeading(text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator('h1', { hasText: text })).toBeVisible(options);
  }

  @DetailedStep(classKey, 'text')
  protected async expectSubHeading(text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator('h2', { hasText: text })).toBeVisible(options);
  }

  @DetailedStep(classKey, 'selector')
  protected async expectSelector(selector: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page.locator(selector)).toBeVisible(options);
  }

  @DetailedStep(classKey, 'selector')
  protected async expectNoSelector(selector: string, options: { timeout?: number } = {}) {
    try {
      await this.expectSelector(selector, { timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await pageExpect(this.page.locator(selector)).toBeVisible({ ...options, visible: false });
  }

  private getTextLocator(text: string | number, exact?: boolean, selector?: string, first?: boolean) {
    const locator = selector ? this.page.locator(selector).getByText(text.toString()) : this.page.getByText(text.toString(), { exact: exact });
    return first ? locator.first() : locator;
  }

  @DetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async expectText(
    text: string | number,
    options: {
      exact?: boolean;
      selector?: string;
      first?: boolean;
      timeout?: number;
    } = {},
  ) {
    const locator = this.getTextLocator(text, options.exact, options.selector, options.first);
    await pageExpect(locator).toBeVisible({
      timeout: options.timeout,
    });
  }

  @DetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async expectNoText(
    text: string | number,
    options: {
      exact?: boolean;
      selector?: string;
      first?: boolean;
      timeout?: number;
    } = {},
  ) {
    const locator = this.getTextLocator(text, options.exact, options.selector, options.first);
    try {
      await this.expectText(text, { timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await pageExpect(locator).toBeVisible({
      timeout: options.timeout,
      visible: false,
    });
  }

  @DetailedStep(classKey, 'label')
  protected async expectLabel(label: string, options: { exact?: boolean; timeout?: number } = { exact: false }) {
    await pageExpect(this.page.getByLabel(label, { exact: options.exact })).toBeVisible({ timeout: options.timeout });
  }

  @DetailedStep(classKey, 'name')
  protected async expectLink(name: string, options: { exact?: boolean; timeout?: number } = { exact: false }) {
    await pageExpect(this.page.getByRole('link', { name, exact: options.exact })).toBeVisible({ timeout: options.timeout });
  }

  @DetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async expectOptionChecked(selector: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator(selector)).toBeChecked(options);
  }

  @DetailedStep(classKey, 'selector', 'text')
  @TruthyParams(classKey, 'selector', 'text')
  protected async expectInputValue(selector: string, text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator(selector)).toHaveValue(text, options);
  }

  @DetailedStep(classKey, 'selector', 'option')
  @TruthyParams(classKey, 'selector', 'option')
  protected async expectDropdownOption(selector: string, option: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator(selector)).toHaveText(option, options);
  }

  @DetailedStep(classKey, 'text', 'selector')
  @TruthyParams(classKey, 'text', 'selector')
  protected async expectTableRowValue(
    text: string,
    selector: string,
    options: { rowNum: number; timeout?: number; tableName?: string } = {
      rowNum: 0,
    },
  ) {
    await pageExpect(this.page.locator(`${selector} >> tr`).nth(options.rowNum).getByText(text)).toBeVisible({ timeout: options.timeout });
  }

  protected async retryExpectTimeout(expects: () => Promise<void>[] | Promise<void>, { interval = 0, timeout = config.playwright.toPassTimeout }: { interval?: number; timeout?: number } = {}) {
    let attempts = 0;
    const timer = new Timer(timeout);
    await pageExpect(async () => {
      if (attempts > 0) {
        await this.page.reload();
      }
      attempts++;
      const promises = expects();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
      } catch (error) {
        console.log('\n' + '-'.repeat(100));
        console.log('Error: ' + error.matcherResult.message);
        console.log(`Attempts: ${attempts}`);
        console.log(`Reloading page and trying again in ${interval} second(s)`);
        console.log(`Timeout in ${timer.remainingTime} second(s)`);
        throw error;
      }
    }).toPass({
      intervals: [interval],
      timeout: timeout,
    });
  }

  protected async retryAction(action: () => Promise<void>, assertions: () => Promise<void>[] | Promise<void>, message: string, { retries = 1, assertFirst = false }: { retries?: number; assertFirst?: boolean } = {}) {
    while (retries > 0) {
      if (!assertFirst) await action();
      const promises = assertions();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
        break;
      } catch (error) {
        retries--;
        if (retries <= 0) throw error;
        console.log(message);
        console.log(`Retries: ${retries} remaining`);
        assertFirst = false;
      }
    }
  }

  @TruthyParams(classKey, 'selector')
  protected async retryClickBySelector(selector: string, assertions: () => Promise<void>[] | Promise<void>, { retries = 2 }: { retries?: number } = {}) {
    await this.retryAction(() => this.clickBySelector(selector), assertions, `Click action failed, selector: ${selector}, trying again`, { retries });
  }

  @TruthyParams(classKey, 'name')
  protected async retryClickLink(name: string, assertions: () => Promise<void>[] | Promise<void>, { retries = 2 }: { retries?: number } = {}) {
    await this.retryAction(() => this.clickLink(name), assertions, `Click action failed, link: ${name} trying again`, { retries });
  }

  @TruthyParams(classKey, 'option', 'selector')
  protected async retrySelectFromDropdown(option: string, selector: string, assertions: () => Promise<void>[] | Promise<void>, { retries = 2 }: { retries?: number } = {}) {
    await this.retryAction(
      async () => {
        await this.selectFromDropdown(0, selector);
        await this.selectFromDropdown(option, selector);
      },
      assertions,
      `Select from dropdown action failed, option: ${option}, selector: ${selector} trying again`,
      { retries },
    );
  }

  protected async retryReload(assertions: () => Promise<void>[] | Promise<void>, { retries = 2 }: { retries?: number } = {}) {
    await this.retryAction(() => this.reload(), assertions, 'Assertion failed, reloading page and trying again', { retries, assertFirst: true });
  }
}
