import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { personalRecordService } from "@/src/services/personal-record.service";
import {
  PersonalRecord,
  PersonalRecordUnit,
} from "@/src/types/personal-record.types";

export default function UserPrsScreen() {
  const { isMobile, layout } = useResponsive();
  const [prs, setPrs] = useState<PersonalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<PersonalRecordUnit>("KG");
  const [notes, setNotes] = useState("");

  const loadPRs = async () => {
    try {
      setLoading(true);
      setPrs(await personalRecordService.getMyPersonalRecords());
    } catch {
      Alert.alert("Error", "No se pudieron cargar los PRs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPRs();
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setExercise("");
    setWeight("");
    setUnit("KG");
    setNotes("");
  };

  const handleCreatePR = async () => {
    const numericWeight = Number(weight);

    if (!exercise.trim() || !Number.isFinite(numericWeight) || numericWeight <= 0) {
      Alert.alert("Error", "Ingresa el ejercicio y un peso válido.");
      return;
    }

    try {
      await personalRecordService.createPersonalRecord({
        exercise: exercise.trim(),
        weight: numericWeight,
        unit,
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });

      Alert.alert("Éxito", "PR registrado correctamente");
      closeForm();
      await loadPRs();
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      Alert.alert(
        "Error",
        apiError.response?.data?.message || "No se pudo registrar el PR",
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View>
          <Text style={styles.title}>PRs & Benchmarks</Text>
          <Text style={styles.subtitle}>Registra y monitorea tu progreso</Text>
        </View>

        <Pressable style={[styles.addButton, isMobile && styles.addButtonMobile]} onPress={() => setShowForm(true)}>
          <Ionicons name="add-outline" size={24} color="#000" />
          <Text style={styles.addText}>Registrar PR</Text>
        </Pressable>
      </View>

      {showForm ? (
        <View style={[styles.formCard, isMobile && { padding: layout.cardPadding }]}>
          <Text style={styles.formTitle}>Registrar PR</Text>

          <Text style={styles.formLabel}>Ejercicio</Text>
          <TextInput
            style={styles.input}
            value={exercise}
            onChangeText={setExercise}
            placeholder="Ej. Back Squat"
            placeholderTextColor="#777"
          />

          <Text style={styles.formLabel}>Peso</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="120"
            placeholderTextColor="#777"
            keyboardType="decimal-pad"
          />

          <Text style={styles.formLabel}>Unidad</Text>
          <View style={styles.unitRow}>
            {(["KG", "LB"] as const).map((item) => (
              <Pressable
                key={item}
                style={[styles.unitButton, unit === item && styles.unitButtonActive]}
                onPress={() => setUnit(item)}
              >
                <Text style={[styles.unitText, unit === item && styles.unitTextActive]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.formLabel}>Notas (opcional)</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Nuevo récord personal"
            placeholderTextColor="#777"
            multiline
          />

          <View style={[styles.formActions, isMobile && styles.formActionsMobile]}>
            <Pressable style={styles.cancelButton} onPress={closeForm}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={() => void handleCreatePR()}>
              <Text style={styles.saveText}>Guardar PR</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={[styles.listCard, isMobile && { padding: layout.cardPadding }]}>
        <Text style={styles.sectionTitle}>Mis PRs</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : prs.length === 0 ? (
          <Text style={styles.emptyText}>Aún no tienes PRs registrados.</Text>
        ) : (
          prs.map((pr, index) => (
              <View key={`${pr.exercise}-${pr.weight}-${pr.unit}-${index}`} style={[styles.prItem, isMobile && styles.prItemMobile]}>
              <View style={styles.prIcon}>
                <Ionicons name="trophy-outline" size={28} color={COLORS.primary} />
              </View>

              <View style={[styles.prContent, isMobile && styles.prContentMobile]}>
                <View style={[styles.prTitleRow, isMobile && styles.prTitleRowMobile]}>
                  <Text style={styles.prTitle}>{pr.exercise}</Text>
                  <Text style={styles.category}>PR</Text>
                </View>
              </View>

              <View style={[styles.prRight, isMobile && styles.prRightMobile]}>
                <Text style={styles.prValue}>{pr.weight}{pr.unit}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 28, gap: 16 }, headerMobile: { flexDirection: "column", marginBottom: 20 },
  title: { color: COLORS.text, fontSize: 30, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 18, marginTop: 8 },
  addButton: { backgroundColor: COLORS.primary, height: 56, borderRadius: 16, flexDirection: "row", gap: 8, paddingHorizontal: 26, alignItems: "center" }, addButtonMobile: { width: "100%", justifyContent: "center" },
  addText: { color: "#000", fontSize: 18, fontWeight: "800" },
  formCard: { backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 28, marginBottom: 24 },
  formTitle: { color: COLORS.text, fontSize: 24, fontWeight: "800", marginBottom: 8 },
  formLabel: { color: COLORS.textSecondary, fontWeight: "700", marginTop: 14, marginBottom: 8 },
  input: { minHeight: 54, backgroundColor: "#1f1f1f", borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, color: COLORS.text, paddingHorizontal: 16, paddingVertical: 12 },
  notesInput: { minHeight: 82, textAlignVertical: "top" },
  unitRow: { flexDirection: "row", gap: 10 },
  unitButton: { backgroundColor: "#1f1f1f", borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12 },
  unitButtonActive: { backgroundColor: "#075C39", borderColor: COLORS.primary },
  unitText: { color: COLORS.textSecondary, fontWeight: "800" },
  unitTextActive: { color: COLORS.primary },
  formActions: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 20 }, formActionsMobile: { flexDirection: "column-reverse", alignItems: "stretch" },
  cancelButton: { backgroundColor: "#2a2a2a", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
  cancelText: { color: COLORS.text, fontWeight: "800" },
  saveButton: { backgroundColor: COLORS.primary, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
  saveText: { color: "#000", fontWeight: "800" },
  listCard: { backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 28 },
  sectionTitle: { color: COLORS.text, fontSize: 26, fontWeight: "800", marginBottom: 22 },
  emptyText: { color: COLORS.textSecondary, fontSize: 16, textAlign: "center", paddingVertical: 40 },
  prItem: { backgroundColor: "#1f1f1f", borderRadius: 18, padding: 22, flexDirection: "row", alignItems: "center", marginBottom: 16 }, prItemMobile: { padding: 16, flexWrap: "wrap", gap: 12 },
  prIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: "#075C39", justifyContent: "center", alignItems: "center", marginRight: 20 },
  prContent: { flex: 1, minWidth: 0 }, prContentMobile: { flexBasis: "70%" },
  prTitleRow: { flexDirection: "row", alignItems: "center", gap: 14 }, prTitleRowMobile: { flexWrap: "wrap", gap: 8 },
  prTitle: { color: COLORS.text, fontSize: 20, fontWeight: "800", flexShrink: 1 },
  category: { color: COLORS.primary, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4, fontSize: 13, fontWeight: "700" },
  prRight: { marginLeft: "auto", alignItems: "flex-end" }, prRightMobile: { marginLeft: 0, alignItems: "flex-start" },
  prValue: { color: COLORS.text, fontSize: 28, fontWeight: "800" },
});
