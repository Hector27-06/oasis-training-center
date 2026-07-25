import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";

type Props = {
  desktopNavigation: React.ReactNode;
  mobileNavigation: React.ReactNode;
  mobileNavigationPosition?: "header" | "footer";
  children: React.ReactNode;
};

export default function DashboardShell({
  desktopNavigation,
  mobileNavigation,
  mobileNavigationPosition = "header",
  children,
}: Props) {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
        <View style={[styles.container, isMobile && styles.containerMobile]}>
          {isMobile && mobileNavigationPosition === "header" && (
            <View style={styles.navigation}>{mobileNavigation}</View>
          )}

          {!isMobile && desktopNavigation}

          <View style={styles.content}>{children}</View>
        </View>
      </SafeAreaView>

      {isMobile && mobileNavigationPosition === "footer" && (
        <View style={styles.footerNavigation}>{mobileNavigation}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.background,
  },

  containerMobile: {
    flexDirection: "column",
  },

  navigation: {
    flexShrink: 0,
  },

  footerNavigation: {
    flexShrink: 0,
    backgroundColor: COLORS.card,
  },

  content: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    backgroundColor: COLORS.background,
  },
});
