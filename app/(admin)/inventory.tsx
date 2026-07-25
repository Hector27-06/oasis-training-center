import { SafeAreaView, StyleSheet } from "react-native";

import AdminInventoryScreen from "@/src/features/admin/screens/AdminInventoryScreen";

export default function InventoryScreen() {
  return <SafeAreaView style={styles.container}><AdminInventoryScreen /></SafeAreaView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#0b0b0b" } });
