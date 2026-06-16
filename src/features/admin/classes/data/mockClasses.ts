import { GymClass } from "../types/class.types";

export const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const emptyClassForm = {
  day: "Lunes",
  name: "",
  category: "",
  time: "",
  duration: "",
  coach: "",
  capacity: "",
};

export const mockClasses: GymClass[] = [
  {
    id: "1",
    day: "Lunes",
    name: "CrossFit WOD",
    category: "CrossFit",
    time: "06:00",
    duration: "60 min",
    coach: "Carlos Ruiz",
    capacity: 12,
    reserved: 8,
    status: "available",
  },
  {
    id: "2",
    day: "Lunes",
    name: "Hyrox Training",
    category: "Hyrox",
    time: "07:30",
    duration: "90 min",
    coach: "Ana López",
    capacity: 15,
    reserved: 12,
    status: "available",
  },
];
