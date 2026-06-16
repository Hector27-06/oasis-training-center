import React, { useState } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/src/constants/colors";

interface Props {
  label: string;

  placeholder: string;

  secureTextEntry?: boolean;

  value: string;

  onChangeText: (text: string) => void;

  icon: keyof typeof Ionicons.glyphMap;

  inputMode?: "text" | "email";
}

export default function Input({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  icon,
  inputMode = "text",
}: Props) {
  const [focused, setFocused] = useState(false);

  const webDisableAutofill = {
    autoComplete: "off",

    autoCorrect: "off",

    autoCapitalize: "none",

    spellCheck: false,

    name: `no-autofill-${label}-${Date.now()}`,

    id: `no-autofill-${label}-${Date.now()}`,
  } as any;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, focused && styles.inputFocused]}>
        <Ionicons
          name={icon}
          size={20}
          color={focused ? COLORS.primary : COLORS.textSecondary}
          style={styles.icon}
        />

        <TextInput
          {...webDisableAutofill}
          placeholder={placeholder}
          placeholderTextColor="#737373"
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          textContentType="none"
          selectionColor={COLORS.primary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.textSecondary,

    marginBottom: 8,

    fontSize: 14,

    fontWeight: "500",
  },

  inputContainer: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.input,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: 14,

    height: 56,

    paddingHorizontal: 16,
  },

  inputFocused: {
    borderColor: COLORS.primary,

    shadowColor: COLORS.primary,

    shadowOpacity: 0.4,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 8,
  },

  icon: {
    marginRight: 12,
  },

  input: {
    flex: 1,

    color: COLORS.text,

    fontSize: 16,

    fontWeight: "500",

    outlineStyle: "none" as any,

    borderWidth: 0,

    backgroundColor: "transparent",
  },
});
