import { SafeAreaView, StyleSheet } from "react-native";

import AdminUsersScreen from "@/src/features/admin/screens/AdminUsersScreen";

export default function UsersScreen() {
  return <SafeAreaView style={styles.container}><AdminUsersScreen /></SafeAreaView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#0b0b0b" } });
