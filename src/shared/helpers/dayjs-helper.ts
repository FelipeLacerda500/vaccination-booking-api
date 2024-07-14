/* eslint-disable import/no-named-as-default-member*/

import { IDateHelper } from '../protocols';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

export class DayjsHelper implements IDateHelper<Date | boolean> {
  public convertToUtc(date: Date | string): Date {
    return dayjs(date).utc().toDate();
  }

  public hasZeroMinutesAndSeconds(date: Date): boolean {
    return dayjs(date).minute() === 0 && dayjs(date).second() === 0;
  }

  public isFutureDate(date: Date): boolean {
    return dayjs(date).isAfter(dayjs());
  }

  isTimeInRange(date: Date, startHour: number, endHour: number): boolean {
    const dayjsTime = dayjs(date);
    const dayjsStartTime = dayjs(date).set('hour', startHour);
    const dayjsEndTime = dayjs(date).set('hour', endHour);

    return (
      dayjsTime.isSameOrAfter(dayjsStartTime) &&
      dayjsTime.isBefore(dayjsEndTime)
    );
  }

  isSameHour(date1: Date, date2: Date): boolean {
    const dayjsDate1 = dayjs(date1);
    const dayjsDate2 = dayjs(date2);

    return dayjsDate1.hour() === dayjsDate2.hour();
  }
}
