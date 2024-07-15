/* eslint-disable @typescript-eslint/no-explicit-any */

import { Schedule } from '../models';

export interface IScheduleRepository<T = any> {
  create(data: Schedule): Promise<T>;
  list(page: number): Promise<T>;
  findByDateOrName(
    patient_name: string,
    schedule_date: Date,
    page: number,
  ): Promise<T>;
  findById(id: string): Promise<T>;
  markAsRealized(id: string): Promise<T>;
}
