import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import config from '../config/config';
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';
import { pageExpect } from '../playwright-fixtures';
import Timer from '../helpers/timer';
import { getDomain } from '../config/urls';

export default abstract class BasePage {
  private page: Page;
  private axeBuilder?: AxeBuilder;

  constructor(page: Page, axeBuilder?: AxeBuilder) {
    this.page = page;
    this.axeBuilder = axeBuilder;
  }

  abstract verifyContent(...args: any[]): Promise<void>

  @TruthyParams('selector')
  protected async clickBySelector(selector: string, options: {count?: number} = {}) {
    await this.page.locator(selector).click({clickCount: options.count});
  }

  protected async clickButtonByName(name: string) {
    await this.page.getByRole('button', {name}).click();
  }

  protected async clickLink(name: string, {index} = {index: 0}) {
    await this.page.getByRole('link', {name}).nth(index).click();
  }

  @TruthyParams()
  protected async selectorExists(selector?: string): Promise<boolean> {
    await this.page.waitForSelector(selector!, {state: 'visible'});
    return await this.page.locator(selector!).isVisible();
  }

  @TruthyParams()
  protected async elementIncludes(content: string, selector?: string): Promise<boolean> {
    const textContent = await this.page.locator(selector!).textContent();
    if(!textContent) return false;
    return textContent.includes(content);
  }

  @TruthyParams('url')
  protected async goTo(url: string,  options: {force?: boolean} = {}) {
    const {origin, pathname} = new URL(this.page.url());
    if(`${origin}${pathname}` !== url || options.force) {
      await this.page.goto(url);
    }
  }
  
  protected async isDomain(url: string) {
    const currentDomain = getDomain(this.page.url());
    const urlDomain = getDomain(url);
    return urlDomain === currentDomain;
  }

  protected async clickByText(text: string) {
    await this.page.getByText(text).click();
  }

  @TruthyParams()
  protected async fill(input: string | number, selector?: string) {
    await this.page.fill(selector!, input.toString());
  }

  @TruthyParams()
  protected async getText(selector?: string) {
    return await this.page.textContent(selector) ?? undefined;
  }

  @TruthyParams()
  protected async selectFromDropdown(option: string, selector?: string) {
    await this.page.selectOption(selector, option);
  }

  protected async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  protected async reload() {
    await this.page.reload();
  }

  protected async clearCookies() {
    await this.page.context().clearCookies();
  }

  protected async addCookies(cookies: Cookie[]) {
    await this.page.context().addCookies(cookies);
  }

  @TruthyParams()
  protected async uploadFile(filePath: string, selector: string) {
    await this.page.locator(selector).setInputFiles([]);
    await this.page.locator(selector).setInputFiles([filePath]);
  }

  protected async waitForSelectorToDetach(selector: string, options: {timeout?: number} = {}) {
    const locator = this.page.locator(selector);
    await locator.waitFor({state: 'attached'});
    await locator.waitFor({state: 'detached', ...options});
  }

  protected async waitForTextToDetach(text: string, options: {timeout?: number} = {}) {
    const locator = this.page.getByText(text);
    await locator.waitFor({state: 'attached'});
    await locator.waitFor({state: 'detached', ...options});
  }

  public async pause() {
    await this.page.pause();
  }

  public async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  protected async expectDomain(domain: string, options: {timeout?: number} = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`), {...options});
  }

  protected async expectUrlStart(path: string, options: {timeout?: number} = {}) {
    await pageExpect(this.page).toHaveURL(new RegExp(`^${path}`), {...options});
  }

  protected async expectUrlEnd(endpoints: string | string[], options: {timeout?: number} = {}) {
    const regex = new RegExp(Array.isArray(endpoints) ? `(${endpoints.join('|')})$` : `${endpoints}$`);
    await pageExpect(this.page).toHaveURL(regex, {...options});
  }

  protected async expectHeading(text: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator('h1', {hasText: text})).toBeVisible(options);
  }

  protected async expectSubHeading(text: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator('h2', {hasText: text})).toBeVisible(options);
  }

  @TruthyParams('text')
  protected async expectText(text: string | number, options: {exact?: boolean, container?: string, timeout?: number, visible?: boolean} = {}) {
    const locator = options.container
      ? this.page.locator(options.container).getByText(text.toString()) 
      : this.page.getByText(text.toString(), {exact: options.exact});
    
    await pageExpect(locator).toBeVisible({timeout: options.timeout, visible: options.visible});
  }

  protected async expectLabel(label: string, options: {exact?: boolean, timeout?: number} = {exact: false}) {
    await pageExpect(this.page.getByLabel(label, {exact: options.exact})).toBeVisible({timeout: options.timeout});
  }

  protected async expectLink(name: string, options: {exact?: boolean, timeout?: number} = {exact: false}) {
    await pageExpect(this.page.getByRole('link', {name, exact: options.exact})).toBeVisible({timeout: options.timeout});
  }

  @TruthyParams('selector')
  protected async expectOptionChecked(selector: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator(selector)).toBeChecked(options);
  }

  @TruthyParams('selector', 'text')
  protected async expectInputValue(selector: string, text: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator(selector)).toHaveValue(text, options);
  }

  @TruthyParams('selector', 'option')
  protected async expectDropdownOption(selector: string, option: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator(selector)).toHaveText(option, options);
  }

  @TruthyParams('text', 'selector')
  protected async expectTableRowValue(text: string, selector: string, options: {rowNum: number, timeout?: number, tableName?: string} = {rowNum: 0}) {
    await pageExpect(this.page.locator(`${selector} >> tr`)
      .nth(options.rowNum).getByText(text)).toBeVisible({timeout: options.timeout});
  }

  protected async retryExpectTimeout(expects: () => Promise<void>[] | Promise<void>, 
    {interval = 0, timeout = config.playwright.toPassTimeout}: { interval?: number, timeout?: number } = {}) {
    let attempts = 0;
    const timer = new Timer(timeout);
    await pageExpect(async () => {
      if(attempts > 0) {
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

  protected async retryAction(
    action: () => Promise<void>, 
    assertion: () => Promise<void>[] | Promise<void>,
    message: string,  
    {retries = 1, assertFirst = false}: { retries?: number, assertFirst?: boolean } = {},
  ) {
    while(retries > 0) {
      if(!assertFirst) await action();
      const promises = assertion();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
        break;
      } catch(error) {
        retries--;
        if(retries <= 0) throw error;
        console.log(message);
        console.log(`Retries: ${retries} remaining`);
        assertFirst = false;
      }
    }
  }

  @TruthyParams('selector')
  protected async retryClick(selector: string, expects: () => Promise<void>[] | Promise<void>, {retries = 2}: { retries?: number } = {}) {
    await this.retryAction(
      () => this.clickBySelector(selector), 
      expects, 
      'Click action failed, trying again', 
      {retries},
    );
  }

  protected async retryReload(expects: () => Promise<void>[] | Promise<void>, {retries = 2}: { retries?: number } = {}) {
    await this.retryAction(
      () => this.reload(), 
      expects, 
      'Assertion failed, reloading page and trying again', 
      {retries, assertFirst: true},
    );
  }

  protected async runAccessibilityTests() {
    if(config.runAccessibilityTests && this.axeBuilder) {
      const results = await this.axeBuilder.analyze();
      pageExpect.soft(results.violations).toHaveLength(0);
    }
  }
}
