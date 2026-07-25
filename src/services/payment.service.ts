import {
  CreateCardPaymentPayload,
  CreateCashPaymentPayload,
  CreatePaymentPayload,
  CreateTerminalPaymentPayload,
  CreateTransferPaymentPayload,
  GetPaymentsParams,
  MercadoPagoPublicKeyResponse,
  Payment,
  RejectPaymentPayload,
  UpdatePaymentStatusPayload,
} from "@/src/types/payment.types";

import { api } from "./api";

function createTransferFormData(payload: CreateTransferPaymentPayload): FormData {
  const formData = new FormData();
  formData.append("membershipId", payload.membershipId);
  formData.append("amount", String(payload.amount));

  if (payload.notes) {
    formData.append("notes", payload.notes);
  }

  if (payload.voucher) {
    formData.append("voucher", payload.voucher);
  }

  return formData;
}

export const paymentService = {
  async createPayment(payload: CreatePaymentPayload): Promise<Payment> {
    const response = await api.post("/payments", payload);
    return response.data.data;
  },

  async createCashPayment(payload: CreateCashPaymentPayload): Promise<Payment> {
    const response = await api.post("/payments/cash", payload);
    return response.data.data;
  },

  async createTerminalPayment(payload: CreateTerminalPaymentPayload): Promise<Payment> {
    const response = await api.post("/payments/terminal", payload);
    return response.data.data;
  },

  async createTransferPayment(payload: CreateTransferPaymentPayload): Promise<Payment> {
    const response = await api.post(
      "/payments/transfer",
      createTransferFormData(payload),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data.data;
  },

  async createCardPayment(payload: CreateCardPaymentPayload): Promise<Payment> {
    const response = await api.post("/payments/card", payload);
    return response.data.data;
  },

  async getMercadoPagoPublicKey(): Promise<MercadoPagoPublicKeyResponse> {
    const response = await api.get("/payments/config/mp-public-key");
    return response.data.data;
  },

  async approvePayment(id: string): Promise<Payment> {
    const response = await api.patch(`/payments/approve/${id}`);
    return response.data.data;
  },

  async rejectPayment(id: string, payload: RejectPaymentPayload = {}): Promise<Payment> {
    const response = await api.patch(`/payments/reject/${id}`, payload);
    return response.data.data;
  },

  async getMyPayments(): Promise<Payment[]> {
    const response = await api.get("/payments/my");
    return response.data.data;
  },

  async getPayments({ status }: GetPaymentsParams = {}): Promise<Payment[]> {
    const response = await api.get("/payments", { params: { status } });
    return response.data.data;
  },

  async getPendingPayments(): Promise<Payment[]> {
    const response = await api.get("/payments/pending");
    return response.data.data;
  },

  async getPayment(id: string): Promise<Payment> {
    const response = await api.get(`/payments/${id}`);
    return response.data.data;
  },

  async updatePaymentStatus(
    id: string,
    payload: UpdatePaymentStatusPayload,
  ): Promise<Payment> {
    const response = await api.patch(`/payments/${id}/status`, payload);
    return response.data.data;
  },
};
