import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.card, isMobile && styles.cardMobile]}>
      <Text style={[styles.title, isMobile && styles.titleMobile]}>
        Lista semanal de clases
      </Text>

      {days.map((day) => {
        const dayClasses = classes.filter((item) => item.day === day);

        return (
          <View key={day} style={styles.daySection}>
            <Text style={[styles.dayTitle, isMobile && styles.dayTitleMobile]}>
              {day}
            </Text>
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

  cardMobile: {
    padding: 16,
    borderRadius: 16,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  titleMobile: {
    fontSize: 20,
    marginBottom: 14,
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

  dayTitleMobile: {
    fontSize: 18,
    marginBottom: 10,
  },

  empty: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
