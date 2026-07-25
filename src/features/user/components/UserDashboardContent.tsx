import React from "react";
import { StyleSheet } from "react-native";

import ResponsiveScrollView from "@/src/components/layout/ResponsiveScrollView";
import { UserMenuItem } from "@/src/constants/menuItems";

import UserClassesScreen from "@/src/features/user/screens/UserClassesScreen";
import UserDashboardOverview from "@/src/features/user/screens/UserDashboardOverview";
import UserMembershipScreen from "@/src/features/user/screens/UserMembershipScreen";
import UserNotificationsScreen from "@/src/features/user/screens/UserNotificationsScreen";
import UserProfileScreen from "@/src/features/user/screens/UserProfileScreen";
import UserPrsScreen from "@/src/features/user/screens/UserPrsScreen";

import { NotificationProvider } from "@/src/context/NotificationContext";
import { useAuthStore } from "@/src/store/auth.store";

interface Props {
  selected: UserMenuItem;
  userName: string;
}

export default function UserDashboardContent({ selected, userName }: Props) {
  const { user } = useAuthStore();
  if (selected === "Notificaciones") {
    return (
      <NotificationProvider>
        <UserNotificationsScreen />
      </NotificationProvider>
    );
  }

  return (
    <ResponsiveScrollView contentStyle={styles.inner}>
      {selected === "Dashboard" && (
        <UserDashboardOverview userName={userName} />
      )}

      {selected === "Clases" && (
        <UserClassesScreen clientId={user?.client?.id} />
      )}

      {selected === "PRs" && <UserPrsScreen />}

      {selected === "Membresía" && <UserMembershipScreen />}

      {selected === "Perfil" && <UserProfileScreen userName={userName} />}
    </ResponsiveScrollView>
  );
}

const styles = StyleSheet.create({
  inner: { maxWidth: 1120, alignSelf: "center" },
});
