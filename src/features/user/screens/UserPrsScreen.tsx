import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import { memberService } from "@/src/services/member.service";

type PR = {
  id: string;
  exercise: string;
  weight: number;
  unit: string;
  createdAt: string;
  notes?: string;
};

export default function UserPrsScreen() {
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPRs();
  }, []);

  const loadPRs = async () => {
    try {
      setLoading(true);

      const response = await memberService.getMyPRs();

      console.log("PRS RESPONSE");
      console.log(response);

      setPrs(response || []);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudieron cargar los PRs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePR = async () => {
    try {
      await memberService.createPR({
        exercise: "Sentadilla",
        weight: 120,
        unit: "KG",
        notes: "Nuevo récord personal",
      });

      Alert.alert("Éxito", "PR registrado correctamente");

      loadPRs();
    } catch (error: any) {
      console.log(error?.response?.data);

      Alert.alert(
        "Error",
        error?.response?.data?.message || "No se pudo registrar el PR",
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PRs & Benchmarks</Text>
          <Text style={styles.subtitle}>Registra y monitorea tu progreso</Text>
        </View>

        <Pressable style={styles.addButton} onPress={handleCreatePR}>
          <Ionicons name="add-outline" size={24} color="#000" />
          <Text style={styles.addText}>Registrar PR</Text>
        </Pressable>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.sectionTitle}>Mis PRs</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : prs.length === 0 ? (
          <Text style={styles.emptyText}>Aún no tienes PRs registrados.</Text>
        ) : (
          prs.map((pr) => (
            <View key={pr.id} style={styles.prItem}>
              <View style={styles.prIcon}>
                <Ionicons
                  name="trophy-outline"
                  size={28}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <View style={styles.prTitleRow}>
                  <Text style={styles.prTitle}>{pr.exercise}</Text>

                  <Text style={styles.category}>PR</Text>
                </View>

                <View style={styles.dateRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />

                  <Text style={styles.prDate}>
                    {new Date(pr.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.prRight}>
                <Text style={styles.prValue}>
                  {pr.weight}
                  {pr.unit}
                </Text>

                {pr.notes ? (
                  <Text style={styles.previous}>{pr.notes}</Text>
                ) : null}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
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

  addButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 26,
    alignItems: "center",
  },

  addText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },

  listCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 22,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 40,
  },

  prItem: {
    backgroundColor: "#1f1f1f",
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  prIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  prTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  prTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
  },

  category: {
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    fontWeight: "700",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  prDate: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  prRight: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },

  prValue: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  previous: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
});
