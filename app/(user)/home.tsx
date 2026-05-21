import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Sidebar from "@/src/components/layout/Sidebar";
import DashboardContent from "@/src/components/ui/DashboardContent";

import { COLORS } from "@/src/constants/colors";
import { MenuItem } from "@/src/constants/menuItems";

export default function HomeScreen() {
  const [selected, setSelected] = useState<MenuItem>("Dashboard");

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar selected={selected} onSelect={setSelected} />
      <DashboardContent selected={selected} />
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
