import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { router } from "expo-router";

import Card from "@/src/components/ui/Card";
import TabSwitcher from "@/src/components/ui/TabSwitcher";

import { COLORS } from "@/src/constants/colors";

import AuthHeader from "@/src/features/auth/components/AuthHeader";
import RegisterForm from "@/src/features/auth/forms/RegisterForm";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />

      <Card>
        <TabSwitcher
          activeTab="register"
          onChange={(tab) => {
            if (tab === "login") {
              router.push("/login");
            }
          }}
        />

        <RegisterForm />
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
