import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { scheduleBodySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = { id: string };

export class ZodConfirmScheduleValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedCreateSchedule = scheduleBodySchema.safeParse(input);

    if (!parsedCreateSchedule.success) {
      throw new ValidationError(
        formatZodErrors(parsedCreateSchedule.error.issues),
      );
    }

    const id = parsedCreateSchedule.data.id;

    return { id };
  }
}
