export class ValidationError extends Error {
  constructor(message: string = 'The provided data is invalid.') {
    super(message);
  }
}
