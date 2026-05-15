import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

export default function AuthHeader() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logo}>OASIS</Text>
      <Text style={styles.subtitle}>Training Center</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
    fontWeight: "500",
  },
});
