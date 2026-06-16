import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { days } from "../data/mockClasses";
import { GymClass } from "../types/class.types";
import AdminClassCard from "./AdminClassCard";

type Props = {
  classes: GymClass[];
  onEdit: (item: GymClass) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function AdminClassList({
  classes,
  onEdit,
  onCancel,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lista semanal de clases</Text>

      {days.map((day) => {
        const dayClasses = classes.filter((item) => item.day === day);

        return (
          <View key={day} style={styles.daySection}>
            <Text style={styles.dayTitle}>{day}</Text>

            {dayClasses.length === 0 ? (
              <Text style={styles.empty}>No hay clases registradas</Text>
            ) : (
              dayClasses.map((item) => (
                <AdminClassCard
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onCancel={onCancel}
                  onDelete={onDelete}
                />
              ))
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    padding: 28,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  daySection: {
    marginBottom: 34,
  },

  dayTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 14,
  },

  empty: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
