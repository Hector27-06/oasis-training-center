import { create } from "zustand";

export type Role = "member" | "admin";

export interface Client {
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  client?: Client;
}

interface AuthState {
  user: User | null;
  isInitializing: boolean;
  mustChangePassword: boolean;

  setUser: (user: User) => void;

  logout: () => void;
  finishInitialization: () => void;
  setMustChangePassword: (mustChangePassword: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitializing: true,
  mustChangePassword: false,

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      user: null,
      mustChangePassword: false,
    }),

  finishInitialization: () =>
    set({
      isInitializing: false,
    }),

  setMustChangePassword: (mustChangePassword) =>
    set({
      mustChangePassword,
    }),
}));
