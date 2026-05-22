import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

type TabType = "Resumen" | "Calendario" | "PRs";

interface Props {
  userName: string;
}

export default function UserDashboardOverview({ userName }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("Resumen");

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Hola, {userName}</Text>

        <Text style={styles.subtitle}>
          Bienvenido a tu centro de entrenamiento
        </Text>
      </View>

      <View style={styles.tabs}>
        <TabButton
          label="Resumen"
          icon="pulse-outline"
          active={activeTab === "Resumen"}
          onPress={() => setActiveTab("Resumen")}
        />

        <TabButton
          label="Calendario"
          icon="calendar-outline"
          active={activeTab === "Calendario"}
          onPress={() => setActiveTab("Calendario")}
        />

        <TabButton
          label="PRs & Benchmarks"
          icon="trophy-outline"
          active={activeTab === "PRs"}
          onPress={() => setActiveTab("PRs")}
        />
      </View>

      {activeTab === "Resumen" && <ResumenContent />}

      {activeTab === "Calendario" && <CalendarioContent />}

      {activeTab === "PRs" && <PrsContent />}
    </>
  );
}

function TabButton({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? COLORS.primary : COLORS.textSecondary}
      />

      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ResumenContent() {
  return (
    <>
      <View style={styles.membershipCard}>
        <View>
          <Text style={styles.membershipTitle}>CrossFit Unlimited</Text>
          <Text style={styles.membershipSubtitle}>Membresía activa</Text>

          <View style={styles.row}>
            <Ionicons name="time-outline" size={18} color={COLORS.primary} />
            <Text style={styles.membershipText}>Vence en 35 días</Text>

            <Ionicons
              name="calendar-outline"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.membershipText}>2026-06-15</Text>
          </View>
        </View>

        <Ionicons
          name="checkmark-circle-outline"
          size={44}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Clases este mes"
          value="18"
          subtitle="+3 vs mes anterior"
          icon="calendar-outline"
        />

        <StatCard
          title="PRs conseguidos"
          value="7"
          subtitle="Este mes"
          icon="trophy-outline"
        />

        <StatCard
          title="Racha actual"
          value="12 días"
          subtitle="¡Sigue así!"
          icon="trending-up-outline"
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Próximas clases reservadas</Text>

        <View style={styles.classItem}>
          <View style={styles.classIcon}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={COLORS.primary}
            />
          </View>

          <View>
            <Text style={styles.classTitle}>CrossFit WOD</Text>
            <Text style={styles.classText}>
              2026-05-12 • 18:00 • Carlos Ruiz
            </Text>
          </View>

          <Text style={styles.cancel}>Cancelar</Text>
        </View>
      </View>
    </>
  );
}

function CalendarioContent() {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Calendario</Text>

      <View style={styles.classItem}>
        <View style={styles.classIcon}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.classTitle}>CrossFit WOD</Text>
          <Text style={styles.classText}>Lunes • 06:00 • Carlos Ruiz</Text>
        </View>
      </View>

      <View style={styles.classItem}>
        <View style={styles.classIcon}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.classTitle}>Hyrox Training</Text>
          <Text style={styles.classText}>Martes • 07:30 • Ana López</Text>
        </View>
      </View>
    </View>
  );
}

function PrsContent() {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>PRs & Benchmarks</Text>

      <View style={styles.classItem}>
        <View style={styles.classIcon}>
          <Ionicons name="trophy-outline" size={24} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.classTitle}>Back Squat 1RM</Text>
          <Text style={styles.classText}>120kg • 2026-05-08</Text>
        </View>

        <Text style={styles.cancel}>+5kg</Text>
      </View>
    </View>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <Text style={styles.statTitle}>{title}</Text>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 28,
  },

  title: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 20,
    marginTop: 8,
  },

  tabs: {
    flexDirection: "row",
    gap: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 20,
    marginBottom: 30,
  },

  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 14,
  },

  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },

  tabText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: "700",
  },

  tabTextActive: {
    color: COLORS.primary,
  },

  membershipCard: {
    backgroundColor: "#042F1E",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 28,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  membershipTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  membershipSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
    marginBottom: 22,
  },

  membershipText: {
    color: COLORS.text,
    fontSize: 16,
    marginRight: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statsGrid: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  statTitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: "700",
  },

  statValue: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
  },

  statSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 6,
  },

  sectionCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24,
  },

  classItem: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginBottom: 14,
  },

  classIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#075C39",
    alignItems: "center",
    justifyContent: "center",
  },

  classTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  classText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },

  cancel: {
    marginLeft: "auto",
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
});
