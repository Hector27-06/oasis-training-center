import { UserProfileData } from "./user.types";

export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfileData;
  mustChangePassword?: boolean;
}
