import { ZodCreateScheduleValidator } from '../../validators';

export function factoryZodCreateScheduleValidator() {
  return new ZodCreateScheduleValidator();
}
