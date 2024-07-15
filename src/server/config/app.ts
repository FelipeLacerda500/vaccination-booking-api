/*eslint-disable import/no-named-as-default*/

import { appRoutes } from '../routes';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { ValidationError } from '@/shared/errors';

export const app = fastify();

app.register(cors);
app.register(appRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ValidationError) {
    return reply.status(400).send({ message: error.message });
  }

  return reply
    .status(500)
    .send({ message: ['[Server: Internal server error.]'] });
});
