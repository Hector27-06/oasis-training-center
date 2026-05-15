import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Ingresa tu correo").email("Correo inválido"),

  password: z.string().min(1, "Ingresa tu contraseña"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre demasiado largo"),

  email: z.string().trim().min(1, "Ingresa tu correo").email("Correo inválido"),

  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(50, "Máximo 50 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Debe contener mayúscula, minúscula y número",
    ),
});
