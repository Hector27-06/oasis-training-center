import { Stack } from "expo-router";

import ProtectedRoute from "@/src/features/auth/components/ProtectedRoute";

export default function MemberLayout() {
  return (
    <ProtectedRoute allowedRole="member">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProtectedRoute>
  );
}
