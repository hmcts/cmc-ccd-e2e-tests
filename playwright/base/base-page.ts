import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { config } from '../config/config';
import { buttons } from './common-content';
import Cookie from '../types/cookie';
import PageError from '../errors/page-error';

export default abstract class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract verifyContent(): Promise<void>

  private validateSelector(selector?: string) {
    if(!selector) {
      throw new PageError('Selector must be a non-empty string');
    }
  }

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
    this.validateSelector(selector);
    await this.page.locator(selector!).click();
  }

  protected async clickButtonByName(name: string) {
    await this.page.getByRole('button', {name}).click();
  }

  protected async clickLink(name: string) {
    await this.page.getByRole('link', {name}).click();
  }

  protected async selectorExists(selector?: string): Promise<boolean> {
    this.validateSelector(selector);
    await this.page.waitForSelector(selector!, {state: 'visible'});
    return await this.page.locator(selector!).isVisible();
  }

  protected async elementIncludes(content: string, selector?: string,): Promise<boolean> {
    this.validateSelector(selector);
    const textContent = await this.page.locator(selector!).textContent();
    if(!textContent) return false;
    return textContent.includes(content);
  }

  protected async goTo(url: string) {
    if(!(this.page.url() === url)) {
      await this.page.goto(url);
    }
  } 

  protected async expectUrlToContainDomain(domain: string) {
    await expect(this.page).toHaveURL(new RegExp(`https?://${domain}.*`));
  }

  protected async expectUrlToStartWith(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`^${path}`));
  }

  protected async expectUrlToEndWith(endpoint: string) {
    await expect(this.page).toHaveURL(new RegExp(`${endpoint}$`));
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

  protected async fill(input: string | number, selector?: string) {
    this.validateSelector(selector);
    if(!input) {
      throw new PageError('Input must be a non-empty string')
    }
    await this.page.fill(selector!, input.toString());
  }

  protected async getTextFromSelector(selector: string) {
    this.validateSelector(selector);
    return await this.page.textContent(selector) ?? undefined;
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
    if(config.runAccessibilityTests) {
      const results = await new AxeBuilder({page: this.page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']).analyze();
      expect(results.violations).toHaveLength(0);
    }
  }

  public async pause() {
    await this.page.pause();
  }

  public async wait(time: number) {
    await this.page.waitForTimeout(time);
  }
}
