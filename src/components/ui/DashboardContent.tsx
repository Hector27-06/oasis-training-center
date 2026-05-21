import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { MenuItem } from "@/src/constants/menuItems";

interface Props {
  selected: MenuItem;
}

export default function DashboardContent({ selected }: Props) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {selected === "Dashboard" && <Dashboard />}
      {selected === "Clases" && <Clases />}
      {selected === "PRs" && <PRs />}
      {selected === "Membresía" && <Membresia />}
      {selected === "Perfil" && <Perfil />}
    </ScrollView>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

function Dashboard() {
  return (
    <>
      <Header
        title="Hola, Usuario"
        subtitle="Bienvenido a tu centro de entrenamiento"
      />

      <View style={styles.tabs}>
        <Text style={styles.tabActive}>⌁ Resumen</Text>
        <Text style={styles.tab}>▣ Calendario</Text>
        <Text style={styles.tab}>🏆 PRs & Benchmarks</Text>
      </View>

      <View style={styles.membershipBanner}>
        <View>
          <Text style={styles.bannerTitle}>CrossFit Unlimited</Text>
          <Text style={styles.bannerText}>Membresía activa</Text>
          <Text style={styles.bannerMeta}>◷ Vence en 35 días ▣ 2026-06-15</Text>
        </View>
        <Ionicons
          name="checkmark-circle-outline"
          size={44}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.statsRow}>
        <Stat
          title="Clases este mes"
          value="18"
          footer="+3 vs mes anterior"
          icon="calendar-outline"
        />
        <Stat
          title="PRs conseguidos"
          value="7"
          footer="Este mes"
          icon="trophy-outline"
        />
        <Stat
          title="Racha actual"
          value="12 días"
          footer="¡Sigue así!"
          icon="trending-up-outline"
        />
      </View>

      <Section title="Próximas clases reservadas">
        <ListItem
          title="CrossFit WOD"
          subtitle="2026-05-12 • 18:00 • Carlos Ruiz"
          right="Cancelar"
        />
      </Section>
    </>
  );
}

function Clases() {
  const classes = [
    [
      "CrossFit WOD",
      "CrossFit",
      "06:00 (60 min)",
      "Carlos Ruiz",
      "8/12",
      "4 lugares disponibles",
    ],
    [
      "Hyrox Training",
      "Hyrox",
      "07:30 (90 min)",
      "Ana López",
      "12/15",
      "3 lugares disponibles",
    ],
    [
      "Gimnasia & Mobility",
      "Mobility",
      "09:00 (45 min)",
      "Laura Martínez",
      "10/10",
      "Lleno",
    ],
    [
      "Open Box",
      "Open",
      "10:00 (120 min)",
      "-",
      "5/20",
      "15 lugares disponibles",
    ],
    [
      "Calistenia Básica",
      "Calistenia",
      "12:00 (60 min)",
      "Miguel Torres",
      "7/12",
      "5 lugares disponibles",
    ],
  ];

  return (
    <>
      <View style={styles.headerRow}>
        <Header
          title="Reservar Clases"
          subtitle="Selecciona una clase y reserva tu lugar"
        />
        <View style={styles.dateBox}>
          <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
          <Text style={styles.dateText}>12/05/2026</Text>
        </View>
      </View>

      <View style={styles.card}>
        {classes.map((item) => {
          const full = item[5] === "Lleno";

          return (
            <View key={item[0]} style={styles.classItem}>
              <View style={styles.classIcon}>
                <Ionicons
                  name="time-outline"
                  size={34}
                  color={COLORS.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.classTitle}>{item[0]}</Text>
                <Text style={styles.muted}>
                  ◷ {item[2]} Coach: {item[3]} ⚭ {item[4]}
                </Text>
              </View>

              <Text style={full ? styles.fullText : styles.availableText}>
                {item[5]}
              </Text>

              <Pressable
                style={[styles.reserveButton, full && styles.disabledButton]}
              >
                <Text style={[styles.reserveText, full && styles.disabledText]}>
                  {full ? "Sin cupo" : "Reservar"}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </>
  );
}

function PRs() {
  return (
    <>
      <View style={styles.headerRow}>
        <Header
          title="PRs & Benchmarks"
          subtitle="Registra y monitorea tu progreso"
        />

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>＋ Registrar PR</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>↗ Progreso - Back Squat</Text>

        <View style={styles.chartFake}>
          <View style={styles.chartLine} />
          <Text style={styles.chartLabels}>01/26 02/26 03/26 04/26 05/26</Text>
        </View>
      </View>

      <Section title="Últimos PRs registrados">
        <ListItem title="Back Squat 1RM" subtitle="2026-05-08" right="120kg" />
      </Section>
    </>
  );
}

function Membresia() {
  return (
    <>
      <Header title="Mi Membresía" subtitle="Gestiona tu plan y pagos" />

      <View style={styles.membershipBig}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.bannerTitle}>CrossFit Unlimited</Text>
            <Text style={styles.activeText}>✓ Membresía Activa</Text>
          </View>

          <View>
            <Text style={styles.price}>$120</Text>
            <Text style={styles.muted}>por mes</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Info title="Fecha de inicio" value="2026-04-15" />
          <Info title="Vencimiento" value="2026-06-15" />
          <Info title="Días restantes" value="35 días" />
        </View>

        <View style={styles.row}>
          <Pressable style={styles.renewButton}>
            <Text style={styles.reserveText}>Renovar ahora</Text>
          </Pressable>

          <Pressable style={styles.changeButton}>
            <Text style={styles.whiteButtonText}>Cambiar plan</Text>
          </Pressable>
        </View>
      </View>

      <Section title="Historial de Pagos">
        <ListItem
          title="CrossFit Unlimited"
          subtitle="2026-04-15"
          right="$120"
        />
        <ListItem
          title="CrossFit Unlimited"
          subtitle="2026-03-15"
          right="$120"
        />
      </Section>
    </>
  );
}

function Perfil() {
  return (
    <>
      <Header title="Mi Perfil" subtitle="Gestiona tu información personal" />

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>✎ Editar</Text>
          </Pressable>
        </View>

        <View style={styles.formGrid}>
          <Field label="Nombre completo" value="Juan Pérez" />
          <Field label="Email" value="juan@email.com" />
          <Field label="Teléfono" value="+34 612 345 678" />
          <Field label="Fecha de nacimiento" value="15/05/1990" />
          <Field label="Dirección" value="Madrid, España" wide />
          <Field
            label="Contacto de emergencia"
            value="María Pérez - +34 698 765 432"
            wide
          />
        </View>
      </View>
    </>
  );
}

function Stat({ title, value, footer, icon }: any) {
  return (
    <View style={styles.statCard}>
      <View style={styles.rowBetween}>
        <Text style={styles.statTitle}>{title}</Text>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.muted}>{footer}</Text>
    </View>
  );
}

function Section({ title, children }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ListItem({ title, subtitle, right }: any) {
  return (
    <View style={styles.listItem}>
      <View style={styles.classIcon}>
        <Ionicons name="calendar-outline" size={30} color={COLORS.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.classTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
      </View>

      <Text style={styles.rightText}>{right}</Text>
    </View>
  );
}

function Info({ title, value }: any) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.muted}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Field({ label, value, wide }: any) {
  return (
    <View style={[styles.field, wide && styles.fieldWide]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputFake}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 30,
    paddingBottom: 60,
  },

  header: {
    marginBottom: 28,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 22,
    marginTop: 8,
  },

  tabs: {
    flexDirection: "row",
    gap: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 22,
    marginHorizontal: -30,
    paddingHorizontal: 30,
    marginBottom: 30,
  },

  tabActive: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
  },

  tab: {
    color: COLORS.textSecondary,
    fontSize: 20,
    fontWeight: "700",
  },

  membershipBanner: {
    backgroundColor: "#062C1D",
    borderWidth: 1,
    borderColor: "#008F56",
    borderRadius: 18,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  bannerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  bannerText: {
    color: COLORS.textSecondary,
    fontSize: 20,
    marginTop: 8,
  },

  bannerMeta: {
    color: COLORS.text,
    fontSize: 18,
    marginTop: 24,
  },

  statsRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 30,
  },

  statTitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: "700",
  },

  statValue: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: "800",
    marginTop: 24,
  },

  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 30,
    marginBottom: 30,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24,
  },

  muted: {
    color: COLORS.textSecondary,
    fontSize: 18,
  },

  listItem: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
  },

  classItem: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    padding: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
  },

  classIcon: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "#075C39",
    alignItems: "center",
    justifyContent: "center",
  },

  classTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  availableText: {
    color: COLORS.primary,
    fontSize: 16,
    width: 110,
    textAlign: "right",
  },

  fullText: {
    color: COLORS.danger,
    fontSize: 16,
    width: 110,
    textAlign: "right",
    fontWeight: "700",
  },

  reserveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 34,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },

  reserveText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },

  disabledButton: {
    backgroundColor: "#2A2A2A",
    shadowOpacity: 0,
  },

  disabledText: {
    color: COLORS.textSecondary,
  },

  dateBox: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingHorizontal: 24,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  dateText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "700",
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 30,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  primaryButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },

  chartFake: {
    height: 300,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.textSecondary,
    justifyContent: "center",
    marginLeft: 80,
  },

  chartLine: {
    height: 4,
    backgroundColor: COLORS.primary,
    transform: [{ rotate: "-1deg" }],
  },

  chartLabels: {
    color: COLORS.textSecondary,
    fontSize: 20,
    marginTop: 120,
  },

  membershipBig: {
    backgroundColor: "#06351F",
    borderWidth: 1,
    borderColor: "#008F56",
    borderRadius: 18,
    padding: 30,
    marginBottom: 30,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  activeText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
  },

  price: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
    textAlign: "right",
  },

  infoRow: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 34,
  },

  infoBox: {
    flex: 1,
    backgroundColor: "#092819",
    borderRadius: 16,
    padding: 22,
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 14,
  },

  renewButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  changeButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  whiteButtonText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
  },

  editButton: {
    backgroundColor: "#075C39",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  editText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
  },

  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },

  field: {
    width: "48%",
  },

  fieldWide: {
    width: "100%",
  },

  fieldLabel: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  inputFake: {
    height: 62,
    borderRadius: 16,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  inputText: {
    color: "#777",
    fontSize: 20,
    fontWeight: "700",
  },

  rightText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },
});
