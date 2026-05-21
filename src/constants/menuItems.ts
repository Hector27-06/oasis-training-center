export const MENU_ITEMS = [
  "Dashboard",
  "Clases",
  "PRs",
  "Membresía",
  "Perfil",
] as const;

export type MenuItem = (typeof MENU_ITEMS)[number];
