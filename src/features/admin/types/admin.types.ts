export type AdminTab =
  | "Dashboard"
  | "Usuarios"
  | "Membresías"
  | "Horarios"
  | "Inventario"
  | "Configuración";

export interface AdminDashboardStats {
  totalUsers: number;
  activeMemberships: number;
  monthlyIncome: number;
  newUsers: number;
}

export interface MonthlyIncome {
  month: string;
  revenue: number;
}

export interface MembershipDistribution {
  plan: string;
  total: number;
}

export interface RecentActivity {
  id: string;
  userName: string;
  action: string;
  detail: string;
  createdAt: string;
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  monthlyIncome: MonthlyIncome[];
  membershipDistribution: MembershipDistribution[];
  recentActivity: RecentActivity[];
}
