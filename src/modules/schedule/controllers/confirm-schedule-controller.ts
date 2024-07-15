/* eslint-disable camelcase, @typescript-eslint/no-explicit-any */

import { factoryConfirmScheduleUseCase } from '../factories/use-cases';
import { factoryZodConfirmScheduleValidator } from '../factories/validators';
import { NotFoundError } from '@/shared/errors';
import { ApiReply, ApiRequest } from '@/server/types';
import { formatZodMessages } from '@/shared/helpers';

export async function confirmScheduleController(
  request: ApiRequest,
  reply: ApiReply,
) {
  const scheduleValidator = factoryZodConfirmScheduleValidator();

  try {
    const { id } = scheduleValidator.validate({
      id: (request.params as any).id,
    });

    const confirmScheduleUseCase = factoryConfirmScheduleUseCase();

    await confirmScheduleUseCase.execute({ id });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply
        .status(404)
        .send({ message: formatZodMessages(error.message) });
    }

    throw new Error();
  }

  return reply.status(200).send({});
}
