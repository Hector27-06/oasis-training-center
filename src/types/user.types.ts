export type UserRole = "ADMIN" | "CLIENT";

export interface UserClientProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
}

export interface UserProfileData {
  id: string;
  email: string;
  role: UserRole;
  client?: UserClientProfile;
  mustChangePassword?: boolean;
}

export type UserProfile =
  | UserProfileData
  | {
      user: UserProfileData;
      mustChangePassword?: boolean;
    };

export interface UpdateUserProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
}

export interface UserAccount {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserListResponse {
  data: UserAccount[];
  meta: UserListMeta;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export interface UpdateUserPayload {
  role?: UserRole;
  isActive?: boolean;
}
