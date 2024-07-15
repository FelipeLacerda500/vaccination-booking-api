/* eslint-disable require-await, camelcase */

import { randomUUID } from 'node:crypto';
import { Schedule } from '../../models';
import { IScheduleRepository } from '../../protocols';

export class InMemoryScheduleRepository implements IScheduleRepository {
  private static _schedules: Schedule[] = [];

  public async create(data: Schedule) {
    const schedule = {
      id: randomUUID(),
      patient_name: data.patient_name,
      patient_birth_date: data.patient_birth_date,
      schedule_date: data.schedule_date,
      realized: false,
    };

    InMemoryScheduleRepository._schedules.push(schedule);

    InMemoryScheduleRepository._schedules.sort(
      (a, b) => a.schedule_date.getTime() - b.schedule_date.getTime(),
    );

    return schedule;
  }

  public async list(page: number) {
    return InMemoryScheduleRepository._schedules.slice(
      (page - 1) * 20,
      page * 20,
    );
  }
}
