import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import useResponsive from "@/src/hooks/useResponsive";

type Props = ScrollViewProps & {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function ResponsiveScrollView({
  children,
  contentStyle,
  contentContainerStyle,
  ...props
}: Props) {
  const { layout } = useResponsive();

  return (
    <ScrollView
      {...props}
      style={[styles.scroll, props.style]}
      contentContainerStyle={[
        styles.content,
        { padding: layout.pagePadding, paddingBottom: layout.pagePadding + layout.sectionGap },
        contentStyle,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, width: "100%", alignSelf: "center" },
});
