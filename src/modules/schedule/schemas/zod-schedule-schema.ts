/*eslint-disable arrow-body-style */

import { factoryDateHelper } from '@/shared/factories';
import { z } from 'zod';

const dateHelper = factoryDateHelper();
const START_RANGE_HOUR = 8;
const END_RANGE_HOUR = 18;

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
  scheduleDate: z
    .string({ message: 'A data do agendamento deve ser uma string.' })
    .datetime({
      message: 'A data do agendamento deve ser uma data válida.',
    })
    .refine(
      (date) => {
        const providedScheduleDate = new Date(date);

        if (
          !dateHelper.hasZeroMinutesAndSeconds(providedScheduleDate) ||
          !dateHelper.isFutureDate(providedScheduleDate) ||
          !dateHelper.isTimeInRange(
            providedScheduleDate,
            START_RANGE_HOUR,
            END_RANGE_HOUR,
          )
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          'Sobre o agendamento, a data deve ser futura, o horário deve ser em ponto e estar entre 8h às 18h.',
      },
    )
    .transform((date) => dateHelper.convertToUtc(date))
    .optional(),
});
