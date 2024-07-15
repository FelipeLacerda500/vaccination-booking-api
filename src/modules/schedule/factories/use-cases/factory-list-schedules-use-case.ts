import { InMemoryScheduleRepository } from '../../repositories/monostate';
import { ListSchedulesUseCase } from '../../use-cases';

export function factoryListSchedulesUseCase() {
  const scheduleRepository = new InMemoryScheduleRepository();

  const useCase = new ListSchedulesUseCase(scheduleRepository);

  return useCase;
}
