import { api } from "./api";
import {
  ActiveMembershipReportItem,
  AttendanceReportItem,
  DashboardReport,
  MonthlyIncomeReportItem,
  PaymentReportItem,
  UsersByActivityReportItem,
} from "@/src/types/report.types";

export const reportService = {
  async getDashboardReport(): Promise<DashboardReport> {
    const response = await api.get("/reports/dashboard");
    return response.data.data;
  },

  async getMonthlyIncomeChart(): Promise<MonthlyIncomeReportItem[]> {
    const response = await api.get("/reports/monthly-income-chart");
    return response.data.data;
  },

  async getUsersByActivity(): Promise<UsersByActivityReportItem[]> {
    const response = await api.get("/reports/users-by-activity");
    return response.data.data;
  },

  async getPaymentsReport(): Promise<PaymentReportItem[]> {
    const response = await api.get("/reports/payments");
    return response.data.data;
  },

  async getActiveMembershipsReport(): Promise<ActiveMembershipReportItem[]> {
    const response = await api.get("/reports/active-memberships");
    return response.data.data;
  },

  async getAttendanceReport(): Promise<AttendanceReportItem[]> {
    const response = await api.get("/reports/attendance");
    return response.data.data;
  },

  async getExpiringMembershipsReport(): Promise<unknown[]> {
    const response = await api.get("/reports/expiring-memberships");
    return response.data.data;
  },
};
