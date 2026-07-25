import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import ResponsiveScrollView from "@/src/components/layout/ResponsiveScrollView";
import useResponsive from "@/src/hooks/useResponsive";
import { reportService } from "@/src/services/report.service";
import { ActiveMembershipReportItem, AttendanceReportItem, DashboardReport, MonthlyIncomeReportItem, PaymentReportItem, UsersByActivityReportItem } from "@/src/types/report.types";

interface DashboardData {
  dashboard: DashboardReport;
  monthlyIncome: MonthlyIncomeReportItem[];
  usersByActivity: UsersByActivityReportItem[];
  payments: PaymentReportItem[];
  memberships: ActiveMembershipReportItem[];
  attendance: AttendanceReportItem[];
  expiringMemberships: unknown[];
}

export default function AdminOverviewScreen() {
  const { isMobile } = useResponsive();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const [dashboard, monthlyIncome, usersByActivity, payments, memberships, attendance, expiringMemberships] = await Promise.all([
          reportService.getDashboardReport(),
          reportService.getMonthlyIncomeChart(),
          reportService.getUsersByActivity(),
          reportService.getPaymentsReport(),
          reportService.getActiveMembershipsReport(),
          reportService.getAttendanceReport(),
          reportService.getExpiringMembershipsReport(),
        ]);
        setData({ dashboard, monthlyIncome, usersByActivity, payments, memberships, attendance, expiringMemberships });
      } catch {
        setData(null);
        setErrorMessage("No fue posible cargar el dashboard administrativo.");
      } finally {
        setLoading(false);
      }
    };
    void loadDashboard();
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#00ff88" /><Text style={styles.loading}>Cargando dashboard...</Text></View>;
  if (errorMessage || !data) return <View style={styles.center}><Text style={styles.error}>{errorMessage || "No disponible"}</Text></View>;

  const { dashboard, monthlyIncome, usersByActivity, payments, memberships, attendance, expiringMemberships } = data;
  const todayAttendance = attendance.filter((item) => isToday(item.checkIn)).length;
  const maxIncome = Math.max(...monthlyIncome.map((item) => item.total), 0);
  return <ResponsiveScrollView contentStyle={[styles.content, isMobile && styles.contentMobile]}>
    <View style={[styles.statsGrid, isMobile && styles.statsGridMobile]}>
      <StatCard title="Total Usuarios" value={String(dashboard.totalClients)} detail="Clientes registrados" icon="people-outline" />
      <StatCard title="Membresías Activas" value={String(dashboard.activeMemberships)} detail="Membresías vigentes" icon="card-outline" />
      <StatCard title="Ingresos del Mes" value={formatCurrency(dashboard.revenueThisMonth)} detail="Ingresos registrados" icon="cash-outline" />
      <StatCard title="Pagos Pendientes" value={String(dashboard.pendingPayments)} detail="Por revisar" icon="alert-circle-outline" />
      <StatCard title="Asistencias Hoy" value={String(todayAttendance)} detail="Entradas registradas" icon="calendar-outline" />
    </View>
    <View style={[styles.row, isMobile && styles.rowMobile]}>
      <View style={[styles.panel, styles.chartPanel]}><Text style={styles.panelTitle}>Ingresos mensuales</Text>
        {monthlyIncome.length === 0 ? <Empty /> : <View style={styles.chart}>{monthlyIncome.map((item) => <View key={item.month} style={styles.chartItem}><View style={[styles.bar, { height: maxIncome === 0 ? 0 : Math.round((item.total / maxIncome) * 120) }]} /><Text style={styles.month}>{item.month}</Text><Text style={styles.month}>{formatCurrency(item.total)}</Text></View>)}</View>}
      </View>
      <View style={styles.panel}><Text style={styles.panelTitle}>Usuarios por actividad</Text>{usersByActivity.length === 0 ? <Empty /> : <View style={styles.list}>{usersByActivity.map((item) => <MetricRow key={item.activity} name={item.activity} value={`${item.total} (${item.percent}%)`} />)}</View>}</View>
      <View style={styles.panel}><Text style={styles.panelTitle}>Estado de membresías</Text><MetricRow name="Activas" value={String(dashboard.activeMemberships)} /><MetricRow name="Por vencer" value={String(expiringMemberships.length)} /><MetricRow name="Pagos pendientes" value={String(dashboard.pendingPayments)} /></View>
    </View>
    <View style={[styles.row, isMobile && styles.rowMobile]}>
      <View style={[styles.panel, styles.widePanel]}><Text style={styles.panelTitle}>Pagos recientes</Text>{payments.length === 0 ? <Empty /> : <View style={styles.list}>{payments.slice(0, 4).map((payment) => <View key={payment.id} style={styles.payment}><View style={styles.paymentIcon}><Ionicons name="cash-outline" size={20} color="#00ff88" /></View><View style={styles.paymentInfo}><Text style={styles.white}>{payment.membership.client.firstName} {payment.membership.client.lastName}</Text><Text style={styles.muted}>{formatCurrency(payment.amount)} · {payment.paymentMethod}</Text></View><Text style={styles.muted}>{payment.status}</Text></View>)}</View>}</View>
      <View style={styles.panel}><Text style={styles.panelTitle}>Membresías activas</Text>{memberships.length === 0 ? <Empty /> : <View style={styles.list}>{memberships.slice(0, 5).map((membership) => <MetricRow key={membership.id} name={membership.plan.name} value={`${membership.client.firstName} ${membership.client.lastName} · ${membership.status}`} />)}</View>}</View>
    </View>
  </ResponsiveScrollView>;
}

function StatCard({ title, value, detail, icon }: { title: string; value: string; detail: string; icon: keyof typeof Ionicons.glyphMap }) { return <View style={styles.statCard}><View style={styles.cardHeader}><Text style={styles.statTitle}>{title}</Text><Ionicons name={icon} size={22} color="#00ff88" /></View><Text style={styles.statValue}>{value}</Text><Text style={styles.detail}>{detail}</Text></View>; }
function MetricRow({ name, value }: { name: string; value: string }) { return <View style={styles.metric}><Text style={styles.white}>{name}</Text><Text style={styles.muted}>{value}</Text></View>; }
function Empty() { return <Text style={styles.muted}>Sin datos disponibles.</Text>; }
function formatCurrency(value: number | string) { return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(Number(value)); }
function isToday(value: string) { const date = new Date(value); const today = new Date(); return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(); }

const styles = StyleSheet.create({
  content: { maxWidth: 1120, alignSelf: "center" }, contentMobile: {}, center: { flex: 1, backgroundColor: "#0b0b0b", justifyContent: "center", alignItems: "center", gap: 12, padding: 24 }, loading: { color: "#00ff88", fontSize: 16, fontWeight: "700" }, error: { color: "#ff6666", fontSize: 16, textAlign: "center" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginBottom: 14 }, statsGridMobile: { gap: 10 }, statCard: { flexGrow: 1, flexBasis: 180, backgroundColor: "#151515", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 16, padding: 16 }, cardHeader: { flexDirection: "row", justifyContent: "space-between", gap: 8 }, statTitle: { flex: 1, color: "#b8c2cc", fontWeight: "800" }, statValue: { color: "#fff", fontSize: 28, fontWeight: "900", marginTop: 16 }, detail: { color: "#00ff88", marginTop: 6, fontSize: 13, fontWeight: "700" },
  row: { flexDirection: "row", gap: 14, marginBottom: 14 }, rowMobile: { flexDirection: "column" }, panel: { flex: 1, minWidth: 0, backgroundColor: "#151515", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 16, padding: 18 }, chartPanel: { flex: 1.3 }, widePanel: { flex: 1.2 }, panelTitle: { color: "#fff", fontSize: 19, fontWeight: "900", marginBottom: 18 }, list: { gap: 10 }, metric: { borderBottomWidth: 1, borderBottomColor: "#242424", paddingBottom: 10, gap: 4 }, white: { color: "#fff", fontWeight: "800" }, muted: { color: "#b8c2cc" },
  chart: { minHeight: 180, flexDirection: "row", alignItems: "flex-end", gap: 8, borderTopWidth: 1, borderTopColor: "#242424", paddingTop: 14 }, chartItem: { flex: 1, alignItems: "center", gap: 5 }, bar: { width: "70%", maxWidth: 42, backgroundColor: "#00ff88", borderRadius: 6 }, month: { color: "#b8c2cc", textAlign: "center", fontSize: 11 }, payment: { flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: "#242424", paddingBottom: 12 }, paymentIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#064b2b", alignItems: "center", justifyContent: "center" }, paymentInfo: { flex: 1, gap: 3 },
});
