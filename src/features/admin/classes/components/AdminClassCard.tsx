import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { GymClass } from "@/src/types/class.types";

interface Props {
  item: GymClass;
  onEdit: (item: GymClass) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminClassCard({ item, onEdit, onCancel, onDelete }: Props) {
  const { isMobile, layout } = useResponsive();
  const startTime = new Date(item.startTime).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });

  return (
    <View style={[styles.card, isMobile && [styles.cardMobile, { padding: layout.cardPadding }], item.status === "CANCELLED" && styles.cancelled]}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.activity?.name || "Sin actividad"} · {startTime} · Instructor: {item.instructorName}</Text>
        <Text style={styles.meta}>{item.reservationsCount}/{item.capacity} reservas · {item.availableSpots} lugares disponibles</Text>
      </View>
      <View style={[styles.actions, isMobile && styles.actionsMobile]}>
        <Pressable style={[styles.editButton, isMobile && styles.actionMobile]} onPress={() => onEdit(item)}><Text style={styles.editText}>Editar</Text></Pressable>
        {item.status !== "CANCELLED" ? <Pressable style={[styles.cancelButton, isMobile && styles.actionMobile]} onPress={() => onCancel(item.id)}><Text style={styles.cancelText}>Cancelar</Text></Pressable> : null}
        <Pressable style={[styles.deleteButton, isMobile && styles.actionMobile]} onPress={() => onDelete(item.id)}><Text style={styles.deleteText}>Eliminar</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#1F1F1F", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 22, flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 14 },
  cardMobile: { flexDirection: "column", alignItems: "stretch", gap: 14 },
  cancelled: { opacity: 0.65, borderColor: COLORS.danger },
  info: { flex: 1, minWidth: 0 },
  name: { color: COLORS.text, fontSize: 22, fontWeight: "800", marginBottom: 8 },
  meta: { color: COLORS.textSecondary, fontSize: 15, marginTop: 3 },
  actions: { flexDirection: "row", gap: 10 },
  actionsMobile: { width: "100%" },
  actionMobile: { flex: 1, alignItems: "center" },
  editButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  editText: { color: "#000", fontWeight: "800" },
  cancelButton: { backgroundColor: "#3A1111", borderWidth: 1, borderColor: COLORS.danger, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  cancelText: { color: COLORS.danger, fontWeight: "800" },
  deleteButton: { backgroundColor: "#242424", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  deleteText: { color: COLORS.textSecondary, fontWeight: "800" },
});
