import { Page } from "@playwright/test";

export default abstract class BaseFactory {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}