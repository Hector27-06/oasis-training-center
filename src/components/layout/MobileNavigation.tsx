import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/src/constants/colors";

export type MobileNavigationItem<T extends string> = {
  label: T;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props<T extends string> = {
  items: readonly MobileNavigationItem<T>[];
  selected: T;
  onSelect: (item: T) => void;
  onLogout: () => void;
  position: "top" | "bottom";
};

export default function MobileNavigation<T extends string>({
  items,
  selected,
  onSelect,
  onLogout,
  position,
}: Props<T>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.navigation, position === "top" ? styles.top : styles.bottom]}
      contentContainerStyle={[
        styles.content,
        position === "bottom" && {
          minHeight: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <NavigationButton label="Salir" icon="log-out-outline" danger onPress={onLogout} />
      {items.map((item) => (
        <NavigationButton
          key={item.label}
          label={item.label}
          icon={item.icon}
          active={selected === item.label}
          onPress={() => onSelect(item.label)}
        />
      ))}
    </ScrollView>
  );
}

function NavigationButton({
  label,
  icon,
  active = false,
  danger = false,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  danger?: boolean;
  onPress: () => void;
}) {
  const color = danger ? COLORS.danger : active ? "#000" : COLORS.textSecondary;

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.item,
        active && styles.itemActive,
        pressed && styles.itemPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={22} color={color} />
      <Text style={[styles.label, active && styles.labelActive, danger && styles.labelDanger]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  navigation: { flexShrink: 0, backgroundColor: COLORS.card },
  top: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  bottom: { borderTopWidth: 1, borderTopColor: COLORS.border },
  content: { minHeight: 64, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 8 },
  item: { minWidth: 68, minHeight: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", paddingHorizontal: 10 },
  itemActive: { backgroundColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.25, shadowRadius: 10, elevation: 2 },
  itemPressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
  label: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "700", marginTop: 3 },
  labelActive: { color: "#000" },
  labelDanger: { color: COLORS.danger },
});
