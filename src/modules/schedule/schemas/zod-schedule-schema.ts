import { factoryDayHelper } from '@/shared/factories';
import { z } from 'zod';

export const scheduleBodySchema = z.object({
  id: z
    .string({ message: 'ID deve ser uma string.' })
    .uuid({ message: 'ID deve ser um UUID válido.' })
    .optional(),
  patientName: z
    .string({ message: 'O nome do paciente deve ser uma string.' })
    .min(1)
    .optional(),
});
