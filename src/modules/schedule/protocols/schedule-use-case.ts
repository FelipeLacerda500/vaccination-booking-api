/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IScheduleUseCase<T = any> {
  execute(data: unknown): Promise<T>;
}
