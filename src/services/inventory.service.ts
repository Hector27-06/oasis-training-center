import {
  CreateInventoryItemPayload,
  GetInventoryParams,
  InventoryItem,
  InventoryListResponse,
  UpdateInventoryItemPayload,
  UploadInventoryImagePayload,
} from "@/src/types/inventory.types";

import { api } from "./api";

function createImageFormData(payload: UploadInventoryImagePayload): FormData {
  const formData = new FormData();
  formData.append("itemId", payload.itemId);
  formData.append("image", payload.image);
  return formData;
}

export const inventoryService = {
  async createInventoryItem(payload: CreateInventoryItemPayload): Promise<void> {
    await api.post("/inventory", payload);
  },

  async getInventory({ type, status }: GetInventoryParams = {}): Promise<InventoryListResponse> {
    const response = await api.get("/inventory", { params: { type, status } });
    return response.data.data;
  },

  async getMaintenanceInventory(): Promise<InventoryListResponse> {
    const response = await api.get("/inventory/maintenance");
    return response.data.data;
  },

  async getInventoryItem(id: string): Promise<InventoryItem> {
    const response = await api.get(`/inventory/${id}`);
    return response.data.data;
  },

  async updateInventoryItem(id: string, payload: UpdateInventoryItemPayload): Promise<void> {
    await api.patch(`/inventory/${id}`, payload);
  },

  async deleteInventoryItem(id: string): Promise<void> {
    await api.delete(`/inventory/${id}`);
  },

  async uploadInventoryImage(payload: UploadInventoryImagePayload): Promise<void> {
    await api.post("/inventory/upload-image", createImageFormData(payload), {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateInventoryImage(id: string, formData: FormData): Promise<void> {
    await api.patch(`/inventory/update-image/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async deleteInventoryImage(id: string): Promise<void> {
    await api.delete(`/inventory/delete-image/${id}`);
  },
};
