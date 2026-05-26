import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import AdminDashboardContent from "@/src/features/admin/components/AdminDashboardContent";

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <AdminDashboardContent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
});
