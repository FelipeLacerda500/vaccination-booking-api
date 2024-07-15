/* eslint-disable require-await, arrow-body-style */

import { FastifyInstance } from 'fastify';
import {
  createScheduleController,
  listSchedulesController,
  confirmScheduleController,
  fetchSchedulesController,
} from '@/modules/schedule/controllers';

export async function appRoutes(app: FastifyInstance) {
  app.post('/schedules', createScheduleController);
  app.get('/schedules', listSchedulesController);
  app.get('/schedules/search', fetchSchedulesController);
  app.patch('/schedules/confirm/:id', confirmScheduleController);
}
