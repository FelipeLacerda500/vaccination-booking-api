/* eslint-disable camelcase, @typescript-eslint/no-explicit-any */

import { IScheduleUseCase, IScheduleRepository } from '../protocols';
import { ValidationError } from '@/shared/errors';
import { Schedule } from '../models';

type UseCaseRequest = {
  patientName: string;
  patientBirthDate: Date;
  scheduleDate: Date;
};

type UseCaseResponse = {
  schedule: Schedule;
};

export class CreateScheduleUseCase
  implements IScheduleUseCase<UseCaseResponse>
{
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  public async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
    const providedScheduleDate = data.scheduleDate;
    const patientBirthDate = data.patientBirthDate;

    const schedulesOnGivenDate = await this.scheduleRepository.findByDateOrName(
      null,
      providedScheduleDate,
      1,
    );

    const sameTimeSchedules = schedulesOnGivenDate.filter(
      (item) =>
        item.schedule_date.getHours() === providedScheduleDate.getHours(),
    );

    if (sameTimeSchedules.length === 2) {
      throw new ValidationError(
        '\n[scheduleDate: Limite máximo de agendamentos atingido para o horário selecionado.]',
      );
    }

    const schedule = await this.scheduleRepository.create({
      patient_name: data.patientName,
      patient_birth_date: patientBirthDate,
      schedule_date: providedScheduleDate,
    });

    return { schedule };
  }
}
