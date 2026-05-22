import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { COLORS } from "@/src/constants/colors";
import { UserMenuItem } from "@/src/constants/menuItems";

import UserClassesScreen from "@/src/features/user/screens/UserClassesScreen";
import UserDashboardOverview from "@/src/features/user/screens/UserDashboardOverview";
import UserMembershipScreen from "@/src/features/user/screens/UserMembershipScreen";
import UserProfileScreen from "@/src/features/user/screens/UserProfileScreen";
import UserPrsScreen from "@/src/features/user/screens/UserPrsScreen";

interface Props {
  selected: UserMenuItem;
  userName: string;
}

export default function UserDashboardContent({ selected, userName }: Props) {
  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.inner}
      showsVerticalScrollIndicator={false}
    >
      {selected === "Dashboard" && (
        <UserDashboardOverview userName={userName} />
      )}

      {selected === "Clases" && <UserClassesScreen />}

      {selected === "PRs" && <UserPrsScreen />}

      {selected === "Membresía" && <UserMembershipScreen />}

      {selected === "Perfil" && <UserProfileScreen userName={userName} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  inner: {
    padding: 32,
  },
});
