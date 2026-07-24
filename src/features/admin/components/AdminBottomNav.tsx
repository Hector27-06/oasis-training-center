import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Tab =
  | "Dashboard"
  | "Usuarios"
  | "Membresías"
  | "Horarios"
  | "Inventario"
  | "Configuración";

interface Props {
  selected: Tab;
  onSelect: (tab: Tab) => void;
}

const items: {
  label: Tab;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    label: "Dashboard",
    icon: "grid-outline",
  },
  {
    label: "Usuarios",
    icon: "people-outline",
  },
  {
    label: "Membresías",
    icon: "card-outline",
  },
  {
    label: "Horarios",
    icon: "calendar-outline",
  },
  {
    label: "Configuración",
    icon: "settings-outline",
  },
];

export default function AdminBottomNav({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = selected === item.label;

        return (
          <Pressable
            key={item.label}
            style={styles.item}
            onPress={() => onSelect(item.label)}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={active ? "#00ff88" : "#8b8b8b"}
            />

            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 74,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#222",
    flexDirection: "row",
  },

  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    color: "#8b8b8b",
    fontSize: 11,
    marginTop: 4,
  },

  labelActive: {
    color: "#00ff88",
    fontWeight: "700",
  },
});
