/*eslint-disable arrow-body-style */

import { factoryDateHelper } from '@/shared/factories';
import { z } from 'zod';

const dateHelper = factoryDateHelper();

export const scheduleBodySchema = z.object({
  id: z
    .string({ message: 'ID deve ser uma string.' })
    .uuid({ message: 'ID deve ser um UUID válido.' })
    .optional(),
  patientName: z
    .string({ message: 'O nome do paciente deve ser uma string.' })
    .min(1)
    .optional(),
  patientBirthDate: z
    .string({
      message: 'A data de nascimento fornecida deve ser uma string.',
    })
    .datetime({
      message: 'A data de nascimento do paciente deve ser uma data válida.',
    })
    .refine(
      (date) => {
        return !dateHelper.isFutureDate(new Date(date));
      },
      {
        message:
          'A data de nascimento do paciente não pode ser uma data futura.',
      },
    )
    .transform((date) => dateHelper.convertToUtc(date))
    .optional(),
});
