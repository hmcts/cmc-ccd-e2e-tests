import urls from "../../../../config/urls";
import BasePage from "../../../base-page";


export default class DashboardPage extends BasePage {

  async verifyContent(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async openDashboard() {
    await super.goTo(`${urls.citizenFrontEnd}/dashboard`);
  }
}
