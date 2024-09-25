import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { links } from './response-dashboard-content';

@AllMethodsStep()
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
