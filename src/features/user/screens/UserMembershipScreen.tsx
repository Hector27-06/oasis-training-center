import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { membershipService } from "@/src/services/membership.service";
import { Membership } from "@/src/types/membership.types";

export default function UserMembershipScreen() {
  const { isMobile, layout } = useResponsive();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadMembership = async () => {
      try {
        setErrorMessage("");
        setMembership(await membershipService.getMyMembership());
      } catch {
        setErrorMessage("No fue posible cargar tu membresía.");
      } finally {
        setLoading(false);
      }
    };

    loadMembership();
  }, []);

  return (
    <>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <Text style={styles.title}>Mi Membresía</Text>
        <Text style={styles.subtitle}>Información de tu membresía actual</Text>
      </View>

      {loading ? <Text style={styles.message}>Cargando membresía...</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {!loading && !errorMessage && !membership ? (
        <Text style={styles.message}>No tienes una membresía vigente.</Text>
      ) : null}

      {membership ? <View style={[styles.membershipCard, isMobile && { padding: layout.cardPadding }]}>
        <View style={styles.membershipTop}>
          <View>
            <Text style={styles.planTitle}>{membership.plan.name}</Text>

            <View style={styles.activeRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={COLORS.primary}
              />

              <Text style={styles.activeText}>{membership.status}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.infoGrid, isMobile && styles.infoGridMobile]}>
          <InfoBox title="Plan" value={membership.plan.name} icon="card-outline" />

          <InfoBox title="Fecha inicio" value={formatDate(membership.startDate)} icon="calendar-outline" />

          <InfoBox title="Fecha vencimiento" value={formatDate(membership.endDate)} icon="time-outline" />
        </View>
      </View> : null}
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(
    new Date(value),
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
  headerMobile: { paddingBottom: 16, marginBottom: 16 },

  message: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  errorMessage: {
    color: "#ff6666",
    fontSize: 16,
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
  infoGridMobile: { flexDirection: "column", gap: 12 },

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
