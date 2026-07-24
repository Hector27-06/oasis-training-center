import React from "react";

import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { COLORS } from "@/src/constants/colors";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  const isDisabled = loading || disabled;

  return (
    <Pressable
      onPress={() => {
        console.log("BOTÓN PRESIONADO:", title);

        onPress();
      }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,

        pressed && styles.pressed,

        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,

    height: 56,

    borderRadius: 14,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,

    //cursor: "pointer" as any,
  },

  pressed: {
    opacity: 0.75,

    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: "#000",

    fontWeight: "600",

    fontSize: 17,
  },
});
