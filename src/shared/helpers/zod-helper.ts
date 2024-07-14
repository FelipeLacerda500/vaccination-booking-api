import { ZodIssue } from 'zod';

export function formatZodErrors(zodErrors: ZodIssue[]): string {
  const errors = zodErrors
    .map((e) => `\n[${e.path[0]}: ${e.message}]`)
    .join('');

  return errors;
}

export function formatZodMessages(message: string): string[] {
  const rawMessages = message
    .trim()
    .replace(/^\n+|\n+$/g, '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  const formattedMessages = rawMessages.map((item) => item.trim());
  return formattedMessages;
}
