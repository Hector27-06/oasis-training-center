import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const initialClasses = [
  {
    id: "1",
    day: "Lunes",
    time: "06:00",
    duration: "60 min",
    name: "CrossFit WOD",
    type: "CrossFit",
    coach: "Carlos Ruiz",
    reserved: 8,
    capacity: 12,
    userReserved: false,
  },
  {
    id: "2",
    day: "Lunes",
    time: "07:30",
    duration: "90 min",
    name: "Hyrox Training",
    type: "Hyrox",
    coach: "Ana López",
    reserved: 12,
    capacity: 15,
    userReserved: false,
  },
  {
    id: "3",
    day: "Martes",
    time: "09:00",
    duration: "45 min",
    name: "Gimnasia & Mobility",
    type: "Mobility",
    coach: "Laura Martínez",
    reserved: 10,
    capacity: 10,
    userReserved: false,
  },
  {
    id: "4",
    day: "Miércoles",
    time: "10:00",
    duration: "120 min",
    name: "Open Box",
    type: "Open",
    coach: "-",
    reserved: 5,
    capacity: 20,
    userReserved: true,
  },
  {
    id: "5",
    day: "Jueves",
    time: "12:00",
    duration: "60 min",
    name: "Calistenia Básica",
    type: "Calistenia",
    coach: "Miguel Torres",
    reserved: 7,
    capacity: 12,
    userReserved: false,
  },
  {
    id: "6",
    day: "Viernes",
    time: "17:00",
    duration: "60 min",
    name: "CrossFit WOD",
    type: "CrossFit",
    coach: "Carlos Ruiz",
    reserved: 14,
    capacity: 15,
    userReserved: false,
  },
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default function AdminScheduleScreen() {
  const [classes, setClasses] = useState(initialClasses);

  const reserve = (id: string) => {
    setClasses((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, userReserved: true, reserved: item.reserved + 1 }
          : item,
      ),
    );
  };

  const cancel = (id: string) => {
    setClasses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              userReserved: false,
              reserved: Math.max(item.reserved - 1, 0),
            }
          : item,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestión de Horarios</Text>
      <Text style={styles.subtitle}>
        Administra clases y disponibilidad semanal
      </Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Lista semanal de clases</Text>
            <Text style={styles.cardSubtitle}>
              Reserva o cancela clases por día
            </Text>
          </View>

          <View style={styles.datePill}>
            <Ionicons name="calendar-outline" size={18} color="#00ff88" />
            <Text style={styles.dateText}>Semana actual</Text>
          </View>
        </View>

        {days.map((day) => {
          const dayClasses = classes.filter((item) => item.day === day);

          return (
            <View key={day} style={styles.dayBlock}>
              <Text style={styles.dayTitle}>{day}</Text>

              {dayClasses.length === 0 ? (
                <Text style={styles.empty}>No hay clases registradas</Text>
              ) : (
                dayClasses.map((item) => {
                  const available = item.capacity - item.reserved;
                  const isFull = available <= 0 && !item.userReserved;

                  return (
                    <View
                      key={item.id}
                      style={[
                        styles.classRow,
                        item.userReserved && styles.selectedRow,
                      ]}
                    >
                      <View style={styles.iconBox}>
                        <Ionicons
                          name="time-outline"
                          size={30}
                          color="#00ff88"
                        />
                      </View>

                      <View style={styles.info}>
                        <View style={styles.nameRow}>
                          <Text style={styles.className}>{item.name}</Text>
                          <Text style={styles.typeBadge}>{item.type}</Text>
                        </View>

                        <Text style={styles.meta}>
                          {item.time} ({item.duration}) · Coach: {item.coach} ·{" "}
                          {item.reserved}/{item.capacity}
                        </Text>
                      </View>

                      <View style={styles.right}>
                        {isFull ? (
                          <>
                            <Text style={styles.fullText}>Lleno</Text>
                            <View style={styles.disabledButton}>
                              <Text style={styles.disabledText}>Sin cupo</Text>
                            </View>
                          </>
                        ) : item.userReserved ? (
                          <>
                            <Text style={styles.availableText}>Reservado</Text>
                            <Pressable
                              style={styles.cancelButton}
                              onPress={() => cancel(item.id)}
                            >
                              <Text style={styles.cancelText}>Cancelar</Text>
                            </Pressable>
                          </>
                        ) : (
                          <>
                            <Text style={styles.availableText}>
                              {available} lugares disponibles
                            </Text>
                            <Pressable
                              style={styles.reserveButton}
                              onPress={() => reserve(item.id)}
                            >
                              <Text style={styles.reserveText}>Reservar</Text>
                            </Pressable>
                          </>
                        )}
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 24 },
  title: { color: "#fff", fontSize: 32, fontWeight: "900" },
  subtitle: { color: "#b8c2cc", fontSize: 16, marginTop: 6, marginBottom: 24 },
  card: {
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 22,
    padding: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  cardTitle: { color: "#fff", fontSize: 26, fontWeight: "900" },
  cardSubtitle: { color: "#b8c2cc", marginTop: 6 },
  datePill: {
    height: 48,
    backgroundColor: "#202020",
    borderRadius: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: { color: "#fff", fontWeight: "800" },
  dayBlock: { marginBottom: 22 },
  dayTitle: {
    color: "#00ff88",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
  },
  empty: { color: "#777", marginBottom: 8 },
  classRow: {
    minHeight: 96,
    backgroundColor: "#202020",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#292929",
  },
  selectedRow: { borderColor: "#087a49" },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#064b2b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },
  info: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  className: { color: "#fff", fontSize: 20, fontWeight: "900" },
  typeBadge: {
    color: "#00ff88",
    backgroundColor: "#063d26",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "800",
  },
  meta: { color: "#b8c2cc", marginTop: 8 },
  right: { width: 210, alignItems: "flex-end", gap: 8 },
  availableText: { color: "#00ff88", fontWeight: "800", textAlign: "right" },
  fullText: { color: "#ff4444", fontWeight: "900" },
  reserveButton: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  reserveText: { color: "#000", fontWeight: "900", fontSize: 16 },
  cancelButton: {
    backgroundColor: "#3a1515",
    borderWidth: 1,
    borderColor: "#ff4444",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  cancelText: { color: "#ff4444", fontWeight: "900", fontSize: 16 },
  disabledButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  disabledText: { color: "#aaa", fontWeight: "900", fontSize: 16 },
});
