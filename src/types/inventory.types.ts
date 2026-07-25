export type InventoryType = "EQUIPMENT" | "PRODUCT";

export type InventoryStatus =
  | "AVAILABLE"
  | "IN_MAINTENANCE"
  | "DAMAGED"
  | "RETIRED";

export interface InventoryItem {
  id: string;
  name: string;
  type: InventoryType;
  category: string;
  description: string;
  quantity: number;
  minStock: number;
  price: number;
  status: InventoryStatus;
  purchaseDate: string;
  maintenanceRequired: boolean;
  notes: string;
}

export type CreateInventoryItemPayload = Omit<InventoryItem, "id">;

export interface UpdateInventoryItemPayload {
  quantity?: number;
  status?: InventoryStatus;
  notes?: string;
}

export interface GetInventoryParams {
  type?: InventoryType;
  status?: InventoryStatus;
}

export interface UploadInventoryImagePayload {
  itemId: string;
  image: Blob;
}

export type InventoryListResponse = InventoryItem[];
