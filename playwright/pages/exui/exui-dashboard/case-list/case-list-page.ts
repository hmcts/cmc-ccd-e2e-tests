import urls from '../../../../config/urls';
import BasePage from '../../../base-page';

export default class CaseListPage extends BasePage {
  
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async openCaseList() {
    await super.goTo(`${urls.manageCase}/cases`);
  }
}
