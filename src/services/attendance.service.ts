import {
  Attendance,
  AttendanceListResponse,
  CheckInPayload,
} from "@/src/types/attendance.types";

import { api } from "./api";

export const attendanceService = {
  async checkIn(payload: CheckInPayload = {}): Promise<Attendance> {
    const response = await api.post("/attendance/check-in", payload);
    return response.data.data;
  },

  async getAttendances(): Promise<AttendanceListResponse> {
    const response = await api.get("/attendance");
    return response.data.data;
  },

};
