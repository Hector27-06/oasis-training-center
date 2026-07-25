import {
  ApiMembership,
  ApiMembershipPlan,
  ChangeMembershipPlanPayload,
  CreateMembershipPayload,
  CreateMembershipPlanPayload,
  GetMembershipPlansParams,
  GetMembershipsParams,
  Membership,
  MembershipPlan,
  RenewMembershipPayload,
  UpdateMembershipPlanPayload,
} from "@/src/types/membership.types";

import { api } from "./api";

function normalizePlan(plan: ApiMembershipPlan): MembershipPlan {
  return {
    ...plan,
    price: Number(plan.price),
    isActive: plan.isActive ?? true,
  };
}

function normalizePlanPayload<T extends { price?: string | number }>(payload: T): T {
  return {
    ...payload,
    ...(payload.price === undefined ? {} : { price: Number(payload.price) }),
  };
}

function normalizeMembership(membership: ApiMembership): Membership {
  return {
    ...membership,
    plan: normalizePlan(membership.plan),
  };
}

export const membershipService = {
  async createPlan(payload: CreateMembershipPlanPayload): Promise<unknown> {
    const response = await api.post(
      "/memberships/plans",
      normalizePlanPayload(payload),
    );
    return response.data.data;
  },

  async getPlans({ active }: GetMembershipPlansParams = {}): Promise<MembershipPlan[]> {
    const response = await api.get("/memberships/plans", { params: { active } });
    const plans = response.data.data as ApiMembershipPlan[];

    return plans.map(normalizePlan);
  },

  async updatePlan(id: string, payload: UpdateMembershipPlanPayload): Promise<unknown> {
    const response = await api.patch(
      `/memberships/plans/${id}`,
      normalizePlanPayload(payload),
    );
    return response.data.data;
  },

  async deletePlan(id: string): Promise<unknown> {
    const response = await api.delete(`/memberships/plans/${id}`);
    return response.data.data;
  },

  async createMembership(payload: CreateMembershipPayload): Promise<unknown> {
    const response = await api.post("/memberships", payload);
    return response.data.data;
  },

  async getMemberships({ status }: GetMembershipsParams = {}): Promise<Membership[]> {
    const response = await api.get("/memberships", { params: { status } });
    const memberships = response.data.data as ApiMembership[];

    return memberships.map(normalizeMembership);
  },

  async getActiveMemberships(): Promise<Membership[]> {
    const response = await api.get("/memberships/active");
    const memberships = response.data.data as ApiMembership[];

    return memberships.map(normalizeMembership);
  },

  async getExpiredMemberships(): Promise<Membership[]> {
    const response = await api.get("/memberships/expired");
    const memberships = response.data.data as ApiMembership[];

    return memberships.map(normalizeMembership);
  },

  async getMyMembership(): Promise<Membership | null> {
    const response = await api.get("/memberships/my");
    const membership = response.data.data as ApiMembership | null;

    return membership ? normalizeMembership(membership) : null;
  },

  async getClientMemberships(clientId: string): Promise<Membership[]> {
    const response = await api.get(`/memberships/client/${clientId}`);
    const memberships = response.data.data as ApiMembership[];

    return memberships.map(normalizeMembership);
  },

  async getMembership(id: string): Promise<Membership> {
    const response = await api.get(`/memberships/${id}`);
    return normalizeMembership(response.data.data as ApiMembership);
  },

  async suspendMembership(id: string): Promise<unknown> {
    const response = await api.patch(`/memberships/${id}/suspend`);
    return response.data.data;
  },

  async renewMembership(
    id: string,
    payload?: RenewMembershipPayload,
  ): Promise<unknown> {
    const response = await api.patch(`/memberships/${id}/renew`, payload);
    return response.data.data;
  },

  async changeMembershipPlan(
    id: string,
    payload: ChangeMembershipPlanPayload,
  ): Promise<Membership> {
    const response = await api.patch(`/memberships/${id}/change-plan`, payload);
    return normalizeMembership(response.data.data as ApiMembership);
  },
};
