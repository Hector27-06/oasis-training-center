import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AdminRegisterUserScreen from "./AdminRegisterUserScreen";

const users = [
  {
    id: "1",
    name: "María González",
    email: "maria@email.com",
    membership: "CrossFit Unlimited",
    status: "Activo",
    expires: "2026-06-15",
  },
  {
    id: "2",
    name: "Pedro Martínez",
    email: "pedro@email.com",
    membership: "Hyrox Training",
    status: "Activo",
    expires: "2026-05-28",
  },
  {
    id: "3",
    name: "Laura Sánchez",
    email: "laura@email.com",
    membership: "Calistenia",
    status: "Activo",
    expires: "2026-07-10",
  },
  {
    id: "4",
    name: "Carlos Ruiz",
    email: "carlos@email.com",
    membership: "Open Box",
    status: "Vencido",
    expires: "2026-05-05",
  },
  {
    id: "5",
    name: "Ana López",
    email: "ana@email.com",
    membership: "CrossFit Unlimited",
    status: "Por vencer",
    expires: "2026-05-18",
  },
];

export default function AdminUsersScreen() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <AdminRegisterUserScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>Gestión de Usuarios</Text>

          <Text style={styles.subtitle}>
            Usuarios generados automáticamente desde clientes registrados
          </Text>
        </View>

        <Pressable
          style={styles.registerButton}
          onPress={() => setShowRegister(true)}
        >
          <Ionicons name="person-add-outline" size={20} color="#000" />

          <Text style={styles.registerText}>Registrar Cliente</Text>
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={24} color="#9ca3af" />

        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre, email o membresía..."
          placeholderTextColor="#8b8b8b"
        />
      </View>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={[styles.th, { flex: 1.5 }]}>Usuario</Text>

          <Text style={[styles.th, { flex: 1.5 }]}>Membresía</Text>

          <Text style={[styles.th, { flex: 1 }]}>Estado</Text>

          <Text style={[styles.th, { flex: 1 }]}>Vencimiento</Text>

          <Text
            style={[
              styles.th,
              {
                width: 90,
                textAlign: "right",
              },
            ]}
          >
            Acciones
          </Text>
        </View>

        {users.map((user) => (
          <View key={user.id} style={styles.row}>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.name}>{user.name}</Text>

              <Text style={styles.email}>{user.email}</Text>
            </View>

            <Text style={[styles.membership, { flex: 1.5 }]}>
              {user.membership}
            </Text>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.badge,
                  user.status === "Activo" && styles.active,

                  user.status === "Vencido" && styles.expired,

                  user.status === "Por vencer" && styles.warning,
                ]}
              >
                {user.status}
              </Text>
            </View>

            <Text style={[styles.date, { flex: 1 }]}>{user.expires}</Text>

            <View style={styles.actions}>
              <Ionicons name="create-outline" size={20} color="#9ca3af" />

              <Ionicons name="trash-outline" size={20} color="#9ca3af" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 24,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#b8c2cc",
    fontSize: 16,
    marginTop: 6,
  },

  registerButton: {
    backgroundColor: "#00ff88",
    height: 56,
    paddingHorizontal: 22,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  registerText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 15,
  },

  searchBox: {
    height: 68,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  table: {
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 18,
    overflow: "hidden",
  },

  headerRow: {
    height: 56,
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  th: {
    color: "#b8c2cc",
    fontWeight: "800",
  },

  row: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#242424",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  email: {
    color: "#b8c2cc",
    marginTop: 4,
  },

  membership: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 13,
    fontWeight: "900",
  },

  active: {
    color: "#00ff88",
    backgroundColor: "#063d26",
  },

  expired: {
    color: "#ff4d4d",
    backgroundColor: "#3a1515",
  },

  warning: {
    color: "#facc15",
    backgroundColor: "#3b3004",
  },

  date: {
    color: "#fff",
    fontSize: 16,
  },

  actions: {
    width: 90,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
  },
});
