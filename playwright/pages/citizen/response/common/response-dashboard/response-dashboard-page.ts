import BasePage from '../../../../../base/base-page';
import { links } from './response-dashboard-content';

export default class ResponseDashboardPage extends BasePage {
  async verifyContent() {
    throw new Error('Method not implemented.');
  }

  async freeMediation() {
    await super.clickLink(links.freeMediation.title);
    await super.expectUrlEnd('/free-telephone-mediation');
  }

  async hearingDetails() {
    await super.clickLink(links.hearingDetails.title);
    await super.expectUrlEnd('directions-questionnaire/determination-without-hearing-questions');
  }
}