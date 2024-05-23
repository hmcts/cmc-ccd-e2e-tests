import { Page } from '@playwright/test';

export default abstract class BasePageFactory {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

}