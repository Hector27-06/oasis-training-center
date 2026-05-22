import React from "react";

import { StyleSheet, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
  },
});
