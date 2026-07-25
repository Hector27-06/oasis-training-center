export interface Activity {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateActivityPayload {
  name: string;
  description: string;
}

export interface UpdateActivityPayload {
  description?: string;
  isActive?: boolean;
}

export type ActivityResponse = Activity;
export type ActivitiesResponse = Activity[];
