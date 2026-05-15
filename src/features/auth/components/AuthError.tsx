import React from "react";
import { StyleSheet, Text } from "react-native";

export default function AuthError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "#ff4d4f",
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "500",
  },
});
