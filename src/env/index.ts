import 'dotenv/config';
import { factoryEnvVarValidator } from '@/shared/factories';

const envValidator = factoryEnvVarValidator();

const _env = envValidator.validate({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3333,
});

export const env = _env;
