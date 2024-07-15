import { NotFoundError } from '@/shared/errors';
import { IScheduleUseCase, IScheduleRepository } from '../protocols';
import { Schedule } from '../models';

type UseCaseRequest = {
  id: string;
};

type UseCaseResponse = {
  schedule: Schedule;
};

export class ConfirmScheduleUseCase
  implements IScheduleUseCase<UseCaseResponse>
{
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  public async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
    const schedule = await this.scheduleRepository.findById(data.id);

    if (!schedule) {
      throw new NotFoundError('[scheduleId: Agendamento não encontrado.]');
    }

    await this.scheduleRepository.markAsRealized(schedule.id);

    return { schedule };
  }
}
