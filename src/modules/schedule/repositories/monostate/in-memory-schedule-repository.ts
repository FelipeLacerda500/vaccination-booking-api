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

  public async findByDateOrName(
    patient_name: string,
    schedule_date: Date,
    page: number,
  ) {
    let searchResult = InMemoryScheduleRepository._schedules;

    if (schedule_date) {
      searchResult = searchResult.filter(
        (item) =>
          item.schedule_date.getFullYear() === schedule_date.getFullYear() &&
          item.schedule_date.getMonth() === schedule_date.getMonth() &&
          item.schedule_date.getDate() === schedule_date.getDate(),
      );
    }

    if (patient_name) {
      searchResult = searchResult.filter((item) =>
        item.patient_name.toLowerCase().includes(patient_name.toLowerCase()),
      );
    }

    return searchResult.slice((page - 1) * 20, page * 20);
  }

  public async findById(id: string) {
    const schedule = InMemoryScheduleRepository._schedules.find(
      (item) => item.id === id,
    );

    if (!schedule) {
      return null;
    }

    return schedule;
  }
}
