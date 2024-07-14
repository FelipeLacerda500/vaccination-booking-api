import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { scheduleBodySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = {
  patientName: string;
  patientBirthDate: Date;
  scheduleDate: Date;
};

export class ZodCreateScheduleValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedCreateSchedule = scheduleBodySchema.safeParse(input);

    if (!parsedCreateSchedule.success) {
      throw new ValidationError(
        formatZodErrors(parsedCreateSchedule.error.issues),
      );
    }

    const { patientName, patientBirthDate, scheduleDate } =
      parsedCreateSchedule.data;

    return { patientName, patientBirthDate, scheduleDate };
  }
}
