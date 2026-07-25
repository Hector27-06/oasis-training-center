import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

type Props = {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AdminMobileDataCard({
  title,
  subtitle,
  badge,
  children,
  actions,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {badge}
      </View>
      <View style={styles.details}>{children}</View>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#121212", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 16 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  headerContent: { flex: 1, minWidth: 0 },
  title: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  details: { gap: 10, marginTop: 14 },
  actions: { gap: 10, marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#242424" },
});
