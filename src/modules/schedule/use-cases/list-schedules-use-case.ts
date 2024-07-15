import { Schedule } from '../models';
import { IScheduleUseCase, IScheduleRepository } from '../protocols';

type UseCaseRequest = {
  page: number;
};

type UseCaseResponse = {
  schedules: Schedule[];
};

export class ListSchedulesUseCase implements IScheduleUseCase<UseCaseResponse> {
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  public async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
    const schedules = await this.scheduleRepository.list(data.page);

    return { schedules };
  }
}
