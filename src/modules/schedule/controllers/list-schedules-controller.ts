/* eslint-disable camelcase */

import { factoryListSchedulesUseCase } from '../factories/use-cases';
import { factoryZodListSchedulesValidator } from '../factories/validators';
import { ValidationError } from '@/shared/errors';
import { ApiReply, ApiRequest } from '@/server/types';
import { formatZodMessages } from '@/shared/helpers/zod-helper';

export async function listSchedulesController(
  request: ApiRequest,
  reply: ApiReply,
) {
  const scheduleValidator = factoryZodListSchedulesValidator();

  try {
    const { page } = scheduleValidator.validate(request.query);

    const listSchedulesUseCase = factoryListSchedulesUseCase();
    const schedulesList = await listSchedulesUseCase.execute({
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
