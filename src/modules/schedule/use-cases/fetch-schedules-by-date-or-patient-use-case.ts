import { Schedule } from '../models';
import { IScheduleRepository, IScheduleUseCase } from '../protocols';

type UseCaseRequest = {
  patientName?: string;
  scheduleDate?: Date;
  page: number;
};

type UseCaseResponse = {
  schedules: Schedule[];
};

export class FetchSchedulesByDateOrPatientUseCase
  implements IScheduleUseCase<UseCaseResponse>
{
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  public async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
    const schedules = await this.scheduleRepository.findByDateOrName(
      data?.patientName,
      data?.scheduleDate,
      data.page,
    );

    return { schedules };
  }
}
