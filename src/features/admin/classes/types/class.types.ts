export type ClassStatus = "available" | "full" | "cancelled";

export type GymClass = {
  id: string;
  day: string;
  name: string;
  category: string;
  time: string;
  duration: string;
  coach: string;
  capacity: number;
  reserved: number;
  status: ClassStatus;
};

export type ClassForm = {
  day: string;
  name: string;
  category: string;
  time: string;
  duration: string;
  coach: string;
  capacity: string;
};
