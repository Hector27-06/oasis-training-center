import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { classService } from "@/src/services/class.service";
import { ClientDashboardStats, clientService } from "@/src/services/client.service";
import { membershipService } from "@/src/services/membership.service";
import { personalRecordService } from "@/src/services/personal-record.service";
import { reservationService } from "@/src/services/reservation.service";
import { useAuthStore } from "@/src/store/auth.store";
import { GymClass } from "@/src/types/class.types";
import { Membership } from "@/src/types/membership.types";
import { PersonalRecordBest } from "@/src/types/personal-record.types";
import { Reservation, ReservationClass } from "@/src/types/reservation.types";

type TabType = "Resumen" | "Calendario" | "PRs";

interface Props {
  userName: string;
}

interface DashboardData {
  membership: Membership | null;
  stats: ClientDashboardStats | null;
  reservations: Reservation[] | null;
  classes: GymClass[] | null;
  personalRecords: PersonalRecordBest[] | null;
}

interface DashboardErrors {
  membership?: string;
  stats?: string;
  reservations?: string;
  classes?: string;
  personalRecords?: string;
}

type ReservedClass = ReservationClass | GymClass;

export default function UserDashboardOverview({ userName }: Props) {
  const clientId = useAuthStore((state) => state.user?.client?.id);
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState<TabType>("Resumen");
  const [data, setData] = useState<DashboardData | null>(null);
  const [errors, setErrors] = useState<DashboardErrors>({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!clientId) {
      setErrorMessage("No se encontró el perfil de cliente para cargar el dashboard.");
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const membership = await loadOptional("/memberships/my", () => membershipService.getMyMembership());
        const stats = await loadOptional("/clients/me/stats", () => clientService.getMyDashboardStats());
        const reservations = await loadOptional(
          `/reservations/client/${clientId}`,
          () => reservationService.getClientReservations(clientId),
        );
        const classes = await loadOptional("/classes/schedule", () => classService.getSchedule());
        const personalRecords = await loadOptional(
          "/personal-records/my/best",
          () => personalRecordService.getMyBestPersonalRecords(),
        );

        setData({
          membership: membership.value,
          stats: stats.value,
          reservations: reservations.value,
          classes: classes.value,
          personalRecords: personalRecords.value,
        });
        setErrors({
          ...(membership.error ? { membership: membership.error } : {}),
          ...(stats.error ? { stats: stats.error } : {}),
          ...(reservations.error ? { reservations: reservations.error } : {}),
          ...(classes.error ? { classes: classes.error } : {}),
          ...(personalRecords.error ? { personalRecords: personalRecords.error } : {}),
        });
      } catch {
        setErrorMessage("No fue posible preparar el dashboard.");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, [clientId]);

  const reservations = useMemo(() => getReservedClasses(data), [data]);
  const classesThisMonth = data?.stats?.classesThisMonth;
  const streakDays = data?.stats?.currentStreak;

  return (
    <>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>Hola, {userName}</Text>
        <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Consulta tu actividad de entrenamiento</Text>
      </View>

      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsMobileScroll} contentContainerStyle={styles.tabsMobile}>
          <TabButton label="Resumen" icon="pulse-outline" active={activeTab === "Resumen"} onPress={() => setActiveTab("Resumen")} />
          <TabButton label="Calendario" icon="calendar-outline" active={activeTab === "Calendario"} onPress={() => setActiveTab("Calendario")} />
          <TabButton label="PRs & Benchmarks" icon="trophy-outline" active={activeTab === "PRs"} onPress={() => setActiveTab("PRs")} />
        </ScrollView>
      ) : (
        <View style={styles.tabs}>
          <TabButton label="Resumen" icon="pulse-outline" active={activeTab === "Resumen"} onPress={() => setActiveTab("Resumen")} />
          <TabButton label="Calendario" icon="calendar-outline" active={activeTab === "Calendario"} onPress={() => setActiveTab("Calendario")} />
          <TabButton label="PRs & Benchmarks" icon="trophy-outline" active={activeTab === "PRs"} onPress={() => setActiveTab("PRs")} />
        </View>
      )}

      {loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!loading && !errorMessage && data ? (
        <>
          {activeTab === "Resumen" ? <SummaryContent data={data} errors={errors} classesThisMonth={classesThisMonth} streakDays={streakDays} reservations={reservations} /> : null}
          {activeTab === "Calendario" ? <ReservationsContent reservations={reservations} error={getReservationsError(data, errors)} /> : null}
          {activeTab === "PRs" ? <PersonalRecordsContent records={data.personalRecords} error={errors.personalRecords} /> : null}
        </>
      ) : null}
    </>
  );
}

function SummaryContent({ data, errors, classesThisMonth, streakDays, reservations }: { data: DashboardData; errors: DashboardErrors; classesThisMonth: number | undefined; streakDays: number | undefined; reservations: ReservedClass[] }) {
  return (
    <>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Membresía</Text>
        {errors.membership ? <RequestError message={errors.membership} /> : data.membership ? (
          <View style={styles.membershipCard}>
            <View>
              <Text style={styles.membershipTitle}>{data.membership.plan.name}</Text>
              <Text style={styles.membershipSubtitle}>{data.membership.status}</Text>
              <Text style={styles.membershipText}>Vence: {formatDate(data.membership.endDate)}</Text>
            </View>
            <Ionicons name="checkmark-circle-outline" size={44} color={COLORS.primary} />
          </View>
        ) : <Text style={styles.empty}>No tienes una membresía vigente.</Text>}
      </View>

      <View style={styles.statsGrid}>
        <StatCard title="Clases este mes" value={classesThisMonth === undefined ? "No disponible" : String(classesThisMonth)} icon="calendar-outline" />
        <StatCard title="PRs registrados" value={data.personalRecords ? String(data.personalRecords.length) : "No disponible"} icon="trophy-outline" />
        <StatCard title="Racha actual" value={streakDays === undefined ? "No disponible" : `${streakDays} días`} icon="trending-up-outline" />
      </View>

      {errors.stats ? <RequestError message={errors.stats} /> : null}
      {errors.personalRecords ? <RequestError message={errors.personalRecords} /> : null}
      <ReservationsContent reservations={reservations} error={getReservationsError(data, errors)} title="Próximas clases reservadas" />
    </>
  );
}

function ReservationsContent({ reservations, error, title = "Calendario" }: { reservations: ReservedClass[]; error?: string; title?: string }) {
  return <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {error ? <RequestError message={error} /> : reservations.length === 0 ? <Text style={styles.empty}>No tienes clases reservadas.</Text> : reservations.map((gymClass) => <ClassItem key={gymClass.id} gymClass={gymClass} />)}
  </View>;
}

function PersonalRecordsContent({ records, error }: { records: PersonalRecordBest[] | null; error?: string }) {
  return <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>PRs & Benchmarks</Text>
    {error ? <RequestError message={error} /> : records?.length === 0 ? <Text style={styles.empty}>Aún no tienes PRs registrados.</Text> : records?.map((record) => <View key={`${record.exercise}-${record.recordedAt}`} style={styles.classItem}>
      <View style={styles.classIcon}><Ionicons name="trophy-outline" size={24} color={COLORS.primary} /></View>
      <View style={styles.itemInfo}><Text style={styles.classTitle}>{record.exercise}</Text><Text style={styles.classText}>{formatDate(record.recordedAt)}</Text></View>
      <Text style={styles.value}>{record.weight} {record.unit}</Text>
    </View>)}
  </View>;
}

function ClassItem({ gymClass }: { gymClass: ReservedClass }) {
  return <View style={styles.classItem}>
    <View style={styles.classIcon}><Ionicons name="calendar-outline" size={24} color={COLORS.primary} /></View>
    <View style={styles.itemInfo}><Text style={styles.classTitle}>{gymClass.name}</Text><Text style={styles.classText}>{formatDateTime(gymClass.startTime)} · {gymClass.instructorName}</Text></View>
  </View>;
}

function TabButton({ label, icon, active, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}><Ionicons name={icon} size={20} color={active ? COLORS.primary : COLORS.textSecondary} /><Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text></Pressable>;
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return <View style={styles.statCard}><View style={styles.statTop}><Text style={styles.statTitle}>{title}</Text><Ionicons name={icon} size={22} color={COLORS.primary} /></View><Text style={styles.statValue}>{value}</Text></View>;
}

function getReservedClasses(data: DashboardData | null): ReservedClass[] {
  if (!data?.reservations) return [];
  const classesById = new Map(data.classes?.map((gymClass) => [gymClass.id, gymClass]) ?? []);
  return data.reservations
    .map((reservation) => reservation.class ?? classesById.get(reservation.classId))
    .filter((gymClass): gymClass is ReservedClass => gymClass !== undefined)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

function getReservationsError(data: DashboardData, errors: DashboardErrors) {
  if (errors.reservations) return errors.reservations;
  if (errors.classes && data.reservations?.some((reservation) => !reservation.class)) return errors.classes;
  return undefined;
}

function RequestError({ message }: { message: string }) { return <Text style={styles.error}>{message}</Text>; }

async function loadOptional<T>(endpoint: string, request: () => Promise<T>) {
  try {
    return { value: await request(), error: undefined };
  } catch (error) {
    return { value: null, error: getRequestError(endpoint, error) };
  }
}

function getRequestError(endpoint: string, error: unknown) {
  const apiError = error as { response?: { status?: number; data?: { message?: string } } };
  const status = apiError.response?.status;
  const message = apiError.response?.data?.message;
  return `${endpoint}: ${status ? `HTTP ${status}` : "error de red"}${message ? ` — ${message}` : ""}`;
}

function formatDate(value: string) { return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(value)); }
function formatDateTime(value: string) { return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }

const styles = StyleSheet.create({
  header: { marginBottom: 24 }, headerMobile: { marginBottom: 14 }, title: { color: COLORS.text, fontSize: 34, fontWeight: "800" }, titleMobile: { fontSize: 26, lineHeight: 31 }, subtitle: { color: COLORS.textSecondary, fontSize: 17, marginTop: 8 }, subtitleMobile: { fontSize: 15, marginTop: 4 },
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.border, paddingVertical: 12, marginBottom: 24 }, tabButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 }, tabButtonActive: { backgroundColor: "#075C39" }, tabText: { color: COLORS.textSecondary, fontSize: 15, fontWeight: "700" }, tabTextActive: { color: COLORS.primary },
  tabsMobileScroll: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.border, marginBottom: 16 }, tabsMobile: { gap: 8, paddingVertical: 8, paddingRight: 16 },
  error: { color: COLORS.danger, fontSize: 16 }, sectionCard: { backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 20, marginBottom: 20 }, sectionTitle: { color: COLORS.text, fontSize: 24, fontWeight: "800", marginBottom: 16 }, empty: { color: COLORS.textSecondary, fontSize: 16, paddingVertical: 12 },
  membershipCard: { backgroundColor: "#042F1E", borderWidth: 1, borderColor: COLORS.primary, borderRadius: 16, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, membershipTitle: { color: COLORS.text, fontSize: 22, fontWeight: "800" }, membershipSubtitle: { color: COLORS.primary, fontSize: 16, fontWeight: "700", marginTop: 6 }, membershipText: { color: COLORS.textSecondary, fontSize: 15, marginTop: 12 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 }, statCard: { flexGrow: 1, flexBasis: 180, backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 18 }, statTop: { flexDirection: "row", justifyContent: "space-between", gap: 10 }, statTitle: { flex: 1, color: COLORS.textSecondary, fontSize: 15, fontWeight: "700" }, statValue: { color: COLORS.text, fontSize: 28, fontWeight: "800", marginTop: 16 },
  classItem: { backgroundColor: "#1f1f1f", borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 10 }, classIcon: { width: 46, height: 46, borderRadius: 12, backgroundColor: "#075C39", alignItems: "center", justifyContent: "center" }, itemInfo: { flex: 1 }, classTitle: { color: COLORS.text, fontSize: 17, fontWeight: "800" }, classText: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 }, value: { color: COLORS.primary, fontWeight: "800", fontSize: 16 },
});
