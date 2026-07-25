import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";
import { activityService } from "@/src/services/activity.service";
import { Activity } from "@/src/types/activity.types";
import { ClassForm } from "@/src/types/class.types";

interface Props {
  form: ClassForm;
  editing: boolean;
  onChange: (form: ClassForm) => void;
  onSave: () => void;
  onCancelEdit: () => void;
}

export default function AdminClassForm({
  form,
  editing,
  onChange,
  onSave,
  onCancelEdit,
}: Props) {
  const { isMobile, layout } = useResponsive();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesError, setActivitiesError] = useState("");

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setActivities(await activityService.getActivities());
      } catch {
        setActivitiesError("No fue posible cargar las actividades.");
      }
    };

    loadActivities();
  }, []);

  return (
    <View style={[styles.card, isMobile && { padding: layout.cardPadding, marginBottom: layout.sectionGap }]}>
      <Text style={styles.title}>
        {editing ? "Editar clase" : "Agregar nueva clase"}
      </Text>

      <View style={styles.grid}>
        <Input label="Nombre" value={form.name} onChangeText={(name) => onChange({ ...form, name })} />
        <Input label="Descripción" value={form.description} onChangeText={(description) => onChange({ ...form, description })} />
        <Input label="Fecha (YYYY-MM-DD)" value={form.date} onChangeText={(date) => onChange({ ...form, date })} />
        <Input label="Hora inicio (HH:mm)" value={form.startTime} onChangeText={(startTime) => onChange({ ...form, startTime })} />
        <Input label="Hora fin (HH:mm)" value={form.endTime} onChangeText={(endTime) => onChange({ ...form, endTime })} />
        <Input label="Instructor" value={form.instructorName} onChangeText={(instructorName) => onChange({ ...form, instructorName })} />
        <Input label="Capacidad" value={form.capacity} keyboardType="numeric" onChangeText={(capacity) => onChange({ ...form, capacity: capacity.replace(/[^0-9]/g, "") })} />
      </View>

      <Text style={styles.label}>Actividad</Text>
      {activitiesError ? <Text style={styles.error}>{activitiesError}</Text> : null}
      <View style={styles.activities}>
        <Pressable
          style={[styles.activity, form.activityId === null && styles.activitySelected]}
          onPress={() => onChange({ ...form, activityId: null })}
        >
          <Text style={[styles.activityText, form.activityId === null && styles.activityTextSelected]}>
            Sin actividad
          </Text>
        </Pressable>
        {activities.map((activity) => (
          <Pressable
            key={activity.id}
            style={[styles.activity, form.activityId === activity.id && styles.activitySelected]}
            onPress={() => onChange({ ...form, activityId: activity.id })}
          >
            <Text style={[styles.activityText, form.activityId === activity.id && styles.activityTextSelected]}>
              {activity.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.actions, isMobile && styles.actionsMobile]}>
        {editing ? <Pressable style={styles.secondaryButton} onPress={onCancelEdit}><Text style={styles.secondaryText}>Cancelar edición</Text></Pressable> : null}
        <Pressable style={styles.primaryButton} onPress={onSave}><Text style={styles.primaryText}>{editing ? "Guardar cambios" : "Agendar clase"}</Text></Pressable>
      </View>
    </View>
  );
}

function Input({ label, value, onChangeText, keyboardType }: { label: string; value: string; onChangeText: (text: string) => void; keyboardType?: "default" | "numeric" }) {
  return <View style={styles.inputGroup}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} keyboardType={keyboardType} placeholderTextColor={COLORS.textSecondary} style={styles.input} /></View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 22, padding: 28, marginBottom: 30 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: "800", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  inputGroup: { flexGrow: 1, flexBasis: 220, minWidth: 0 }, label: { color: COLORS.textSecondary, fontWeight: "700", marginBottom: 8 },
  input: { height: 56, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: 16, color: COLORS.text, fontSize: 16 },
  activities: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, activity: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
  activitySelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary }, activityText: { color: COLORS.textSecondary, fontWeight: "700" }, activityTextSelected: { color: "#000" },
  error: { color: COLORS.danger, marginBottom: 8 }, actions: { flexDirection: "row", justifyContent: "flex-end", gap: 14, marginTop: 24 }, actionsMobile: { flexDirection: "column-reverse", alignItems: "stretch" },
  primaryButton: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 26 }, primaryText: { color: "#000", fontWeight: "800", fontSize: 17 },
  secondaryButton: { backgroundColor: "#242424", borderRadius: 14, paddingVertical: 16, paddingHorizontal: 26 }, secondaryText: { color: COLORS.text, fontWeight: "800", fontSize: 17 },
});
