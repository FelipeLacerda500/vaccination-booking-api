/* eslint-disable camelcase */

import { factoryFetchScheduleByDateOrPatientUseCase } from '../factories/use-cases';
import { factoryZodFetchSchedulesValidator } from '../factories/validators';
import { ValidationError } from '@/shared/errors';
import { ApiReply, ApiRequest } from '@/server/types';
import { formatZodMessages } from '@/shared/helpers/zod-helper';

export async function fetchSchedulesController(
  request: ApiRequest,
  reply: ApiReply,
) {
  const scheduleValidator = factoryZodFetchSchedulesValidator();

  try {
    const { patientName, scheduleDate, page } = scheduleValidator.validate(
      request.query,
    );

    const fetchScheduleByDateOrPatientUseCase =
      factoryFetchScheduleByDateOrPatientUseCase();
    const schedulesList = await fetchScheduleByDateOrPatientUseCase.execute({
      patientName,
      scheduleDate,
      page,
    });

    return reply.status(200).send(schedulesList);
  } catch (error) {
    if (error instanceof ValidationError) {
      return reply
        .status(400)
        .send({ message: formatZodMessages(error.message) });
    }

    throw new Error();
  }
}
