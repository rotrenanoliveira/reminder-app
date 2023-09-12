import { toDate } from "./_lib/to-date";

/**
 * @description
 * Get the number of milliseconds between the two dates.
 * 
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 */
export function differenceInMilliseconds(dateLeft: Date | number, dateRight:  Date | number): number {
  return (toDate(dateLeft).getTime() - toDate(dateRight).getTime())
}