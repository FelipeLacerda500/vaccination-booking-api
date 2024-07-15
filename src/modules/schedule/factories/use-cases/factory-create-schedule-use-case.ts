import { InMemoryScheduleRepository } from '../../repositories/monostate';
import { CreateScheduleUseCase } from '../../use-cases';

export function factoryCreateScheduleUseCase() {
  const scheduleRepository = new InMemoryScheduleRepository();

  const useCase = new CreateScheduleUseCase(scheduleRepository);

  return useCase;
}
