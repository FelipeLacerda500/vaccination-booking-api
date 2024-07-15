import { InMemoryScheduleRepository } from '../../repositories/monostate';
import { ConfirmScheduleUseCase } from '../../use-cases';

export function factoryConfirmScheduleUseCase() {
  const scheduleRepository = new InMemoryScheduleRepository();

  const useCase = new ConfirmScheduleUseCase(scheduleRepository);

  return useCase;
}
