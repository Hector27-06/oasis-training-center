import {
  CreateReservationPayload,
  Reservation,
} from "@/src/types/reservation.types";

import { api } from "./api";

export const reservationService = {
  async createReservation(payload: CreateReservationPayload): Promise<Reservation> {
    const response = await api.post("/reservations", payload);
    return response.data.data;
  },

  async getReservations(): Promise<Reservation[]> {
    const response = await api.get("/reservations");
    return response.data.data;
  },

  async getClientReservations(clientId: string): Promise<Reservation[]> {
    const response = await api.get(`/reservations/client/${clientId}`);
    return response.data.data;
  },

  async deleteReservation(id: string): Promise<void> {
    await api.delete(`/reservations/${id}`);
  },
};
