import CCDCaseData from '../../../../../types/case-data/ccd-case-data';

export const heading = 'Draw directions order - Judge';

export const getOrderLinkName = (caseData: CCDCaseData) => (`${caseData.previousServiceCaseReference}-Judge-Directions-Order.pdf`);