import { Redirect } from "expo-router";
import React from "react";

import { Role, useAuthStore } from "@/src/store/auth.store";

interface Props {
  children: React.ReactNode;
  allowedRole?: Role;
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Redirect href={"/(auth)/login" as any} />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Redirect href={"/" as any} />;
  }

  return <>{children}</>;
}
