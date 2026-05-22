import React, { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet } from "react-native";

import { router } from "expo-router";

import Sidebar from "@/src/components/layout/Sidebar";

import UserDashboardContent from "@/src/features/user/components/UserDashboardContent";

import { COLORS } from "@/src/constants/colors";

import { UserMenuItem } from "@/src/constants/menuItems";

import { getRegisteredUser } from "@/src/services/auth.service";

import { useAuthStore } from "@/src/store/auth.store";

export default function MemberDashboardScreen() {
  const [selected, setSelected] = useState<UserMenuItem>("Dashboard");

  const { user, setUser, logout } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      if (user) {
        return;
      }

      const registeredUser = await getRegisteredUser();

      if (registeredUser) {
        setUser({
          id: "local-member",
          name: registeredUser.name,
          email: registeredUser.email,
          role: "member",
        });
      }
    };

    loadUser();
  }, [user, setUser]);

  const handleLogout = () => {
    logout();

    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar
        selected={selected}
        onSelect={(item) => setSelected(item as UserMenuItem)}
        onLogout={handleLogout}
        role="user"
      />

      <UserDashboardContent
        selected={selected}
        userName={user?.name || "Usuario"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "row",

    backgroundColor: COLORS.background,
  },
});
