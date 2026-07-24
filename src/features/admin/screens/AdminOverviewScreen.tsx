import useResponsive from "@/src/hooks/useResponsive";
import { authService } from "@/src/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type DashboardData = {
  totalActiveClients: number;
  totalActiveMemberships: number;
  monthlyRevenue: number;
  todayAttendance: number;
  pendingPayments: number;
  expiringMemberships: number;
};

export default function AdminOverviewScreen() {
  const { isMobile } = useResponsive();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<any[]>([]);
  const [usersByActivity, setUsersByActivity] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [
        dashboardResult,
        monthlyIncomeResult,
        usersByActivityResult,
        paymentsResult,
        membershipsResult,
      ] = await Promise.allSettled([
        authService.getDashboardReport(),
        authService.getMonthlyIncome(),
        authService.getUsersByActivity(),
        authService.getPaymentsReport(),
        authService.getActiveMembershipsReport(),
      ]);

      if (dashboardResult.status === "fulfilled") {
        setDashboard(dashboardResult.value);
      }

      if (monthlyIncomeResult.status === "fulfilled") {
        setMonthlyIncome(
          Array.isArray(monthlyIncomeResult.value)
            ? monthlyIncomeResult.value
            : monthlyIncomeResult.value?.data || [],
        );
      }

      if (usersByActivityResult.status === "fulfilled") {
        setUsersByActivity(
          Array.isArray(usersByActivityResult.value)
            ? usersByActivityResult.value
            : usersByActivityResult.value?.data || [],
        );
      }

      if (paymentsResult.status === "fulfilled") {
        setPayments(
          Array.isArray(paymentsResult.value)
            ? paymentsResult.value
            : paymentsResult.value?.data || [],
        );
      }

      if (membershipsResult.status === "fulfilled") {
        setMemberships(
          Array.isArray(membershipsResult.value)
            ? membershipsResult.value
            : membershipsResult.value?.data || [],
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "No se pudo cargar el dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = dashboard?.totalActiveClients ?? 0;
  const activeMemberships = dashboard?.totalActiveMemberships ?? 0;
  const monthlyRevenue = dashboard?.monthlyRevenue ?? 0;
  const todayAttendance = dashboard?.todayAttendance ?? 0;
  const pendingPayments = dashboard?.pendingPayments ?? 0;
  const expiringMemberships = dashboard?.expiringMemberships ?? 0;

  const recentPayments = payments.slice(0, 4);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando dashboard...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>✕ {errorMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: isMobile ? 110 : 30,
      }}
    >
      <View style={[styles.statsGrid, isMobile && styles.statsGridMobile]}>
        <StatCard
          title="Total Usuarios"
          value={String(totalUsers)}
          detail="Clientes activos"
          icon="people-outline"
          active
          isMobile={isMobile}
        />
        <StatCard
          title="Membresías Activas"
          value={String(activeMemberships)}
          detail="Membresías vigentes"
          icon="card-outline"
          isMobile={isMobile}
        />
        <StatCard
          title="Ingresos del Mes"
          value={`$${Number(monthlyRevenue).toLocaleString()}`}
          detail="Ingresos reales"
          icon="cash-outline"
          isMobile={isMobile}
        />
        <StatCard
          title="Pagos Pendientes"
          value={String(pendingPayments)}
          detail="Por revisar"
          icon="alert-circle-outline"
          isMobile={isMobile}
        />
        <StatCard
          title="Asistencias Hoy"
          value={String(todayAttendance)}
          detail="Entradas registradas"
          icon="calendar-outline"
          isMobile={isMobile}
        />
      </View>
      <View
        style={[
          styles.row,
          isMobile && {
            flexDirection: "column",
          },
        ]}
      >
        <View
          style={[
            styles.panel,
            {
              flex: isMobile ? undefined : 1.4,
              width: isMobile ? "100%" : undefined,
            },
          ]}
        >
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>↗ Ingresos Mensuales</Text>
            <Text style={styles.green}>API</Text>
          </View>
          <Text style={styles.bigValue}>
            ${Number(monthlyRevenue).toLocaleString()}
          </Text>
          <Text style={styles.muted}>Ingresos del mes actual</Text>
          <View style={styles.fakeChart}>
            {(monthlyIncome.length > 0
              ? monthlyIncome
              : [
                  { month: "Ene", total: 0 },
                  { month: "Feb", total: 0 },
                  { month: "Mar", total: 0 },
                  { month: "Abr", total: 0 },
                  { month: "May", total: monthlyRevenue },
                ]
            ).map((item, index) => {
              const label = item.month || item.name || `M${index + 1}`;
              const value = Number(
                item.total || item.amount || item.revenue || 0,
              );
              const height = Math.max(25, Math.min(120, value / 100));

              return (
                <View key={`${label}-${index}`} style={styles.chartItem}>
                  <View style={[styles.bar, { height }]} />
                  <Text style={styles.month}>{label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={[
            styles.panel,
            {
              flex: isMobile ? undefined : 1,
              width: isMobile ? "100%" : undefined,
            },
          ]}
        >
          <Text style={styles.panelTitle}>▭ Distribución de Membresías</Text>
          <View style={styles.membershipList}>
            {usersByActivity.length === 0 ? (
              <Text style={styles.muted}>Sin datos disponibles</Text>
            ) : (
              usersByActivity
                .slice(0, 6)
                .map((item, index) => (
                  <Membership
                    key={index}
                    name={
                      item.activity || item.name || item.plan || "Actividad"
                    }
                    value={String(item.total || item.count || item.users || 0)}
                    percent={`${item.percent || item.percentage || 0}%`}
                  />
                ))
            )}
          </View>
        </View>
        <View
          style={[
            styles.panel,
            {
              flex: isMobile ? undefined : 0.9,
              width: isMobile ? "100%" : undefined,
            },
          ]}
        >
          <Text style={styles.panelTitle}>Estado de Membresías</Text>
          <Status
            label="Activas"
            value={String(activeMemberships)}
            type="active"
          />
          <Status
            label="Por vencer"
            value={String(expiringMemberships)}
            type="warning"
          />
          <Status
            label="Pagos pendientes"
            value={String(pendingPayments)}
            type="danger"
          />
          <View style={styles.totalRow}>
            <Text style={styles.white}>Total</Text>
            <Text style={styles.white}>{activeMemberships}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.row,
          isMobile && {
            flexDirection: "column",
          },
        ]}
      >
        <View style={[styles.panel, { flex: 1.2 }]}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Actividad Reciente</Text>
            <Text style={styles.green}>API</Text>
          </View>

          {recentPayments.length === 0 ? (
            <>
              <Activity
                name="Dashboard conectado"
                detail="Los datos principales ya vienen desde la API"
                time="Ahora"
                icon="checkmark-circle-outline"
              />

              <Activity
                name="Membresías por vencer"
                detail={`${expiringMemberships} clientes próximos a renovar`}
                time="Hoy"
                icon="time-outline"
              />
            </>
          ) : (
            recentPayments.map((payment, index) => (
              <Activity
                key={payment.id || index}
                name={
                  payment.client?.firstName ||
                  payment.clientName ||
                  "Pago registrado"
                }
                detail={`$${payment.amount || 0} • ${payment.paymentMethod || "Método"}`}
                time={payment.status || "Registrado"}
                icon="cash-outline"
              />
            ))
          )}
        </View>
        <View style={[styles.panel, { flex: 0.9 }]}>
          <Text style={styles.panelTitle}>Membresías Activas</Text>

          {memberships.length === 0 ? (
            <Text style={styles.muted}>Sin membresías activas.</Text>
          ) : (
            memberships
              .slice(0, 5)
              .map((item, index) => (
                <Popular
                  key={item.id || index}
                  index={String(index + 1)}
                  name={item.plan?.name || item.name || "Membresía"}
                  reservations={`${item.client?.firstName || "Cliente"} ${
                    item.client?.lastName || ""
                  }`}
                  percent={item.status || "ACTIVE"}
                />
              ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ title, value, detail, icon, active, isMobile }: any) {
  return (
    <View
      style={[
        styles.statCard,
        active && styles.statActive,
        isMobile && styles.statCardMobile,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <Ionicons name={icon} size={isMobile ? 20 : 24} color="#00ff88" />
      </View>

      <Text style={[styles.statValue, isMobile && styles.statValueMobile]}>
        {value}
      </Text>
      <Text style={styles.statDetail}>{detail}</Text>
    </View>
  );
}

function Membership({ name, value, percent }: any) {
  return (
    <View style={styles.membershipRow}>
      <View>
        <Text style={styles.white}>{name}</Text>
        <Text style={styles.muted}>
          {value} ({percent})
        </Text>
      </View>
    </View>
  );
}

function Status({ label, value, type }: any) {
  const color =
    type === "active" ? "#00ff88" : type === "warning" ? "#facc15" : "#ff4444";

  return (
    <View style={styles.statusRow}>
      <Text style={[styles.white, { color }]}>{label}</Text>

      <Text style={styles.white}>{value}</Text>
    </View>
  );
}

function Activity({ name, detail, time, icon }: any) {
  return (
    <View style={styles.activity}>
      <View style={styles.activityIcon}>
        <Ionicons name={icon} size={22} color="#00ff88" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.whiteBold}>{name}</Text>
        <Text style={styles.muted}>{detail}</Text>
      </View>

      <Text style={styles.muted}>{time}</Text>
    </View>
  );
}

function Popular({ index, name, reservations, percent }: any) {
  return (
    <View style={styles.popular}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{index}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.whiteBold}>{name}</Text>
        <Text style={styles.muted}>{reservations}</Text>

        <View style={styles.progress}>
          <View style={[styles.progressFill, { width: "70%" }]} />
        </View>
      </View>

      <Text style={styles.white}>{percent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 24 },

  loading: { color: "#00ff88", fontSize: 18, fontWeight: "900" },
  error: { color: "#ff6666", fontSize: 18, fontWeight: "900" },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 18,
  },

  statsGridMobile: {
    gap: 10,
  },

  statCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 20,
  },

  statCardMobile: {
    flex: undefined,
    minWidth: 0,
    width: "48%",
    padding: 14,
  },

  statActive: {
    backgroundColor: "#06351f",
    borderColor: "#087a49",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statTitle: { color: "#b8c2cc", fontWeight: "800" },

  statValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 18,
  },

  statValueMobile: {
    fontSize: 24,
    marginTop: 10,
  },

  statDetail: {
    color: "#00ff88",
    marginTop: 6,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    marginBottom: 18,
  },

  panel: {
    minWidth: 300,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 22,
  },

  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  panelTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 18,
  },

  green: { color: "#00ff88", fontWeight: "900" },

  bigValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
  },

  muted: { color: "#b8c2cc" },
  white: { color: "#fff", fontWeight: "900" },
  whiteBold: { color: "#fff", fontWeight: "900" },

  fakeChart: {
    minHeight: 180,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#242424",
    paddingTop: 20,
  },

  chartItem: { flex: 1, alignItems: "center" },

  bar: {
    width: "70%",
    backgroundColor: "#00ff88",
    borderRadius: 8,
  },

  month: { color: "#b8c2cc", marginTop: 8, fontSize: 12 },

  membershipList: { gap: 18, marginTop: 8 },

  membershipRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#242424",
    paddingBottom: 12,
  },

  statusRow: {
    height: 64,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalRow: {
    height: 50,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  activity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242424",
  },

  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#064b2b",
    justifyContent: "center",
    alignItems: "center",
  },

  popular: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
  },

  circle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#00ff88",
    justifyContent: "center",
    alignItems: "center",
  },

  circleText: { color: "#000", fontWeight: "900" },

  progress: {
    height: 6,
    backgroundColor: "#2a2a2a",
    borderRadius: 999,
    marginTop: 8,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#00ff88",
  },
});
