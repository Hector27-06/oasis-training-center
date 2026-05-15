import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { router } from "expo-router";

import Card from "@/src/components/ui/Card";
import TabSwitcher from "@/src/components/ui/TabSwitcher";

import { COLORS } from "@/src/constants/colors";

import AuthHeader from "@/src/features/auth/components/AuthHeader";
import LoginForm from "@/src/features/auth/forms/LoginForm";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />

      <Card>
        <TabSwitcher
          activeTab="login"
          onChange={(tab) => {
            if (tab === "register") {
              router.push("/register");
            }
          }}
        />

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
