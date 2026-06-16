import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { days } from "../data/mockClasses";
import { ClassForm } from "../types/class.types";

type Props = {
  form: ClassForm;
  editing: boolean;
  onChange: (form: ClassForm) => void;
  onSave: () => void;
  onCancelEdit: () => void;
};

export default function AdminClassForm({
  form,
  editing,
  onChange,
  onSave,
  onCancelEdit,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {editing ? "Editar clase" : "Agregar nueva clase"}
      </Text>

      <View style={styles.daysRow}>
        {days.map((day) => (
          <Pressable
            key={day}
            onPress={() => onChange({ ...form, day })}
            style={[styles.dayButton, form.day === day && styles.dayActive]}
          >
            <Text
              style={[styles.dayText, form.day === day && styles.dayTextActive]}
            >
              {day}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        <Input
          placeholder="Nombre de clase"
          value={form.name}
          onChangeText={(name) => onChange({ ...form, name })}
        />
        <Input
          placeholder="Categoría"
          value={form.category}
          onChangeText={(category) => onChange({ ...form, category })}
        />
        <Input
          placeholder="Hora, ejemplo: 06:00"
          value={form.time}
          onChangeText={(time) => onChange({ ...form, time })}
        />
        <Input
          placeholder="Duración, ejemplo: 60 min"
          value={form.duration}
          onChangeText={(duration) => onChange({ ...form, duration })}
        />
        <Input
          placeholder="Coach"
          value={form.coach}
          onChangeText={(coach) => onChange({ ...form, coach })}
        />
        <Input
          placeholder="Capacidad"
          value={form.capacity}
          onChangeText={(capacity) => onChange({ ...form, capacity })}
        />
      </View>

      <View style={styles.actions}>
        {editing && (
          <Pressable style={styles.secondaryButton} onPress={onCancelEdit}>
            <Text style={styles.secondaryText}>Cancelar edición</Text>
          </Pressable>
        )}

        <Pressable style={styles.primaryButton} onPress={onSave}>
          <Text style={styles.primaryText}>
            {editing ? "Guardar cambios" : "Agendar clase"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Input({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.textSecondary}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    padding: 28,
    marginBottom: 30,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  daysRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 22,
  },

  dayButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  dayActive: {
    backgroundColor: COLORS.primary,
  },

  dayText: {
    color: COLORS.textSecondary,
    fontWeight: "700",
  },

  dayTextActive: {
    color: "#000",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  input: {
    width: "48%",
    height: 56,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 16,
    outlineStyle: "none" as any,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 14,
    marginTop: 24,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 26,
  },

  primaryText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 17,
  },

  secondaryButton: {
    backgroundColor: "#242424",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 26,
  },

  secondaryText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 17,
  },
});
