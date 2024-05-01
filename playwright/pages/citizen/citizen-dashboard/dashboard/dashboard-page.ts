import urls from '../../../../config/urls';
import BasePage from '../../../base-page';

const selectors = {};

export default class DashboardPage extends BasePage {

  verifyContent(): void {
    // throw new Error("Method not implemented.");
  }
  async openDashboard() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }
}
