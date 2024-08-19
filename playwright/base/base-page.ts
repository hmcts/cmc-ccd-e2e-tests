import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import config from '../config/config';
const playwrightConfig = config.playwright;
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';
import { pageExpect, test } from '../playwright-fixtures';
import Timer from '../helpers/timer';
import { getDomain } from '../config/urls';
import { BoxedDetailedStep, Step } from '../decorators/test-steps';
import ClassMethodHelper from '../helpers/class-method-helper';

const classKey = 'BasePage';
export default abstract class BasePage {
  private page: Page;
  private axeBuilder?: AxeBuilder;

  constructor(page: Page, axeBuilder?: AxeBuilder) {
    this.page = page;
    this.axeBuilder = axeBuilder;
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async clickBySelector(
    selector: string,
    options: { count?: number; timeout?: number } = { timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page
      .locator(selector)
      .click({ clickCount: options.count, timeout: options.timeout });
  }

  @BoxedDetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickButtonByName(
    name: string,
    options: { timeout?: number } = { timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page.getByRole('button', { name }).click(options);
  }

  @BoxedDetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickLink(
    name: string,
    { index, timeout } = { index: 0, timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page.getByRole('link', { name }).nth(index).click({ timeout: timeout });
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey)
  protected async selectorExists(selector: string): Promise<boolean> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return await this.page.locator(selector!).isVisible();
  }

  @BoxedDetailedStep(classKey, 'content', 'selector')
  @TruthyParams(classKey)
  protected async elementIncludes(content: string, selector?: string): Promise<boolean> {
    const textContent = await this.page.locator(selector!).textContent();
    if (!textContent) return false;
    return textContent.includes(content);
  }

  @BoxedDetailedStep(classKey, 'url')
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

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async clickByText(
    text: string,
    { timeout } = { timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page.getByText(text).click({ timeout });
  }

  @BoxedDetailedStep(classKey, 'input', 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputText(
    input: string | number,
    selector: string,
    options: { timeout?: number } = { timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page.fill(selector, input.toString(), {
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputSensitiveText(
    input: string | number,
    selector: string,
    options: { timeout?: number } = { timeout: playwrightConfig.actionTimeout },
  ) {
    await this.page.fill(selector, input.toString(), {
      timeout: options.timeout,
    });
  }

  @TruthyParams(classKey)
  protected async getText(selector: string) {
    return (await this.page.textContent(selector)) ?? undefined;
  }

  @BoxedDetailedStep(classKey, 'option', 'selector')
  @TruthyParams(classKey, 'selector')
  protected async selectFromDropdown(option: string | number, selector: string) {
    if (typeof option === 'number') await this.page.selectOption(selector, { index: option });
    else await this.page.selectOption(selector, option);
  }

  @BoxedDetailedStep(classKey)
  protected async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  @BoxedDetailedStep(classKey)
  protected async reload() {
    await this.page.reload();
  }

  @BoxedDetailedStep(classKey)
  protected async clearCookies() {
    await this.page.context().clearCookies();
  }

  @BoxedDetailedStep(classKey)
  protected async addCookies(cookies: Cookie[]) {
    await this.page.context().addCookies(cookies);
  }

  @BoxedDetailedStep(classKey, 'filePath', 'selector')
  @TruthyParams(classKey)
  protected async retryUploadFile(filePath: string, selector: string) {
    await this.page.locator(selector).setInputFiles([]);
    await this.page.locator(selector).setInputFiles([filePath]);
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async waitForSelectorToDetach(
    selector: string,
    options: { timeout?: number } = { timeout: 25_000 },
  ) {
    const locator = this.page.locator(selector);
    try {
      await locator.waitFor({ state: 'attached', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await locator.waitFor({ state: 'detached', ...options });
  }

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async waitForTextToDetach(
    text: string,
    options: { timeout?: number } = { timeout: 25_000 },
  ) {
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

  protected async runVerifications(
    expects?: Promise<void> | Promise<void>[],
    { axe = true, axeExclusions = [] } = {},
  ) {
    if (expects) {
      Array.isArray(expects) ? await Promise.all(expects) : await expects;
    }

    if (config.runAxeTests && this.axeBuilder && axe) {
      await this.expectAxeToPass(axeExclusions);
    }
  }

  @BoxedDetailedStep(classKey)
  private async expectAxeToPass(axeExclusions: string[]) {
    let axeBuilder = this.axeBuilder;
    for (const axeExclusion of axeExclusions) {
      axeBuilder = axeBuilder.exclude(axeExclusion);
    }
    const pageName = ClassMethodHelper.formatClassName(this.constructor.name);

    const errorsNumBefore = test.info().errors.length;
    await pageExpect.soft(pageName).toHaveNoAxeViolationsCache(axeBuilder, this.page);
    const errorsAfter = test.info().errors;

    if (errorsAfter.length > errorsNumBefore) {
      errorsAfter[errorsAfter.length - 1].value = 'accessibility';
    }
  }

  @BoxedDetailedStep(classKey, 'domain')
  protected async expectDomain(domain: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`), {
      ...options,
    });
  }

  @BoxedDetailedStep(classKey, 'path')
  protected async expectUrlStart(path: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`^${path}`), {
      ...options,
    });
  }

  @BoxedDetailedStep(classKey, 'endpoints')
  protected async expectUrlEnd(endpoints: string | string[], options: { timeout?: number } = {}) {
    const regex = new RegExp(
      Array.isArray(endpoints) ? `(${endpoints.join('|')})$` : `${endpoints}$`,
    );
    await pageExpect(this.page).toHaveURL(regex, { ...options });
  }

  @BoxedDetailedStep(classKey, 'text')
  protected async expectHeading(text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator('h1', { hasText: text })).toBeVisible(options);
  }

  @BoxedDetailedStep(classKey, 'text')
  protected async expectSubHeading(text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator('h2', { hasText: text })).toBeVisible(options);
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async expectSelector(selector: string, options: { timeout?: number } = {}) {
    await pageExpect(this.page.locator(selector)).toBeVisible(options);
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async expectNoSelector(selector: string, options: { timeout?: number } = {}) {
    const locator = this.page.locator(selector);
    try {
      await locator.waitFor({ state: 'visible', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await pageExpect(locator).toBeHidden(options);
  }

  private getTextLocator(
    text: string | number,
    exact?: boolean,
    selector?: string,
    first?: boolean,
  ) {
    const locator = selector
      ? this.page.locator(selector).getByText(text.toString())
      : this.page.getByText(text.toString(), { exact: exact });
    return first ? locator.first() : locator;
  }

  @BoxedDetailedStep(classKey, 'text')
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

  @BoxedDetailedStep(classKey, 'text')
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
      await locator.waitFor({ state: 'visible', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await pageExpect(locator).toBeHidden(options);
  }

  @BoxedDetailedStep(classKey, 'label')
  protected async expectLabel(
    label: string,
    options: { exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByLabel(label, { exact: options.exact })).toBeVisible({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectLink(
    name: string,
    options: { exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('link', { name, exact: options.exact })).toBeVisible({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async expectOptionChecked(selector: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator(selector)).toBeChecked(options);
  }

  @BoxedDetailedStep(classKey, 'selector', 'text')
  @TruthyParams(classKey, 'selector', 'text')
  protected async expectInputValue(selector: string, text: string, options?: { timeout?: number }) {
    await pageExpect(this.page.locator(selector)).toHaveValue(text, options);
  }

  @BoxedDetailedStep(classKey, 'selector', 'option')
  @TruthyParams(classKey, 'selector', 'option')
  protected async expectDropdownOption(
    selector: string,
    option: string,
    options?: { timeout?: number },
  ) {
    await pageExpect(this.page.locator(selector)).toHaveText(option, options);
  }

  @BoxedDetailedStep(classKey, 'text', 'selector')
  @TruthyParams(classKey, 'text', 'selector')
  protected async expectTableRowValue(
    text: string,
    selector: string,
    options: { rowNum: number; timeout?: number; tableName?: string } = {
      rowNum: 0,
    },
  ) {
    await pageExpect(
      this.page.locator(`${selector} >> tr`).nth(options.rowNum).getByText(text),
    ).toBeVisible({ timeout: options.timeout });
  }

  protected async retryAction(
    action: () => Promise<void>,
    assertions: () => Promise<void>[] | Promise<void>,
    message: string,
    { retries = 1, assertFirst = false }: { retries?: number; assertFirst?: boolean } = {},
  ) {
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

  @Step(classKey)
  @TruthyParams(classKey, 'selector')
  protected async retryClickBySelector(
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.clickBySelector(selector),
      assertions,
      `Click action failed, selector: ${selector}, trying again`,
      { retries },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'name')
  protected async retryClickLink(
    name: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.clickLink(name),
      assertions,
      `Click action failed, link: ${name} trying again`,
      { retries },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'option', 'selector')
  protected async retrySelectFromDropdown(
    option: string,
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
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

  @Step(classKey)
  protected async retryReload(
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.reload(),
      assertions,
      'Assertion failed, reloading page and trying again',
      { retries, assertFirst: true },
    );
  }

  protected async retryActionTimeout(
    action: () => Promise<void>,
    expects: () => Promise<void>[] | Promise<void>,
    message: string,
    {
      interval = 5_000,
      timeout = playwrightConfig.toPassTimeout,
      assertFirst = false,
    }: { interval?: number; timeout?: number; assertFirst?: boolean } = {},
  ) {
    let attempts = 0;
    const timer = new Timer(timeout);
    await pageExpect(async () => {
      if (!assertFirst) await action();
      attempts++;
      const promises = expects();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
      } catch (error) {
        console.log(message);
        console.log(`Attempts: ${attempts}, Timeout in ${timer.remainingTime} second(s)`);
        assertFirst = false;
        throw error;
      }
    }).toPass({
      intervals: [interval],
      timeout: timeout,
    });
  }

  @Step(classKey)
  @TruthyParams(classKey, 'selector')
  protected async retryClickBySelectorTimeout(
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.clickBySelector(selector),
      assertions,
      `Click action failed, selector: ${selector}, trying again`,
      {
        interval,
        timeout,
      },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'name')
  protected async retryClickLinkTimeout(
    name: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.clickLink(name),
      assertions,
      `Click action failed, link: ${name} trying again`,
      { interval, timeout },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'option', 'selector')
  protected async retrySelectFromDropdownTimeout(
    option: string,
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      async () => {
        await this.selectFromDropdown(0, selector);
        await this.selectFromDropdown(option, selector);
      },
      assertions,
      `Select from dropdown action failed, option: ${option}, selector: ${selector} trying again`,
      { interval, timeout },
    );
  }

  @Step(classKey)
  protected async retryReloadTimeout(
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.reload(),
      assertions,
      'Assertion failed, reloading page and trying again',
      { interval, timeout },
    );
  }
}
