export type PersonalRecordUnit = "KG" | "LB";

export interface PersonalRecord {
  exercise: string;
  weight: number;
  unit: PersonalRecordUnit;
}

export interface PersonalRecordBest extends PersonalRecord {
  recordedAt: string;
}

export interface CreatePersonalRecordPayload extends PersonalRecord {
  notes?: string;
}

export interface UpdatePersonalRecordPayload {
  exercise?: string;
  weight?: number;
  unit?: PersonalRecordUnit;
  notes?: string;
}

export type PersonalRecordListResponse = PersonalRecord[];
export type PersonalRecordBestListResponse = PersonalRecordBest[];
