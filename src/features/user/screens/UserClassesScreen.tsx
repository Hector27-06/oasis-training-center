import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import { memberService } from "@/src/services/member.service";

export default function UserClassesScreen() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    testReservations();
  }, []);

  const testReservations = async () => {
    try {
      const data = await memberService.getMyReservations();

      console.log("MIS RESERVAS");
      console.log(data);
    } catch (error: any) {
      console.log("ERROR RESERVAS");
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await memberService.getSchedule();

      console.log("CLASSES RESPONSE");
      console.log(data);

      setClasses(data.classes || []);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No fue posible cargar las clases");
    } finally {
      setLoading(false);
    }
  };

  const reserveClass = async (classId: string) => {
    try {
      await memberService.reserveClass(classId);

      Alert.alert("Éxito", "Clase reservada correctamente");

      loadClasses();
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Error",
        error?.response?.data?.message || "No fue posible reservar la clase",
      );
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Reservar Clases</Text>

          <Text style={styles.subtitle}>
            Selecciona una clase y reserva tu lugar
          </Text>
        </View>
      </View>

      <View style={styles.list}>
        {classes.map((item) => {
          const isFull = item.availableSpots <= 0;

          return (
            <View
              key={item.id}
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
                </View>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />

                  <Text style={styles.meta}>
                    {new Date(item.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>

                  <Ionicons
                    name="people-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />

                  <Text style={styles.meta}>
                    {item.reservationsCount}/{item.capacity}
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
                      {item.availableSpots}
                      {"\n"}

                      <Text style={styles.availableGreen}>disponibles</Text>
                    </Text>

                    <Pressable
                      style={styles.button}
                      onPress={() => reserveClass(item.id)}
                    >
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
