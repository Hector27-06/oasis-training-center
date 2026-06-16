import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

import AdminClassForm from "@/src/features/admin/classes/components/AdminClassForm";
import AdminClassList from "@/src/features/admin/classes/components/AdminClassList";

import {
  emptyClassForm,
  mockClasses,
} from "@/src/features/admin/classes/data/mockClasses";

import {
  ClassForm,
  GymClass,
} from "@/src/features/admin/classes/types/class.types";

export default function AdminClassesScreen() {
  const [classes, setClasses] = useState<GymClass[]>(mockClasses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ClassForm>(emptyClassForm);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyClassForm);
  };

  const saveClass = () => {
    if (
      !form.name ||
      !form.category ||
      !form.time ||
      !form.duration ||
      !form.capacity
    ) {
      Alert.alert("Campos incompletos", "Completa la información de la clase.");
      return;
    }

    if (editingId) {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                coach: form.coach || "-",
                capacity: Number(form.capacity),
                status:
                  item.reserved >= Number(form.capacity) ? "full" : "available",
              }
            : item,
        ),
      );

      resetForm();
      return;
    }

    setClasses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...form,
        coach: form.coach || "-",
        capacity: Number(form.capacity),
        reserved: 0,
        status: "available",
      },
    ]);

    resetForm();
  };

  const editClass = (item: GymClass) => {
    setEditingId(item.id);

    setForm({
      day: item.day,
      name: item.name,
      category: item.category,
      time: item.time,
      duration: item.duration,
      coach: item.coach,
      capacity: String(item.capacity),
    });
  };

  const cancelClass = (id: string) => {
    setClasses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "cancelled" } : item,
      ),
    );
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Organizador de clases</Text>
        <Text style={styles.subtitle}>
          Agenda, edita o cancela clases para los usuarios
        </Text>
      </View>

      <AdminClassForm
        form={form}
        editing={Boolean(editingId)}
        onChange={setForm}
        onSave={saveClass}
        onCancelEdit={resetForm}
      />

      <AdminClassList
        classes={classes}
        onEdit={editClass}
        onCancel={cancelClass}
        onDelete={deleteClass}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 32,
    paddingBottom: 60,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 20,
    marginTop: 8,
  },
});
