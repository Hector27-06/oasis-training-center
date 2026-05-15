import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

export default function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,

    width: "100%",
    maxWidth: 420,

    alignSelf: "center",

    borderRadius: 28,

    paddingVertical: 30,
    paddingHorizontal: 24,

    borderWidth: 1,
    borderColor: "#1E1E1E",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },
});
