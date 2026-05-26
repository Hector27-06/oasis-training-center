import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Proteína Whey",
    category: "Suplementos",
    stock: 18,
  },

  {
    id: "2",
    name: "Toallas",
    category: "Accesorios",
    stock: 35,
  },

  {
    id: "3",
    name: "Agua 1L",
    category: "Bebidas",
    stock: 52,
  },
];

export default function AdminInventoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Inventario</Text>

          <Text style={styles.subtitle}>Registro y control de productos</Text>
        </View>

        <Pressable style={styles.primaryButton}>
          <Ionicons name="add-outline" size={22} color="#000" />

          <Text style={styles.primaryText}>Nuevo Producto</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton}>
          <Ionicons name="arrow-down-outline" size={20} color="#00ff88" />

          <Text style={styles.secondaryText}>Registrar Entrada</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <Ionicons name="arrow-up-outline" size={20} color="#00ff88" />

          <Text style={styles.secondaryText}>Registrar Salida</Text>
        </Pressable>
      </View>

      {products.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.product}>{item.name}</Text>

            <Text style={styles.category}>{item.category}</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.stock}>{item.stock}</Text>

            <Text style={styles.stockLabel}>stock</Text>

            <View style={styles.icons}>
              <Ionicons name="create-outline" size={22} color="#aaa" />

              <Ionicons name="trash-outline" size={22} color="#aaa" />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },

  subtitle: {
    color: "#b8c2cc",
    marginTop: 6,
  },

  primaryButton: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  primaryText: {
    color: "#000",
    fontWeight: "900",
  },

  actions: {
    flexDirection: "row",
    gap: 14,
    marginTop: 24,
    marginBottom: 24,
  },

  secondaryButton: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  secondaryText: {
    color: "#00ff88",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  product: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  category: {
    color: "#b8c2cc",
    marginTop: 6,
  },

  right: {
    alignItems: "flex-end",
  },

  stock: {
    color: "#00ff88",
    fontSize: 28,
    fontWeight: "900",
  },

  stockLabel: {
    color: "#aaa",
  },

  icons: {
    flexDirection: "row",
    gap: 14,
    marginTop: 12,
  },
});
