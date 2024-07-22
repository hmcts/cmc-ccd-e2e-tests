import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, inputs, links } from './organisation-details-content';

@AllMethodsStep()
export default class OrganisationDetailsPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.name.label),
      super.expectLabel(inputs.contactName.label),
    ]);
  }

  async enterOrganisationDetails() {
    await super.inputText('Organisation A', inputs.name.selector);
    await super.inputText('Test Name', inputs.contactName.selector);
  }

  async enterAddressDetails() {
    await super.retryClickLink(
      links.addressManual.title, 
      async () => {
        await super.inputText('1234 Street', inputs.addressLine1.selector, {timeout: 2000});
        await super.inputText('City', inputs.city.selector);
        await super.inputText('E17 6EW', inputs.postcode.selector);
      });
    await super.clickSaveAndContinue();
  }

}