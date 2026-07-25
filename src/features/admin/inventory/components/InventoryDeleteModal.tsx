import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
  itemName: string;
  loading: boolean;
  errorMessage?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function InventoryDeleteModal({
  visible,
  itemName,
  loading,
  errorMessage,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>!</Text>
          </View>

          <Text style={styles.title}>Eliminar artículo</Text>
          <Text style={styles.message}>
            ¿Seguro que deseas eliminar {itemName}?
          </Text>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              style={[styles.cancelButton, loading && styles.disabled]}
              disabled={loading}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.deleteButton, loading && styles.disabled]}
              disabled={loading}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>
                {loading ? "Eliminando..." : "Eliminar"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 20,
    padding: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a1515",
    marginBottom: 16,
  },
  icon: { color: "#ff6666", fontSize: 24, fontWeight: "900" },
  title: { color: "#fff", fontSize: 22, fontWeight: "900" },
  message: { color: "#b8c2cc", fontSize: 16, marginTop: 8, lineHeight: 23 },
  error: { color: "#ff6666", fontWeight: "700", marginTop: 14 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 24 },
  cancelButton: { backgroundColor: "#2a2a2a", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
  cancelText: { color: "#fff", fontWeight: "800" },
  deleteButton: { backgroundColor: "#3a1515", borderWidth: 1, borderColor: "#ff4444", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
  deleteText: { color: "#ff6666", fontWeight: "800" },
  disabled: { opacity: 0.55 },
});
