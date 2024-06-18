import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import config from '../config/config';
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';
import { pageExpect } from '../playwright-fixtures';
import Timer from '../helpers/timer';

export default abstract class BasePage {
  private page: Page;
  private axeBuilder?: AxeBuilder;

  constructor(page: Page, axeBuilder?: AxeBuilder) {
    this.page = page;
    this.axeBuilder = axeBuilder;
  }

  abstract verifyContent(...args: any[]): Promise<void>

  @TruthyParams()
  protected async clickBySelector(selector: string) {
    await this.page.locator(selector).click();
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

  @TruthyParams()
  protected async goTo(url: string) {
    if(this.page.url() !== url) {
      await this.page.goto(url);
    }
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
    await this.page.locator(selector).setInputFiles([filePath])
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
  protected async expectText(text: string, options: {container?: string, timeout?: number} = {}) {
    const locator = options.container
      ? this.page.locator(options.container).getByText(text) 
      : this.page.getByText(text);
    
    await pageExpect(locator).toBeVisible({timeout: options.timeout});
  }

  protected async expectLabel(label: string, options: {exact?: boolean, timeout?: number} = {exact: false}) {
    await pageExpect(this.page.getByLabel(label, {exact: options.exact})).toBeVisible({timeout: options.timeout});
  }

  protected async expectOptionChecked(label: string, options?: {timeout?: number}) {
    await pageExpect(this.page.getByLabel(label)).toBeChecked(options);
  }

  @TruthyParams('selector', 'text')
  protected async expectInputValue(selector: string, text: string, options?: {timeout?: number}) {
    await pageExpect(this.page.locator(selector)).toHaveValue(text, options);
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

  protected async retryExpect(expects: () => Promise<void>[] | Promise<void>, {retries = 1}: { retries?: number } = {}) {
    let attempts = 0;
    while(attempts <= retries) {
      if(attempts > 0) {
        await this.page.reload();
      }
      const promises = expects();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
        break;
      } catch(error) {
        console.log('\n' + '-'.repeat(100));
        if(attempts >= retries) throw error;
        console.log('Error: ' + error.matcherResult.message);
        console.log('Reloading page and trying again');
        console.log(`Retries: ${retries - attempts} remaining`);
      }
      attempts++;
    }
  }

  protected async runAccessibilityTests() {
    if(config.runAccessibilityTests && this.axeBuilder) {
      const results = await this.axeBuilder.analyze();
      pageExpect.soft(results.violations).toHaveLength(0);
    }
  }

}
