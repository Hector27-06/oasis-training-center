import React, { useState } from "react";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import AdminInventoryScreen from "../screens/AdminInventoryScreen";
import AdminMembershipsScreen from "../screens/AdminMembershipsScreen";
import AdminOverviewScreen from "../screens/AdminOverviewScreen";
import AdminScheduleScreen from "../screens/AdminScheduleScreen";
import AdminSettingsScreen from "../screens/AdminSettingsScreen";
import AdminUsersScreen from "../screens/AdminUsersScreen";

type Tab =
  | "Dashboard"
  | "Usuarios"
  | "Membresías"
  | "Horarios"
  | "Inventario"
  | "Configuración";

export default function AdminDashboardContent() {
  const [selected, setSelected] = useState<Tab>("Dashboard");

  const renderScreen = () => {
    switch (selected) {
      case "Dashboard":
        return <AdminOverviewScreen />;

      case "Usuarios":
        return <AdminUsersScreen />;

      case "Membresías":
        return <AdminMembershipsScreen />;

      case "Horarios":
        return <AdminScheduleScreen />;

      case "Inventario":
        return <AdminInventoryScreen />;

      case "Configuración":
        return <AdminSettingsScreen />;

      default:
        return <AdminOverviewScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <View>
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Ionicons name="barbell-outline" size={28} color="#00ff88" />
            </View>

            <View>
              <Text style={styles.logo}>OASIS</Text>

              <Text style={styles.logoSubtitle}>Training Center</Text>
            </View>
          </View>

          {/* ADMIN CARD */}
          <View style={styles.adminCard}>
            <View style={styles.adminIcon}>
              <Ionicons name="person-outline" size={24} color="#00ff88" />
            </View>

            <View>
              <Text style={styles.adminName}>Admin</Text>

              <Text style={styles.adminRole}>Administrador</Text>
            </View>
          </View>

          {/* MENU */}
          <View style={styles.menu}>
            <MenuItem
              label="Dashboard"
              icon="grid-outline"
              active={selected === "Dashboard"}
              onPress={() => setSelected("Dashboard")}
            />

            <MenuItem
              label="Usuarios"
              icon="people-outline"
              active={selected === "Usuarios"}
              onPress={() => setSelected("Usuarios")}
            />

            <MenuItem
              label="Membresías"
              icon="card-outline"
              active={selected === "Membresías"}
              onPress={() => setSelected("Membresías")}
            />

            <MenuItem
              label="Horarios"
              icon="calendar-outline"
              active={selected === "Horarios"}
              onPress={() => setSelected("Horarios")}
            />

            <MenuItem
              label="Inventario"
              icon="cube-outline"
              active={selected === "Inventario"}
              onPress={() => setSelected("Inventario")}
            />

            <MenuItem
              label="Configuración"
              icon="settings-outline"
              active={selected === "Configuración"}
              onPress={() => setSelected("Configuración")}
            />
          </View>
        </View>

        {/* LOGOUT */}
        <Pressable
          style={styles.logout}
          onPress={() => router.replace("/login")}
        >
          <Ionicons name="log-out-outline" size={22} color="#9ca3af" />

          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>{renderScreen()}</View>
    </SafeAreaView>
  );
}

function MenuItem({ label, icon, active, onPress }: any) {
  return (
    <Pressable
      style={[styles.menuItem, active && styles.menuItemActive]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={22} color={active ? "#000" : "#9ca3af"} />

      <Text style={[styles.menuText, active && styles.menuTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0b0b0b",
  },

  sidebar: {
    width: 290,
    backgroundColor: "#050505",
    borderRightWidth: 1,
    borderRightColor: "#1f1f1f",
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 22,
    marginBottom: 24,
  },

  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#062b1a",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },

  logoSubtitle: {
    color: "#b8c2cc",
    marginTop: 2,
  },

  adminCard: {
    height: 84,
    backgroundColor: "#171717",
    borderRadius: 18,
    marginHorizontal: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },

  adminIcon: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "#063d26",
    justifyContent: "center",
    alignItems: "center",
  },

  adminName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  adminRole: {
    color: "#b8c2cc",
    marginTop: 4,
  },

  menu: {
    paddingHorizontal: 10,
    gap: 8,
  },

  menuItem: {
    height: 64,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  menuItemActive: {
    backgroundColor: "#00ff88",
  },

  menuText: {
    color: "#9ca3af",
    fontSize: 18,
    fontWeight: "800",
  },

  menuTextActive: {
    color: "#000",
  },

  logout: {
    height: 60,
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
  },

  logoutText: {
    color: "#9ca3af",
    fontSize: 16,
    fontWeight: "800",
  },

  content: {
    flex: 1,
  },
});
