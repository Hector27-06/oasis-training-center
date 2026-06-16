export const memberMenu = [
  {
    label: "Dashboard",
    route: "/member-dashboard",
    icon: "grid-outline",
  },

  {
    label: "Clases",
    route: "/classes",
    icon: "calendar-outline",
  },

  {
    label: "PRs",
    route: "/benchmarks",
    icon: "trophy-outline",
  },

  {
    label: "Membresía",
    route: "/membership",
    icon: "card-outline",
  },

  {
    label: "Perfil",
    route: "/profile",
    icon: "person-outline",
  },
] as const;

export type UserMenuItem = (typeof memberMenu)[number]["label"];

export const adminMenu = [
  {
    label: "Dashboard",
    route: "/admin-dashboard",
    icon: "grid-outline",
  },

  {
    label: "Usuarios",
    route: "/users",
    icon: "people-outline",
  },

  {
    label: "Membresías",
    route: "/memberships",
    icon: "card-outline",
  },

  {
    label: "Horarios",
    route: "/admin-classes",
    icon: "calendar-outline",
  },

  {
    label: "Inventario",
    route: "/inventory",
    icon: "cube-outline",
  },

  {
    label: "Reportes",
    route: "/reports",
    icon: "bar-chart-outline",
  },
] as const;

export type AdminMenuItem = (typeof adminMenu)[number]["label"];
