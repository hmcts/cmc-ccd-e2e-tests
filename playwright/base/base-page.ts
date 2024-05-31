import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { config } from '../config/config';
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';

export default abstract class BasePage {
  private page: Page;
  private axeBuilder?: AxeBuilder;

  constructor(page: Page, axeBuilder?: AxeBuilder) {
    this.page = page;
    this.axeBuilder = axeBuilder;
  }

  abstract verifyContent(...args: any[]): Promise<void>

  protected async clickBySelector(selector?: string) {
    await this.page.locator(selector!).click();
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

  protected async expectDomain(domain: string) {
    await expect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`));
  }

  protected async expectUrlStart(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`^${path}`));
  }

  protected async expectUrlEnd(...endpoints: string[]) {
    await expect(this.page).toHaveURL(new RegExp(`(${endpoints.join('|')})$`));
  }

  protected async expectHeading(text: string) {
    await expect(this.page.locator('h1', {hasText: text})).toBeVisible();
  }

  protected async expectSubHeading(text: string) {
    await expect(this.page.locator('h2', {hasText: text})).toBeVisible();
  }

  @TruthyParams('text')
  protected async expectText(text: string, container?: string) {
    const locator = container 
      ? this.page.locator(container).getByText(text) 
      : this.page.getByText(text);
    
    await expect(locator).toBeVisible();
  }

  protected async retryExpect(expects: () => Promise<void>[] | (() => Promise<void>)) {
    let firstAttempt = true;
    await expect(async () => {
      const promises = expects();
      if(!firstAttempt) {
        await this.page.reload();
      }
      firstAttempt = false;
      await (Array.isArray(promises) ? Promise.all(promises) : promises);
    }).toPass({
      intervals: [1_000, 2_000, 5_000],
      timeout: 30_000,
    });
  }

  protected async clickByText(text: string) {
    await this.page.getByText(text).click();
  }

  protected async expectLabel(label: string, {exact} = {exact: false}) {
    await expect(this.page.getByLabel(label, {exact})).toBeVisible();
  }

  protected async expectOptionChecked(label: string) {
    await expect(this.page.getByLabel(label)).toBeChecked();
  }

  @TruthyParams()
  protected async expectInputValue(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveValue(text);
  }

  @TruthyParams('text', 'selector')
  protected async expectTableRowValue(text: string, selector: string, {rowNum} = {rowNum: 0}) {
    await expect(this.page.locator(`${selector} >> tr`).nth(rowNum).getByText(text)).toBeVisible();
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

  protected async runAccessibilityTests() {
    if(config.runAccessibilityTests && this.axeBuilder) {
      const results = await this.axeBuilder.analyze();
      expect.soft(results.violations).toHaveLength(0);
    }
  }

  public async pause() {
    await this.page.pause();
  }

  public async wait(time: number) {
    await this.page.waitForTimeout(time);
  }
}
