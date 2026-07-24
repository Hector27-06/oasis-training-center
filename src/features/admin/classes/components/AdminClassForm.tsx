import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.card, isMobile && styles.cardMobile]}>
      <Text style={[styles.title, isMobile && styles.titleMobile]}>
        {editing ? "Editar clase" : "Agregar nueva clase"}
      </Text>

      <View style={styles.daysRow}>
        {days.map((day) => (
          <Pressable
            key={day}
            onPress={() => onChange({ ...form, day })}
            style={[
              styles.dayButton,
              form.day === day && styles.dayActive,
              isMobile && styles.dayButtonMobile,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                form.day === day && styles.dayTextActive,
                isMobile && styles.dayTextMobile,
              ]}
              numberOfLines={1}
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
          isMobile={isMobile}
        />
        <Input
          placeholder="Categoría"
          value={form.category}
          onChangeText={(category) => onChange({ ...form, category })}
          isMobile={isMobile}
        />
        <Input
          placeholder="Hora, ejemplo: 06:00"
          value={form.time}
          onChangeText={(time) => onChange({ ...form, time })}
          isMobile={isMobile}
        />
        <Input
          placeholder="Duración, ejemplo: 60 min"
          value={form.duration}
          onChangeText={(duration) => onChange({ ...form, duration })}
          isMobile={isMobile}
        />
        <Input
          placeholder="Coach"
          value={form.coach}
          onChangeText={(coach) => onChange({ ...form, coach })}
          isMobile={isMobile}
        />
        <Input
          placeholder="Capacidad"
          value={form.capacity}
          onChangeText={(capacity) => onChange({ ...form, capacity })}
          isMobile={isMobile}
        />
      </View>

      <View style={[styles.actions, isMobile && styles.actionsMobile]}>
        {editing && (
          <Pressable
            style={[
              styles.secondaryButton,
              isMobile && styles.actionButtonFullMobile,
            ]}
            onPress={onCancelEdit}
          >
            <Text style={styles.secondaryText}>Cancelar edición</Text>
          </Pressable>
        )}

        <Pressable
          style={[
            styles.primaryButton,
            isMobile && styles.actionButtonFullMobile,
          ]}
          onPress={onSave}
        >
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
  isMobile,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isMobile?: boolean;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.textSecondary}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, isMobile && styles.inputMobile]}
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

  daysRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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

  dayButtonMobile: {
    width: "31%",
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  dayActive: {
    backgroundColor: COLORS.primary,
  },

  dayText: {
    color: COLORS.textSecondary,
    fontWeight: "700",
  },

  dayTextMobile: {
    fontSize: 13,
    textAlign: "center",
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

  inputMobile: {
    width: "100%",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 14,
    marginTop: 24,
  },

  actionsMobile: {
    flexDirection: "column",
    gap: 12,
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
    textAlign: "center",
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
    textAlign: "center",
  },

  actionButtonFullMobile: {
    width: "100%",
    alignItems: "center",
  },
});
