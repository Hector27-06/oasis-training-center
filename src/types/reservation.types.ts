export interface ReservationClient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReservationClass {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  instructorName: string;
}

export interface Reservation {
  id: string;
  clientId: string;
  classId: string;
  createdAt?: string;
  client?: ReservationClient;
  class?: ReservationClass;
}

export interface CreateReservationPayload {
  clientId: string;
  classId: string;
}
