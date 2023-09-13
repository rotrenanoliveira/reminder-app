import { rounding } from './_lib/rounding-method'
import { toDate } from './_lib/to-date'

/**
 * @description
 * Get the number of seconds between the two dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 */
export function differenceInSeconds(dateLeft: Date | number, dateRight: Date | number): number {
  const diff = (toDate(dateLeft).getTime() - toDate(dateRight).getTime()) / 1000

  return rounding.trunc(diff)
}
