import React, { PropsWithChildren, useEffect } from "react";

import { setSessionExpiredHandler } from "@/src/services/api";
import { userService } from "@/src/services/user.service";
import { User, useAuthStore } from "@/src/store/auth.store";
import { UserProfile, UserProfileData } from "@/src/types/user.types";

function getProfileUser(profile: UserProfile): UserProfileData {
  return "user" in profile ? profile.user : profile;
}

function getMustChangePassword(profile: UserProfile): boolean {
  return "user" in profile
    ? profile.mustChangePassword ?? profile.user.mustChangePassword ?? false
    : profile.mustChangePassword ?? false;
}

function toStoreUser(profile: UserProfile): User {
  const user = getProfileUser(profile);
  const firstName = user.client?.firstName;
  const lastName = user.client?.lastName;

  return {
    id: user.id,
    name: firstName && lastName ? `${firstName} ${lastName}` : "Admin",
    email: user.email,
    role: user.role === "ADMIN" ? "admin" : "member",
    client: user.client,
  };
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const finishInitialization = useAuthStore((state) => state.finishInitialization);
  const setMustChangePassword = useAuthStore((state) => state.setMustChangePassword);

  useEffect(() => {
    setSessionExpiredHandler(logout);

    const restoreSession = async () => {
      try {
        const profile = await userService.getProfile();
        setUser(toStoreUser(profile));
        setMustChangePassword(getMustChangePassword(profile));
      } catch {
        logout();
      } finally {
        finishInitialization();
      }
    };

    restoreSession();
    return () => setSessionExpiredHandler(null);
  }, [finishInitialization, logout, setMustChangePassword, setUser]);

  return <>{children}</>;
}
