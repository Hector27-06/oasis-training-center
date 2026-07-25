import React, { useState } from "react";

import { router } from "expo-router";

import DashboardShell from "@/src/components/layout/DashboardShell";
import Sidebar from "@/src/components/layout/Sidebar";

import UserDashboardContent from "@/src/features/user/components/UserDashboardContent";

import { UserMenuItem } from "@/src/constants/menuItems";

import { authService } from "@/src/services/auth.service";

import { useAuthStore } from "@/src/store/auth.store";

export default function MemberDashboardScreen() {
  const [selected, setSelected] = useState<UserMenuItem>("Dashboard");

  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      router.replace("/login");
    }
  };

  return (
    <DashboardShell
      desktopNavigation={<Sidebar
        selected={selected}
        onSelect={(item) => setSelected(item as UserMenuItem)}
        onLogout={handleLogout}
        role="user"
      />}
      mobileNavigation={<Sidebar
        selected={selected}
        onSelect={(item) => setSelected(item as UserMenuItem)}
        onLogout={handleLogout}
        role="user"
      />}
      mobileNavigationPosition="footer"
    >
      <UserDashboardContent
        selected={selected}
        userName={user?.name || "Usuario"}
      />
    </DashboardShell>
  );
}
