import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Card from "@/src/components/ui/Card";
import { COLORS } from "@/src/constants/colors";

import AuthHeader from "@/src/features/auth/components/AuthHeader";
import LoginForm from "@/src/features/auth/forms/LoginForm";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />

      <Card>
        <LoginForm />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
