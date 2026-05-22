import { Redirect } from "expo-router";

import { useAuthStore } from "@/src/store/auth.store";

export default function Index() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Redirect href={"/(auth)/login" as any} />;
  }

  if (user.role === "admin") {
    return <Redirect href={"/(admin)/admin-dashboard" as any} />;
  }

  return <Redirect href={"/(member)/member-dashboard" as any} />;
}
