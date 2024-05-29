export default class DateHelper {
  static addToToday({days = 0, months = 0, years = 0}): Date {
    const today = new Date();
    today.setDate(today.getDate() + days);
    today.setMonth(today.getMonth() + months);
    today.setFullYear(today.getFullYear() + years);

    return today;
  }

  static getTwoDigitMonth(date: Date): string {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  static getTwoDigitYear(date: Date): string {
    const year = date.getFullYear();
    return `${year % 100}`.padStart(2, '0');
  }
}