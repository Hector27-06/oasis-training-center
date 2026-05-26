import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const memberships = [
  {
    id: "1",
    name: "CrossFit Unlimited",
    description: "Clases ilimitadas de CrossFit",
    price: 120,
    duration: "1 mes",
    members: 98,
  },
  {
    id: "2",
    name: "Hyrox Training",
    description: "Programa especializado Hyrox",
    price: 150,
    duration: "1 mes",
    members: 45,
  },
  {
    id: "3",
    name: "Calistenia",
    description: "Clases de calistenia y bodyweight",
    price: 100,
    duration: "1 mes",
    members: 32,
  },
];

export default function AdminMembershipsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Gestión de Membresías</Text>
          <Text style={styles.subtitle}>Administra planes y precios</Text>
        </View>

        <Pressable style={styles.button}>
          <Ionicons name="add-outline" size={22} color="#000" />
          <Text style={styles.buttonText}>Nueva Membresía</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {memberships.map((item) => (
          <View key={item.id} style={styles.card}>
            <Ionicons name="card-outline" size={34} color="#00ff88" />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <Info label="Precio" value={`$${item.price}`} />
            <Info label="Duración" value={item.duration} />
            <Info label="Miembros" value={`${item.members}`} />

            <Pressable style={styles.details}>
              <Text style={styles.detailsText}>Ver detalles</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  title: { color: "#fff", fontSize: 32, fontWeight: "800" },
  subtitle: { color: "#b8c2cc", marginTop: 6 },
  button: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: { color: "#000", fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 18 },
  card: {
    width: 360,
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 24,
    padding: 24,
  },
  name: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 22 },
  description: { color: "#b8c2cc", marginTop: 8, marginBottom: 22 },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { color: "#b8c2cc" },
  value: { color: "#fff", fontWeight: "800" },
  details: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },
  detailsText: { color: "#fff", fontWeight: "800" },
});
