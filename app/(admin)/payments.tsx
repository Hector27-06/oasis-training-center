import { SafeAreaView, StyleSheet } from "react-native";

import AdminPaymentsScreen from "@/src/features/admin/screens/AdminPaymentsScreen";

export default function PaymentsScreen() {
  return <SafeAreaView style={styles.container}><AdminPaymentsScreen /></SafeAreaView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#0b0b0b" } });
