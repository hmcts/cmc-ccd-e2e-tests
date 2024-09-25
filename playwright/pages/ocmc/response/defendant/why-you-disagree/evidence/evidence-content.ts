export const heading = 'List your evidence';

export const subHeadings = {
  listYourEvidence: 'List your evidence (optional)',
};

export const paragraphs = {
  yourEvidence:
    'Tell us about any evidence you wish to provide. You do not need to send us any evidence now. If your case goes to a court hearing, and is not settled, you will need to provide evidence.',
};

export const dropdowns = {
  evidenceType1: {
    selector: "select[id='rows[0][type]']",
    options: ['Contracts and agreements'],
  },
  evidenceType2: {
    selector: "select[id='rows[1][type]']",
    options: ['Expert witness'],
  },
};

export const inputs = {
  evidence1Description: {
    label: 'Describe this evidence in more detail (optional). For example, a signed contract.',
    selector: "textarea[id='rows[0][description]']",
  },
  evidence2Description: {
    label: "Describe this evidence in more detail (optional). For example, a surveyor's report.",
    selector: "textarea[id='rows[1][description]']",
  },
  theirEvidenceComments: {
    label: 'List any parts of their evidence you disagree with (optional)',
    selector: '#comment',
  },
};

export const buttons = {
  addEvidence: {
    title: 'Add more evidence',
    selector: "input[id='action[addRow]']",
  },
};
