import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

interface Props {
  userName: string;
}

export default function UserProfileScreen({ userName }: Props) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Gestiona tu información personal</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <Pressable style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
        </View>

        <View style={styles.formGrid}>
          <Field
            label="Nombre completo"
            value={userName || "Juan Pérez"}
            icon="person-outline"
          />
          <Field label="Email" value="juan@email.com" icon="mail-outline" />
          <Field label="Teléfono" value="+34 612 345 678" icon="call-outline" />
          <Field
            label="Fecha de nacimiento"
            value="15/05/1990"
            icon="calendar-outline"
          />
        </View>

        <Field
          full
          label="Dirección"
          value="Madrid, España"
          icon="location-outline"
        />
        <Field
          full
          label="Contacto de emergencia"
          value="María Pérez - +34 698 765 432"
          icon="alert-circle-outline"
        />
      </View>

      <View style={styles.membershipCard}>
        <Text style={styles.sectionTitle}>Mi Membresía</Text>

        <View style={styles.membershipGrid}>
          <Info label="Plan actual" value="CrossFit Unlimited" />
          <Info label="Fecha de vencimiento" value="15 Jun 2026" />
          <Info label="Estado" value="Activa" green />
        </View>
      </View>
    </>
  );
}

function Field({
  label,
  value,
  icon,
  full,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  full?: boolean;
}) {
  return (
    <View style={[styles.field, full && styles.fullField]}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={16} color={COLORS.textSecondary} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.inputLike}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );
}

function Info({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, green && styles.greenText]}>{value}</Text>
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
  profileCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 26,
    marginBottom: 26,
    maxWidth: 860,
    alignSelf: "center",
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },
  editButton: {
    backgroundColor: "#075C39",
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 15,
  },
  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
  },
  field: {
    flexBasis: "48%",
    marginBottom: 22,
  },
  fullField: {
    flexBasis: "100%",
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },
  inputLike: {
    height: 50,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: "700",
  },
  membershipCard: {
    backgroundColor: "#042F1E",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    padding: 26,
    maxWidth: 860,
    alignSelf: "center",
    width: "100%",
  },
  membershipGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },
  greenText: {
    color: COLORS.primary,
  },
});
