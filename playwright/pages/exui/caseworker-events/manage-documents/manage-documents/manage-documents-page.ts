import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BasePage from '../../../../../base/base-page';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../types/case-data/ccd-case-data';
import { heading } from './manage-documents-content';
import StaffDocumentsFragment from '../../../fragments/staff-documents/staff-documents-fragment';
import AxeBuilder from '@axe-core/playwright';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class ManageDocumentsPage extends ExuiEvent(BasePage) {
  private staffDocumentsFragment: StaffDocumentsFragment;

  constructor(staffDocumentsFragment: StaffDocumentsFragment, page: Page, axeBuilder: AxeBuilder) {
    super(page, axeBuilder);
    this.staffDocumentsFragment = staffDocumentsFragment;
  }

  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([super.expectHeading(heading), super.verifyCaseTitle(caseData), this.staffDocumentsFragment.verifyContent()]);
  }

  async enterDocumentDetais() {
    await this.staffDocumentsFragment.addDocument();
    await this.staffDocumentsFragment.enterCorrespondenceDoc1Details();
    await this.staffDocumentsFragment.addDocument();
    await this.staffDocumentsFragment.enterOtherDoc2Details();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
