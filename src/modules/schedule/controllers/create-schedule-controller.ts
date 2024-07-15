/* eslint-disable camelcase */

import { factoryCreateScheduleUseCase } from '../factories/use-cases';
import { factoryZodCreateScheduleValidator } from '../factories/validators';
import { ValidationError } from '@/shared/errors';
import { ApiReply, ApiRequest } from '@/server/types';
import { formatZodMessages } from '@/shared/helpers/zod-helper';

export async function createScheduleController(
  request: ApiRequest,
  reply: ApiReply,
) {
  const scheduleValidator = factoryZodCreateScheduleValidator();

  try {
    const { patientName, scheduleDate, patientBirthDate } =
      scheduleValidator.validate(request.body);

    const createScheduleUseCase = factoryCreateScheduleUseCase();
    await createScheduleUseCase.execute({
      patientName,
      scheduleDate,
      patientBirthDate,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return reply
        .status(400)
        .send({ message: formatZodMessages(error.message) });
    }

    throw new Error();
  }

  return reply.status(201).send({});
}
