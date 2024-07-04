import FileSystemHelper from '../../helpers/file-system-helper';
import caseDataPaths from '../../config/case-data-paths';
import FileType from '../../enums/file-type';
import CCDCaseData from '../../types/case-data/ccd-case-data';

export default class CaseDataFactory {
  get generateOrderDisputeAllBothRejectMediation(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.generateOrderDisputeAllBothRejectMediation, FileType.JSON);
  }

  get generateOrderDisputeAllDefendantAcceptAndClaimantRejectMediation(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.generateOrderDisputeAllDefendantAcceptAndClaimantRejectMediation, FileType.JSON);
  }

  get generateOrderFullDefenceStatesPaid(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.generateOrderFullDefenceStatesPaid, FileType.JSON);
  }

  get generateOrderPartAdmit(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.generateOrderPartAdmit, FileType.JSON);
  }

  get initiateClaimPaymentCitizen(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.initiateClaimPaymentCitizen, FileType.JSON);
  }

  get jddoDisputeAllBothRejectMediation(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.jddoDisputeAllBothRejectMediation, FileType.JSON);
  }

  get jddoDisputeAllDefendantAcceptAndClaimantRejectMediation(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.jddoDisputeAllDefendantAcceptAndClaimantRejectMediation, FileType.JSON);
  }

  get jddoFullDefenceStatesPaid(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.jddoFullDefenceStatesPaid, FileType.JSON);
  }

  get jddoPartAdmit(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.jddoPartAdmit, FileType.JSON);
  }

  get judgementRequestedCCJ(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.judgementRequestedCCJ, FileType.JSON);
  }

  get referMediationFullDefenceDisputeAll(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.referMediationFullDefenceDisputeAll, FileType.JSON);
  }

  get referMediationFullDefenceStatesPaid(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.referMediationFullDefenceDisputeAll, FileType.JSON);
  }

  get referMediationPartAdmit(): CCDCaseData {
    return FileSystemHelper.readFile(caseDataPaths.referMediationPartAdmit, FileType.JSON);
  }
}