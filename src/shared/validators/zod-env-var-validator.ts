import { IValidation } from '../protocols';
import { formatZodErrors } from '../helpers';
import { envVarSchema } from '../schemas';
import { ValidationError } from '../errors';

type EnvVar = { NODE_ENV: string; PORT: string | number };

export class ZodEnvVarValidator implements IValidation<EnvVar> {
  validate(input: unknown): EnvVar {
    const parsedEnvVar = envVarSchema.safeParse(input);

    if (!parsedEnvVar.success) {
      console.error('Invalid environment variables.');
      throw new ValidationError(formatZodErrors(parsedEnvVar.error.issues));
    }

    const { NODE_ENV, PORT } = parsedEnvVar.data;

    return { NODE_ENV, PORT };
  }
}
