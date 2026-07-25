import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import ResponsiveScrollView from "@/src/components/layout/ResponsiveScrollView";
import { COLORS } from "@/src/constants/colors";
import AdminClassForm from "@/src/features/admin/classes/components/AdminClassForm";
import AdminClassList from "@/src/features/admin/classes/components/AdminClassList";
import { classService } from "@/src/services/class.service";
import { ClassForm, emptyClassForm, GymClass } from "@/src/types/class.types";

export default function AdminScheduleScreen() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [editingClass, setEditingClass] = useState<GymClass | null>(null);
  const [form, setForm] = useState<ClassForm>(emptyClassForm);

  const loadClasses = async () => {
    try {
      setClasses(await classService.getClasses());
    } catch {
      Alert.alert("Error", "No fue posible cargar las clases.");
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const resetForm = () => {
    setEditingClass(null);
    setForm(emptyClassForm);
  };

  const saveClass = async () => {
    if (!form.name || !form.date || !form.startTime || !form.endTime || !form.instructorName || !form.capacity) {
      Alert.alert("Campos incompletos", "Completa la información de la clase.");
      return;
    }

    const capacity = Number(form.capacity);
    const startTime = new Date(`${form.date}T${form.startTime}:00`);
    const endTime = new Date(`${form.date}T${form.endTime}:00`);

    if (!Number.isInteger(capacity) || capacity <= 0 || Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime()) || endTime <= startTime) {
      Alert.alert("Datos inválidos", "Revisa capacidad, fecha y horario de la clase.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      capacity,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      instructorName: form.instructorName.trim(),
      activityId: form.activityId,
    };

    try {
      if (editingClass) {
        await classService.updateClass(editingClass.id, payload);
      } else {
        await classService.createClass(payload);
      }
      resetForm();
      await loadClasses();
    } catch {
      Alert.alert("Error", "No fue posible guardar la clase.");
    }
  };

  const editClass = (gymClass: GymClass) => {
    const startTime = new Date(gymClass.startTime);
    const endTime = new Date(gymClass.endTime);
    setEditingClass(gymClass);
    setForm({
      name: gymClass.name,
      description: gymClass.description || "",
      activityId: gymClass.activity?.id || null,
      date: gymClass.startTime.slice(0, 10),
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      instructorName: gymClass.instructorName,
      capacity: String(gymClass.capacity),
    });
  };

  const cancelClass = async (id: string) => {
    try {
      await classService.updateClass(id, { status: "CANCELLED" });
      await loadClasses();
    } catch {
      Alert.alert("Error", "No fue posible cancelar la clase.");
    }
  };

  const deleteClass = async (id: string) => {
    try {
      await classService.deleteClass(id);
      await loadClasses();
    } catch {
      Alert.alert("Error", "No fue posible eliminar la clase. Cancela primero sus reservas activas.");
    }
  };

  return <ResponsiveScrollView contentStyle={styles.content}><View style={styles.header}><Text style={styles.title}>Organizador de clases</Text><Text style={styles.subtitle}>Agenda, edita o cancela clases para los usuarios</Text></View><AdminClassForm form={form} editing={Boolean(editingClass)} onChange={setForm} onSave={saveClass} onCancelEdit={resetForm} /><AdminClassList classes={classes} onEdit={editClass} onCancel={cancelClass} onDelete={deleteClass} /></ResponsiveScrollView>;
}

const styles = StyleSheet.create({ content: { maxWidth: 1120, alignSelf: "center" }, header: { marginBottom: 28 }, title: { color: COLORS.text, fontSize: 38, fontWeight: "800" }, subtitle: { color: COLORS.textSecondary, fontSize: 20, marginTop: 8 } });
