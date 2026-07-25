import React from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MobileNavigation from "@/src/components/layout/MobileNavigation";
import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";

import {
  adminMenu,
  AdminMenuItem,
  memberMenu,
  UserMenuItem,
} from "@/src/constants/menuItems";

type Props = {
  selected: UserMenuItem | AdminMenuItem;

  onSelect: (item: UserMenuItem | AdminMenuItem) => void;

  onLogout: () => void;

  role?: "user" | "admin";
};

export default function Sidebar({
  selected,
  onSelect,
  onLogout,
  role = "user",
}: Props) {
  const menu = role === "admin" ? adminMenu : memberMenu;
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
      {isMobile ? (
        <MobileNavigation<UserMenuItem | AdminMenuItem>
          items={menu}
          selected={selected}
          onSelect={onSelect}
          onLogout={onLogout}
          position="top"
        />
      ) : (
        <View>
          <View
            style={[
              styles.logoContainer,
              isMobile && styles.logoContainerMobile,
            ]}
          >
            <View style={styles.logoBox}>
              <Ionicons
                name="barbell-outline"
                size={28}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.logo}>OASIS</Text>

              <Text style={styles.subtitle}>Training Center</Text>
            </View>
          </View>

          <View style={styles.menu}>
            {menu.map((item) => {
              const active = selected === item.label;

              return (
                <Pressable
                  key={item.label}
                  onPress={() => onSelect(item.label as any)}
                  style={[styles.menuItem, active && styles.menuItemActive]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={26}
                    color={active ? "#000" : COLORS.textSecondary}
                  />

                  <Text
                    style={[styles.menuText, active && styles.menuTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      {!isMobile ? (
        <Pressable
          style={({ pressed }) => [
            styles.logout,
            pressed && styles.logoutPressed,
          ]}
          onPress={onLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={COLORS.textSecondary}
          />

          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 300,
    backgroundColor: "#050505",
    borderRightWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "space-between",
  },
  sidebarMobile: { width: "100%", flexShrink: 0 },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  logoContainerMobile: { display: "none" },

  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#072B1C",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },

  menu: {
    gap: 10,
    paddingHorizontal: 12,
  },

  menuItem: {
    height: 72,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 22,
  },

  menuItemActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },

  logoutPressed: {
    opacity: 0.6,
  },

  logoutText: {
    color: COLORS.textSecondary,
    fontSize: 20,
    fontWeight: "700",
  },
});
