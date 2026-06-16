import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { GymClass } from "../types/class.types";

type Props = {
  item: GymClass;
  onEdit: (item: GymClass) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function AdminClassCard({
  item,
  onEdit,
  onCancel,
  onDelete,
}: Props) {
  const availablePlaces = item.capacity - item.reserved;

  return (
    <View
      style={[styles.card, item.status === "cancelled" && styles.cancelled]}
    >
      <View style={styles.iconBox}>
        <Ionicons name="time-outline" size={32} color={COLORS.primary} />
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
        </View>

        <Text style={styles.meta}>
          {item.time} ({item.duration}) · Coach: {item.coach} · {item.reserved}/
          {item.capacity}
        </Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.status,
            item.status !== "available" && styles.dangerStatus,
          ]}
        >
          {item.status === "available"
            ? `${availablePlaces} lugares disponibles`
            : item.status === "full"
              ? "Lleno"
              : "Cancelada"}
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.editButton} onPress={() => onEdit(item)}>
            <Text style={styles.editText}>Editar</Text>
          </Pressable>

          {item.status !== "cancelled" && (
            <Pressable
              style={styles.cancelButton}
              onPress={() => onCancel(item.id)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 14,
  },

  cancelled: {
    opacity: 0.65,
    borderColor: COLORS.danger,
  },

  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },

  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },

  badge: {
    backgroundColor: "#075C39",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.primary,
    fontWeight: "800",
  },

  meta: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  right: {
    alignItems: "flex-end",
    gap: 12,
  },

  status: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  dangerStatus: {
    color: COLORS.danger,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  editButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  editText: {
    color: "#000",
    fontWeight: "800",
  },

  cancelButton: {
    backgroundColor: "#3A1111",
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  cancelText: {
    color: COLORS.danger,
    fontWeight: "800",
  },

  deleteButton: {
    backgroundColor: "#242424",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  deleteText: {
    color: COLORS.textSecondary,
    fontWeight: "800",
  },
});
