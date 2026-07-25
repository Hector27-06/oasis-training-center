import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { classService } from "@/src/services/class.service";
import { reservationService } from "@/src/services/reservation.service";
import { useAuthStore } from "@/src/store/auth.store";
import { GymClass } from "@/src/types/class.types";

interface Props {
  clientId?: string;
}

export default function UserClassesScreen({ clientId }: Props) {
  const { isMobile, layout } = useResponsive();
  const authenticatedClientId = useAuthStore((state) => state.user?.client?.id);
  const reservationClientId = clientId ?? authenticatedClientId;
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [reservedClassIds, setReservedClassIds] = useState<Set<string>>(new Set());
  const [reservationIdsByClass, setReservationIdsByClass] = useState<Map<string, string>>(
    new Map(),
  );
  const [loading, setLoading] = useState(true);

  const loadClasses = useCallback(async () => {
    try {
      const classesResult = await classService.getSchedule();
      setClasses(classesResult);

      if (!reservationClientId) {
        setReservedClassIds(new Set());
        setReservationIdsByClass(new Map());
        return;
      }

      const reservations = await reservationService.getClientReservations(reservationClientId);
      setReservedClassIds(new Set(reservations.map((reservation) => reservation.classId)));
      setReservationIdsByClass(
        new Map(
          reservations.map((reservation) => [reservation.classId, reservation.id]),
        ),
      );
    } catch {
      Alert.alert("Error", "No fue posible cargar las clases");
    } finally {
      setLoading(false);
    }
  }, [reservationClientId]);

  const reserveClass = async (classId: string) => {
    if (reservedClassIds.has(classId)) {
      return;
    }

    if (!reservationClientId) {
      Alert.alert(
        "Reserva no disponible",
        "No se encontró el identificador de cliente requerido para reservar.",
      );
      return;
    }

    try {
      await reservationService.createReservation({
        clientId: reservationClientId,
        classId,
      });

      Alert.alert("Éxito", "Clase reservada correctamente");

      await loadClasses();
    } catch {
      Alert.alert(
        "Error",
        "No fue posible reservar la clase",
      );
    }
  };

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const cancelReservation = async (classId: string) => {
    const reservationId = reservationIdsByClass.get(classId);

    if (!reservationId) {
      return;
    }

    try {
      await reservationService.deleteReservation(reservationId);
      Alert.alert("Éxito", "Reserva cancelada correctamente");
      await loadClasses();
    } catch {
      Alert.alert("Error", "No fue posible cancelar la reserva");
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
    <View style={[styles.card, isMobile && { padding: layout.cardPadding }]}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
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
          const isReserved = reservedClassIds.has(item.id);

          return (
            <View
              key={item.id}
              style={[styles.classItem, isMobile && styles.classItemMobile, isFull && styles.classItemFull]}
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

              <View style={[styles.right, isMobile && styles.rightMobile]}>
                {isReserved ? (
                  <>
                    <Pressable style={styles.reservedButton} disabled>
                      <Text style={styles.reservedText}>Reservado</Text>
                    </Pressable>

                    <Pressable
                      style={styles.cancelButton}
                      onPress={() => cancelReservation(item.id)}
                    >
                      <Text style={styles.cancelText}>Cancelar reserva</Text>
                    </Pressable>
                  </>
                ) : isFull ? (
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
  headerMobile: { marginBottom: 20 },

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
  classItemMobile: { flexDirection: "column", alignItems: "stretch", padding: 18, gap: 14 },

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
  rightMobile: { justifyContent: "space-between", flexWrap: "wrap", gap: 10 },

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

  reservedButton: {
    backgroundColor: "#063d26",
    height: 56,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  reservedText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  cancelButton: {
    backgroundColor: "#3A1111",
    borderWidth: 1,
    borderColor: COLORS.danger,
    height: 56,
    paddingHorizontal: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: COLORS.danger,
    fontSize: 15,
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
