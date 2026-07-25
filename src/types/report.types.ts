export interface DashboardReport {
  totalClients: number;
  activeMemberships: number;
  revenueThisMonth: number;
  pendingPayments: number;
}

export interface AttendanceReportItem {
  checkIn: string;
}

export interface MonthlyIncomeReportItem {
  month: string;
  total: number;
}

export interface UsersByActivityReportItem {
  activity: string;
  total: number;
  percent: number;
}

export interface PaymentReportItem {
  id: string;
  amount: string;
  paymentMethod: string;
  status: string;
  membership: {
    client: { firstName: string; lastName: string };
  };
}

export interface ActiveMembershipReportItem {
  id: string;
  status: string;
  plan: { name: string };
  client: { firstName: string; lastName: string };
}
