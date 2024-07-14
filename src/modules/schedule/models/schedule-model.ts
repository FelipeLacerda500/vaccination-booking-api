export type Schedule = {
  id?: string;
  patient_name: string;
  patient_birth_date: Date;
  schedule_date: Date;
  realized?: boolean;
};
