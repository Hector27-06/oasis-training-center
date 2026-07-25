import {
  CreatePersonalRecordPayload,
  PersonalRecord,
  PersonalRecordBestListResponse,
  PersonalRecordListResponse,
  UpdatePersonalRecordPayload,
} from "@/src/types/personal-record.types";

import { api } from "./api";

export const personalRecordService = {
  async createPersonalRecord(payload: CreatePersonalRecordPayload): Promise<PersonalRecord> {
    const response = await api.post("/personal-records", payload);
    return response.data.data;
  },

  async getMyPersonalRecords(): Promise<PersonalRecordListResponse> {
    const response = await api.get("/personal-records/my");
    return response.data.data;
  },

  async getMyBestPersonalRecords(): Promise<PersonalRecordBestListResponse> {
    const response = await api.get("/personal-records/my/best");
    return response.data.data;
  },

  async getAdminPersonalRecords(): Promise<PersonalRecordListResponse> {
    const response = await api.get("/personal-records/admin");
    return response.data.data;
  },

  async getClientPersonalRecords(clientId: string): Promise<PersonalRecordListResponse> {
    const response = await api.get(`/personal-records/client/${clientId}`);
    return response.data.data;
  },

  async getPersonalRecord(id: string): Promise<PersonalRecord> {
    const response = await api.get(`/personal-records/${id}`);
    return response.data.data;
  },

  async updatePersonalRecord(id: string, payload: UpdatePersonalRecordPayload): Promise<PersonalRecord> {
    const response = await api.patch(`/personal-records/${id}`, payload);
    return response.data.data;
  },

  async deletePersonalRecord(id: string): Promise<void> {
    await api.delete(`/personal-records/${id}`);
  },
};
