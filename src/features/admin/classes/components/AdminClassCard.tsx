import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const availablePlaces = item.capacity - item.reserved;

  return (
    <View
      style={[
        styles.card,
        item.status === "cancelled" && styles.cancelled,
        isMobile && styles.cardMobile,
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, isMobile && styles.iconBoxMobile]}>
          <Ionicons
            name="time-outline"
            size={isMobile ? 22 : 32}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          </View>

          <Text style={styles.meta}>
            {item.time} ({item.duration}) · Coach: {item.coach} ·{" "}
            {item.reserved}/{item.capacity}
          </Text>
        </View>
      </View>

      <View style={[styles.right, isMobile && styles.rightMobile]}>
        <Text
          style={[
            styles.status,
            item.status !== "available" && styles.dangerStatus,
            isMobile && styles.statusMobile,
          ]}
        >
          {item.status === "available"
            ? `${availablePlaces} lugares disponibles`
            : item.status === "full"
              ? "Lleno"
              : "Cancelada"}
        </Text>

        <View style={[styles.actions, isMobile && styles.actionsMobile]}>
          <Pressable
            style={[styles.editButton, isMobile && styles.actionButtonMobile]}
            onPress={() => onEdit(item)}
          >
            <Text
              style={[styles.editText, isMobile && styles.actionTextMobile]}
              numberOfLines={1}
            >
              Editar
            </Text>
          </Pressable>

          {item.status !== "cancelled" && (
            <Pressable
              style={[
                styles.cancelButton,
                isMobile && styles.actionButtonMobile,
              ]}
              onPress={() => onCancel(item.id)}
            >
              <Text
                style={[styles.cancelText, isMobile && styles.actionTextMobile]}
                numberOfLines={1}
              >
                Cancelar
              </Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.deleteButton, isMobile && styles.actionButtonMobile]}
            onPress={() => onDelete(item.id)}
          >
            <Text
              style={[styles.deleteText, isMobile && styles.actionTextMobile]}
              numberOfLines={1}
            >
              Eliminar
            </Text>
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

  cardMobile: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 14,
    padding: 16,
  },

  cancelled: {
    opacity: 0.65,
    borderColor: COLORS.danger,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    flex: 1,
  },

  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBoxMobile: {
    width: 48,
    height: 48,
    borderRadius: 14,
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
    flexShrink: 1,
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

  rightMobile: {
    alignItems: "stretch",
    width: "100%",
  },

  status: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  statusMobile: {
    textAlign: "left",
  },

  dangerStatus: {
    color: COLORS.danger,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  actionsMobile: {
    width: "100%",
    gap: 6,
  },

  actionButtonMobile: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  actionTextMobile: {
    fontSize: 13,
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
