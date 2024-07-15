import { InMemoryScheduleRepository } from '../../repositories/monostate';
import { FetchSchedulesByDateOrPatientUseCase } from '../../use-cases';

export function factoryFetchScheduleByDateOrPatientUseCase() {
  const scheduleRepository = new InMemoryScheduleRepository();

  const useCase = new FetchSchedulesByDateOrPatientUseCase(scheduleRepository);

  return useCase;
}
