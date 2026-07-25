export type ClassStatus = "ACTIVE" | "INACTIVE" | "CANCELLED";

export interface ClassActivity {
  id: string;
  name: string;
}

export interface ClassReservation {
  id: string;
  status?: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface GymClass {
  id: string;
  name: string;
  description?: string | null;
  capacity: number;
  startTime: string;
  endTime: string;
  instructorName: string;
  activity?: ClassActivity | null;
  status?: ClassStatus;
  _count?: { reservations: number };
  reservationsCount: number;
  availableSpots: number;
}

export interface ClassDetails extends GymClass {
  reservations?: ClassReservation[];
}

export interface CreateClassPayload {
  name: string;
  description?: string;
  capacity: number;
  startTime: string;
  endTime: string;
  instructorName: string;
  activityId?: string | null;
}

export interface UpdateClassPayload {
  name?: string;
  description?: string;
  capacity?: number;
  startTime?: string;
  endTime?: string;
  instructorName?: string;
  activityId?: string | null;
  status?: ClassStatus;
}

export interface GetClassScheduleParams {
  date?: string;
}

export interface ClassForm {
  name: string;
  description: string;
  activityId: string | null;
  date: string;
  startTime: string;
  endTime: string;
  instructorName: string;
  capacity: string;
}

export const emptyClassForm: ClassForm = {
  name: "",
  description: "",
  activityId: null,
  date: new Date().toISOString().slice(0, 10),
  startTime: "",
  endTime: "",
  instructorName: "",
  capacity: "",
};
