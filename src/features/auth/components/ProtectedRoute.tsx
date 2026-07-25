import { Redirect } from "expo-router";
import React from "react";

import { Role, useAuthStore } from "@/src/store/auth.store";

interface Props {
  children: React.ReactNode;
  allowedRole?: Role;
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const mustChangePassword = useAuthStore((state) => state.mustChangePassword);

  if (isInitializing) {
    return null;
  }

  if (!user) {
    return <Redirect href={"/(auth)/login" as any} />;
  }

  if (mustChangePassword) {
    return <Redirect href="/(auth)/change-password" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Redirect href={"/" as any} />;
  }

  return <>{children}</>;
}
