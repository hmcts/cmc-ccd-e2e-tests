import urls from '../../../../config/urls';
import BasePage from '../../../base-page';
import { links } from './dashboard-content';

export default class DashboardPage extends BasePage {

  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async open() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }
}
