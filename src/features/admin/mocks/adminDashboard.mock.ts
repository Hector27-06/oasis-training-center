import { AdminDashboardData } from "@/src/features/admin/types/admin.types";

export const adminDashboardMock: AdminDashboardData = {
  stats: {
    totalUsers: 248,
    activeMemberships: 186,
    monthlyIncome: 24580,
    newUsers: 12,
  },

  monthlyIncome: [
    {
      month: "Ene",
      revenue: 18000,
    },
    {
      month: "Feb",
      revenue: 21500,
    },
    {
      month: "Mar",
      revenue: 19800,
    },
    {
      month: "Abr",
      revenue: 23400,
    },
    {
      month: "May",
      revenue: 25500,
    },
  ],

  membershipDistribution: [
    {
      plan: "CrossFit Unlimited",
      total: 100,
    },
    {
      plan: "Hyrox Training",
      total: 45,
    },
    {
      plan: "Calistenia",
      total: 32,
    },
    {
      plan: "Open Box",
      total: 12,
    },
  ],

  recentActivity: [
    {
      id: "activity-001",
      userName: "María González",
      action: "Nueva membresía",
      detail: "CrossFit Unlimited",
      createdAt: "Hace 5 min",
    },
    {
      id: "activity-002",
      userName: "Carlos Ruiz",
      action: "Pago registrado",
      detail: "$120 efectivo",
      createdAt: "Hace 20 min",
    },
    {
      id: "activity-003",
      userName: "Ana López",
      action: "Reservación creada",
      detail: "Hyrox Training",
      createdAt: "Hace 1 hora",
    },
  ],
};
