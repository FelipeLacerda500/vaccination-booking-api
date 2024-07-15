import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { scheduleBodySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = {
  patientName?: string;
  scheduleDate?: Date;
  page: number;
};

export class ZodFetchSchedulesValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedCreateSchedule = scheduleBodySchema.safeParse(input);

    if (!parsedCreateSchedule.success) {
      throw new ValidationError(
        formatZodErrors(parsedCreateSchedule.error.issues),
      );
    }

    const { patientName, scheduleDate, page } = parsedCreateSchedule.data;

    return { patientName, scheduleDate, page };
  }
}