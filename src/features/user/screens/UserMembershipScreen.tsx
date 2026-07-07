import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

export default function UserMembershipScreen() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Membresía</Text>
        <Text style={styles.subtitle}>Información de tu membresía actual</Text>
      </View>

      <View style={styles.membershipCard}>
        <View style={styles.membershipTop}>
          <View>
            <Text style={styles.planTitle}>Membresía Actual</Text>

            <View style={styles.activeRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={COLORS.primary}
              />

              <Text style={styles.activeText}>Activa</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <InfoBox title="Plan" value="-" icon="card-outline" />

          <InfoBox title="Fecha inicio" value="-" icon="calendar-outline" />

          <InfoBox title="Fecha vencimiento" value="-" icon="time-outline" />
        </View>
      </View>
    </>
  );
}

function InfoBox({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoHeader}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />

        <Text style={styles.infoTitle}>{title}</Text>
      </View>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 26,
  },

  title: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
  },

  membershipCard: {
    backgroundColor: "#042F1E",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 28,
  },

  membershipTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  planTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "800",
  },

  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  activeText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "800",
  },

  infoGrid: {
    flexDirection: "row",
    gap: 18,
  },

  infoBox: {
    flex: 1,
    backgroundColor: "#10251B",
    borderRadius: 16,
    padding: 20,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  infoTitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 18,
  },
});
