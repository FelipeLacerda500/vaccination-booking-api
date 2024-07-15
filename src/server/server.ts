import { app } from './config';
import { env } from '@/env';

const PORT = Number(env.PORT);

app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on PORT: ${PORT}.`);
  });
