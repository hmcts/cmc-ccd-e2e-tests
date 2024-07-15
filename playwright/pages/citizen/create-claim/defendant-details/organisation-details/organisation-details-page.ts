import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, inputs, links } from './organisation-details-content';

@AllMethodsStep
export default class OrganisationDetailsPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.name.label),
      super.expectLabel(inputs.contactName.label),
    ]);
  }

  async enterOrganisationDetails() {
    await super.fill('Organisation A', inputs.name.selector);
    await super.fill('Test Name', inputs.contactName.selector);
  }

  async enterAddressDetails() {
    await super.retryClickLink(
      links.addressManual.title, 
      async () => {
        await super.fill('1234 Street', inputs.addressLine1.selector, {timeout: 2000});
        await super.fill('City', inputs.city.selector);
        await super.fill('E17 6EW', inputs.postcode.selector);
      });
    await super.clickSaveAndContinue();
  }

}