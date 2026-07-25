import React from "react";
import MobileNavigation, { MobileNavigationItem } from "@/src/components/layout/MobileNavigation";

type Tab =
  | "Dashboard"
  | "Usuarios"
  | "Membresías"
  | "Horarios"
  | "Inventario"
  | "Pagos"
  | "Configuración";

interface Props {
  selected: Tab;
  onSelect: (tab: Tab) => void;
  onLogout: () => void;
}

const items: MobileNavigationItem<Tab>[] = [
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
    label: "Inventario",
    icon: "cube-outline",
  },
  {
    label: "Pagos",
    icon: "cash-outline",
  },
  {
    label: "Configuración",
    icon: "settings-outline",
  },
];

export default function AdminBottomNav({ selected, onSelect, onLogout }: Props) {
  return <MobileNavigation items={items} selected={selected} onSelect={onSelect} onLogout={onLogout} position="bottom" />;
}
