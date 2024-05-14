import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep
export default class CaseDetailsPage extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
