import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthProvider from "@/src/providers/AuthProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(member)" />
          <Stack.Screen name="(admin)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
