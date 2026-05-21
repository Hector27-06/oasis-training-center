import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { MENU_ITEMS, MenuItem } from "@/src/constants/menuItems";

interface Props {
  selected: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const icons: Record<MenuItem, keyof typeof Ionicons.glyphMap> = {
  Dashboard: "grid-outline",
  Clases: "calendar-outline",
  PRs: "trophy-outline",
  Membresía: "card-outline",
  Perfil: "person-outline",
};

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.logoBox}>
        <View style={styles.logoIcon}>
          <Ionicons name="barbell-outline" size={28} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.logo}>OASIS</Text>
          <Text style={styles.logoSub}>Training Center</Text>
        </View>
      </View>

      <View style={styles.userCard}>
        <View style={styles.userIcon}>
          <Ionicons name="person-outline" size={24} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.userName}>Usuario</Text>
          <Text style={styles.userRole}>Miembro</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => {
          const active = selected === item;

          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
              style={[styles.menuItem, active && styles.menuItemActive]}
            >
              <Ionicons
                name={icons[item]}
                size={24}
                color={active ? "#000" : COLORS.textSecondary}
              />

              <Text style={[styles.menuText, active && styles.menuTextActive]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.logout}>
        <Ionicons
          name="log-out-outline"
          size={26}
          color={COLORS.textSecondary}
        />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 355,
    backgroundColor: "#111111",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },

  logoBox: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#064E34",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  logoSub: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  userCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#075C39",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },

  userRole: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  menu: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 14,
  },

  menuItem: {
    height: 60,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    gap: 18,
  },

  menuItemActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },

  menuText: {
    color: COLORS.textSecondary,
    fontSize: 22,
    fontWeight: "700",
  },

  menuTextActive: {
    color: "#000",
  },

  logout: {
    height: 88,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 34,
    gap: 16,
  },

  logoutText: {
    color: COLORS.textSecondary,
    fontSize: 22,
    fontWeight: "700",
  },
});
