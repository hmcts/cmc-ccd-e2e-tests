import { Page } from '@playwright/test';

export default abstract class BasePageFactory {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}