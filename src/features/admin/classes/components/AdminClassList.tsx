import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { GymClass } from "@/src/types/class.types";
import AdminClassCard from "./AdminClassCard";

interface Props { classes: GymClass[]; onEdit: (item: GymClass) => void; onCancel: (id: string) => void; onDelete: (id: string) => void; }

export default function AdminClassList({ classes, onEdit, onCancel, onDelete }: Props) {
  return <View style={styles.card}><Text style={styles.title}>Lista de clases</Text>{classes.length === 0 ? <Text style={styles.empty}>No hay clases registradas</Text> : classes.map((item) => <AdminClassCard key={item.id} item={item} onEdit={onEdit} onCancel={onCancel} onDelete={onDelete} />)}</View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 22, padding: 28 }, title: { color: COLORS.text, fontSize: 28, fontWeight: "800", marginBottom: 20 }, empty: { color: COLORS.textSecondary, fontSize: 16 } });
