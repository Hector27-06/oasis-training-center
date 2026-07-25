export type MembershipStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "SUSPENDED"
  | "CANCELLED";

export interface MembershipPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface ApiMembershipPlan extends Omit<MembershipPlan, "price" | "isActive"> {
  price: string | number;
  isActive?: boolean;
}

export interface Membership {
  id: string;
  status: MembershipStatus;
  startDate: string;
  endDate: string;
  plan: MembershipPlan;
  planId?: string;
  isActive?: boolean;
  activity?: unknown | null;
}

export interface ApiMembership extends Omit<Membership, "plan"> {
  plan: ApiMembershipPlan;
}

export interface CreateMembershipPlanPayload {
  name: string;
  description: string;
  price: string | number;
  duration: number;
}

export interface UpdateMembershipPlanPayload {
  name?: string;
  description?: string;
  price?: string | number;
}

export interface CreateMembershipPayload {
  clientId: string;
  planId: string;
  startDate: string;
  endDate: string;
  activityId: string | null;
}

export interface GetMembershipPlansParams {
  active?: boolean;
}

export interface GetMembershipsParams {
  status?: MembershipStatus;
}

export interface RenewMembershipPayload {
  days?: number;
}

export interface ChangeMembershipPlanPayload {
  planId: string;
}
