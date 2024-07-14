/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IDateHelper<T = any> {
  convertToUtc(date: Date): T;
  hasZeroMinutesAndSeconds(date: Date): T;
  isFutureDate(date: Date): T;
  isTimeInRange(date: Date, startHour: number, endHour: number): T;
  isSameHour(date1: Date, date2: Date): T;
}
