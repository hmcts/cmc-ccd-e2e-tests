import CaseworkerEvents from '../enums/events/caseworker-events';
import JudgeEvents from '../enums/events/judge-events';
import LegalAdvisorEvents from '../enums/events/legal-advisor-events';

type ExuiEvents = CaseworkerEvents | JudgeEvents | LegalAdvisorEvents;

export default ExuiEvents;