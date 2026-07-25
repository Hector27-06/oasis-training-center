import { SafeAreaView, StyleSheet } from "react-native";

import AdminMembershipsScreen from "@/src/features/admin/screens/AdminMembershipsScreen";

export default function MembershipsScreen() {
  return <SafeAreaView style={styles.container}><AdminMembershipsScreen /></SafeAreaView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#0b0b0b" } });
