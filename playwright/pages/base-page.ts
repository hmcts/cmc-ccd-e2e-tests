import { Locator, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { config } from '../config/config';
import { buttons } from './common-content';

export default abstract class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract verifyContent(): Promise<void>

  protected async clickSubmit() {
    await this.clickBySelector(buttons.submit.selector);
  }

  protected async clickContinue() {
    await this.page.getByRole('button', {name: buttons.continue.title}).click();
  }

  protected async clickBySelector(selector: string) {
    await this.page.locator(selector).click();
  }

  protected async clickButton(name: string) {
    await this.page.getByRole('button', {name}).click();
  }

  protected async clickLink(name: string) {
    await this.page.getByRole('link', {name}).click();
  }

  protected async locatorExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    if(count > 0) return true;
    return false;
  }

  protected async elementIncludes(selector: string, content: string): Promise<boolean> {
    const textContent = await this.page.locator(selector).textContent();
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

  protected async fill(selector: string, input: string) {
    await this.page.fill(selector, input);
  }

  protected async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  protected async reload() {
    await this.page.reload();
  }

  protected async replaceContextCookies(cookies: Cookie[]): Promise<void> {
    const context =  this.page.context();
    await context.clearCookies();
    await context.addCookies(cookies);
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
