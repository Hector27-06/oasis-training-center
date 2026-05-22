import { create } from "zustand";

export type Role = "member" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: User | null;

  setUser: (user: User) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      user: null,
    }),
}));
