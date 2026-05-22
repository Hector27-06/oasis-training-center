import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

const payments = [
  { plan: "CrossFit Unlimited", date: "2026-04-15", amount: "$120" },
  { plan: "CrossFit Unlimited", date: "2026-03-15", amount: "$120" },
  { plan: "CrossFit Unlimited", date: "2026-02-15", amount: "$120" },
  { plan: "CrossFit Unlimited", date: "2026-01-15", amount: "$120" },
];

export default function UserMembershipScreen() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Membresía</Text>
        <Text style={styles.subtitle}>Gestiona tu plan y pagos</Text>
      </View>

      <View style={styles.membershipCard}>
        <View style={styles.membershipTop}>
          <View>
            <Text style={styles.planTitle}>CrossFit Unlimited</Text>

            <View style={styles.activeRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={COLORS.primary}
              />
              <Text style={styles.activeText}>Membresía Activa</Text>
            </View>
          </View>

          <View>
            <Text style={styles.price}>$120</Text>
            <Text style={styles.priceSub}>por mes</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <InfoBox
            title="Fecha de inicio"
            value="2026-04-15"
            icon="calendar-outline"
          />
          <InfoBox
            title="Vencimiento"
            value="2026-06-15"
            icon="calendar-outline"
          />
          <InfoBox title="Días restantes" value="35 días" icon="time-outline" />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Renovar ahora</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Cambiar plan</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.sectionTitle}>Historial de Pagos</Text>

        {payments.map((payment) => (
          <View key={payment.date} style={styles.paymentItem}>
            <View style={styles.paymentIcon}>
              <Ionicons name="cash-outline" size={26} color={COLORS.primary} />
            </View>

            <View>
              <Text style={styles.paymentPlan}>{payment.plan}</Text>
              <Text style={styles.paymentDate}>{payment.date}</Text>
            </View>

            <View style={styles.paymentRight}>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
              <Text style={styles.paidBadge}>Pagado</Text>
            </View>
          </View>
        ))}
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
    marginBottom: 26,
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
  price: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "800",
  },
  priceSub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: "right",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 26,
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
  actions: {
    flexDirection: "row",
    gap: 14,
  },
  primaryButton: {
    flex: 1,
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "800",
  },
  secondaryButton: {
    width: 160,
    height: 54,
    backgroundColor: "#1f1f1f",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },
  historyCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 26,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  paymentItem: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  paymentPlan: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
  },
  paymentDate: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  paymentRight: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  paymentAmount: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  paidBadge: {
    color: COLORS.primary,
    backgroundColor: "#075C39",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
  },
});
