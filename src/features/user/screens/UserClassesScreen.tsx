import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

const classes = [
  {
    name: "CrossFit WOD",
    type: "CrossFit",
    time: "06:00",
    duration: "60 min",
    coach: "Carlos Ruiz",
    current: 8,
    max: 12,
    color: COLORS.primary,
  },
  {
    name: "Hyrox Training",
    type: "Hyrox",
    time: "07:30",
    duration: "90 min",
    coach: "Ana López",
    current: 12,
    max: 15,
    color: "#3b82f6",
  },
  {
    name: "Gimnasia & Mobility",
    type: "Mobility",
    time: "09:00",
    duration: "45 min",
    coach: "Laura Martínez",
    current: 10,
    max: 10,
    color: "#eab308",
  },
  {
    name: "Open Box",
    type: "Open",
    time: "10:00",
    duration: "120 min",
    coach: "-",
    current: 5,
    max: 20,
    color: "#94a3b8",
  },
  {
    name: "Calistenia Básica",
    type: "Calistenia",
    time: "12:00",
    duration: "60 min",
    coach: "Miguel Torres",
    current: 7,
    max: 12,
    color: "#a855f7",
  },
];

export default function UserClassesScreen() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Reservar Clases</Text>
          <Text style={styles.subtitle}>
            Selecciona una clase y reserva tu lugar
          </Text>
        </View>

        <View style={styles.dateBox}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
          <Text style={styles.dateText}>12/05/2026</Text>
          <Ionicons name="calendar" size={20} color={COLORS.textSecondary} />
        </View>
      </View>

      <View style={styles.list}>
        {classes.map((item) => {
          const isFull = item.current >= item.max;
          const available = item.max - item.current;

          return (
            <View
              key={item.name}
              style={[styles.classItem, isFull && styles.classItemFull]}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name="time-outline"
                  size={32}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.classInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.className}>{item.name}</Text>

                  <View style={[styles.badge, { borderColor: item.color }]}>
                    <Text style={[styles.badgeText, { color: item.color }]}>
                      {item.type}
                    </Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.meta}>
                    {item.time} ({item.duration})
                  </Text>

                  <Text style={styles.meta}>Coach: {item.coach}</Text>

                  <Ionicons
                    name="people-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.meta}>
                    {item.current}/{item.max}
                  </Text>
                </View>
              </View>

              <View style={styles.right}>
                {isFull ? (
                  <>
                    <View style={styles.fullRow}>
                      <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color="#ff4d4f"
                      />
                      <Text style={styles.fullText}>Lleno</Text>
                    </View>

                    <Pressable style={styles.disabledButton}>
                      <Text style={styles.disabledText}>Sin cupo</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Text style={styles.available}>
                      {available} lugares{"\n"}
                      <Text style={styles.availableGreen}>disponibles</Text>
                    </Text>

                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText}>Reservar</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    paddingHorizontal: 22,
    height: 50,
  },
  dateText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
  },
  list: {
    gap: 16,
  },
  classItem: {
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  classItemFull: {
    borderColor: "#047857",
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
  },
  classInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  className: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },
  badge: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: "#17211c",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginRight: 16,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  available: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: "right",
  },
  availableGreen: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    paddingHorizontal: 34,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },
  fullRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fullText: {
    color: "#ff4d4f",
    fontSize: 18,
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: "#2a2a2a",
    height: 56,
    paddingHorizontal: 34,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: "800",
  },
});
