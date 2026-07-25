export interface AttendanceClient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface AttendanceActivity {
  id: string;
  name: string;
}

export interface Attendance {
  id: string;
  clientId: string;
  activityId?: string | null;
  checkIn: string;
  createdAt?: string;
  client?: AttendanceClient;
  activity?: AttendanceActivity | null;
}

export interface CheckInPayload {
  clientId?: string;
  activityId?: string | null;
  checkIn?: string;
}

export interface AttendancePaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AttendanceListResponse {
  data: Attendance[];
  meta: AttendancePaginationMeta;
}
