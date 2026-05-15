import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

interface Props {
  activeTab: "login" | "register";
  onChange: (tab: "login" | "register") => void;
}

export default function TabSwitcher({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "login" && styles.activeTab]}
        onPress={() => onChange("login")}
      >
        <Text style={[styles.text, activeTab === "login" && styles.activeText]}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "register" && styles.activeTab]}
        onPress={() => onChange("register")}
      >
        <Text
          style={[styles.text, activeTab === "register" && styles.activeText]}
        >
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    backgroundColor: "#181818",

    borderRadius: 16,

    padding: 6,

    marginBottom: 28,
  },

  tab: {
    flex: 1,

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#00FF88",
  },

  text: {
    color: COLORS.textSecondary,

    fontSize: 15,

    fontWeight: "500",
  },

  activeText: {
    color: "#000",
  },
});
