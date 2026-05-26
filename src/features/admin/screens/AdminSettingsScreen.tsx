import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AdminSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.subtitle}>Configuración básica</Text>

      <Text style={styles.label}>Nombre del gimnasio</Text>
      <TextInput style={styles.input} value="OASIS Training Center" />

      <Text style={styles.label}>Correo</Text>
      <TextInput style={styles.input} value="contacto@oasis.com" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value="614 000 0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 24 },
  title: { color: "#fff", fontSize: 32, fontWeight: "800" },
  subtitle: { color: "#b8c2cc", marginTop: 6, marginBottom: 24 },
  label: { color: "#b8c2cc", marginBottom: 8 },
  input: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    padding: 14,
    color: "#fff",
    marginBottom: 18,
  },
});
