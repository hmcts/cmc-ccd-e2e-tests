const userType = {
    JUDGE: 'Judge',
    LA: 'Legal Advisor',
    CASEWORKER: 'Caseworker',
    CITIZEN: 'Citizen'
};

const caseEventId = {
    INITIATE_PAYMENT_CASE: 'InitiateClaimPaymentCitizen',
    STAY_CLAIM: 'StayClaim',
    LIFT_STAY: 'LiftStay',
    ASSIGN_FOR_DIRECTIONS: 'AssigningForDirections',
    ASSIGN_FOR_JUDGE_DIRECTIONS: 'AssigningForJudgeDirections',
    CLAIMANT_REJECTS: 'ClaimantRejects',
    GENERATE_ORDER: 'GenerateOrder'
};

const caseEventName = {
    LIFT_STAY: 'Lift Stay',
    PROVIDE_DIRECTIONS: 'Provide Directions',
    GENERATE_ORDER: 'Generate Order',
    REVIEW_ORDER: 'Review Order',
    ACTION_REVIEW_COMMENTS: 'Action review comments',
    APPROVE_DIRECTIONS_ORDER: 'Approve direction\'s order',
    DRAW_DIRECTIONS_ORDER: 'Draw directions order',
    JUDGE_DRAW_DIRECTIONS_ORDER: 'Draw directions order - Judge',
    REFERRED_MEDIATION: 'Mediation pending',
    MEDIATION_SUCCESSFUL: 'Mediation successful',
    MEDIATION_FAILED: 'Mediation unsuccessful',
    ISSUE_PAPER_DEFENCE_FORMS: 'Issue paper defence forms',
    PAPER_RESP_REVIEWED: 'Paper response reviewed',
    REVIEW_OCON9X_RESP: 'Review OCON9x paper response',
    PAPER_RESP_ADMISSIOON: 'Paper Response - Admission',
    PAPER_RESP_DEFENCE: 'Paper Response - Defence'
};

module.exports = {
    userType,
    caseEventId,
    caseEventName
};
