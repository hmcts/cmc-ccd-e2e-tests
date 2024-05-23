import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { config } from '../config/config';
import { buttons } from './common-content';
import Cookie from '../types/cookie';
import { TruthyParams } from '../decorators/truthy-params';

export default abstract class BasePage {
  private page: Page;
  private axeBuilder: AxeBuilder | undefined;

  constructor(page: Page) {
    this.page = page;
    if(config.runAccessibilityTests)
      this.axeBuilder = new AxeBuilder({page: this.page})
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
  }

  abstract verifyContent(...args: any[]): Promise<void>

  protected async clickConfirm() {
    await this.clickBySelector(buttons.confirm.selector);
  }
  
  protected async clickSubmit() {
    await this.clickBySelector(buttons.submit.selector);
  }

  protected async clickContinue() {
    await this.page.getByRole('button', {name: buttons.continue.title}).click();
  }

  protected async clickBySelector(selector?: string) {
    await this.page.locator(selector!).click();
  }

  protected async clickButtonByName(name: string) {
    await this.page.getByRole('button', {name}).click();
  }

  protected async clickLink(name: string) {
    await this.page.getByRole('link', {name}).click();
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

  protected async expectUrlToContainDomain(domain: string) {
    await expect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`));
  }

  protected async expectUrlToStartWith(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`^${path}`));
  }

  protected async expectUrlToEndWith(...endpoints: string[]) {
    await expect(this.page).toHaveURL(new RegExp(`(${endpoints.join('|')})$`));
  }

  protected async expectHeadingToBeVisible(text: string) {
    await expect(this.page.locator('h1', {hasText: text})).toBeVisible();
  }

  protected async expectSubHeadingToBeVisible(text: string) {
    await expect(this.page.locator('h2', {hasText: text})).toBeVisible();
  }

  protected async expectTextToBeVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  protected async expectLabelToBeVisible(label: string) {
    await expect(this.page.getByLabel(label)).toBeVisible();
  } 

  @TruthyParams()
  protected async fill(input: string | number, selector?: string) {
    await this.page.fill(selector!, input.toString());
  }

  @TruthyParams()
  protected async getTextFromSelector(selector?: string) {
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
