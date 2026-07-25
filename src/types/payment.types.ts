export type PaymentMethod = "CASH" | "TRANSFER" | "TERMINAL" | "CARD";

export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED" | "REFUNDED";

export interface PaymentClient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PaymentMembership {
  client?: PaymentClient | null;
}

export interface Payment {
  id: string;
  membershipId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string | null;
  notes?: string | null;
  voucherUrl?: string | null;
  paidAt?: string | null;
  createdAt?: string;
  membership?: PaymentMembership | null;
}

export interface CreatePaymentPayload {
  membershipId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string | null;
  notes?: string;
}

export interface CreateCashPaymentPayload {
  membershipId: string;
  amount: number;
  notes?: string;
}

export interface CreateTerminalPaymentPayload {
  membershipId: string;
  amount: number;
  transactionId: string;
}

export interface CreateTransferPaymentPayload {
  membershipId: string;
  amount: number;
  notes?: string;
  voucher?: Blob;
}

export interface CreateCardPaymentPayload {
  membershipId: string;
  amount: number;
  token: string;
}

export interface RejectPaymentPayload {
  reason?: string;
}

export interface UpdatePaymentStatusPayload {
  status: PaymentStatus;
  transactionId?: string;
  notes?: string;
}

export interface GetPaymentsParams {
  status?: PaymentStatus;
}

export interface MercadoPagoPublicKeyResponse {
  publicKey: string;
}
