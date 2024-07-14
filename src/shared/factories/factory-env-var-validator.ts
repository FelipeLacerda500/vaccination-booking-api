import { ZodEnvVarValidator } from '../validators';

export function factoryEnvVarValidator() {
  return new ZodEnvVarValidator();
}
