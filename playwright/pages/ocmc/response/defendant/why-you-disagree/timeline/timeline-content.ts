export const heading = 'Add your timeline of events';

export const subHeadings = {
  theirTimeline: 'Their timeline',
  addTimeline: 'Add your timeline of events (optional)',
};

export const inputs = {
  date1: {
    label: '1. Date For example, 1 June',
    selector: "input[id='rows[0][date]']",
  },
  timeline1: {
    label: 'What happened',
    selector: "textarea[id='rows[0][description]']",
  },
  date2: {
    label: '2. Date For example, 1 June',
    selector: "input[id='rows[1][date]']",
  },
  timeline2: {
    label: 'What happened',
    selector: "textarea[id='rows[1][description]']",
  },
  comment: {
    label: 'Add any comments about their timeline (optional)',
    selector: '#comment',
  },
};

export const buttons = {
  addEvent: {
    title: 'Add another event',
    selector: "input[id='action[addRow]']",
  },
};
