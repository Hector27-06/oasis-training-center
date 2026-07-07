import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import AuthError from "@/src/features/auth/components/AuthError";

import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { loginSchema } from "@/src/utils/validators";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setUser } = useAuthStore();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    setLoading(true);

    try {
      const response = await authService.login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      console.log("LOGIN RESPONSE:", response);

      const apiUser = response.user;

      setUser({
        id: apiUser.id,
        name:
          apiUser.client?.firstName && apiUser.client?.lastName
            ? `${apiUser.client.firstName} ${apiUser.client.lastName}`
            : "Admin",
        email: apiUser.email,
        role: apiUser.role === "ADMIN" ? "admin" : "member",
      });

      // Si viene contraseña temporal simplemente dejamos entrar
      if (response.mustChangePassword) {
        console.log(
          "Usuario con contraseña temporal. Puede cambiarla después desde Perfil.",
        );
      }

      if (apiUser.role === "ADMIN") {
        router.replace("/admin-dashboard");
      } else {
        router.replace("/member-dashboard");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error?.response?.data);

      const message =
        error?.response?.data?.message || "Correo o contraseña incorrectos";

      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            label="Email"
            placeholder="usuario@gmail.com"
            value={field.value}
            onChangeText={field.onChange}
            icon="mail-outline"
            inputMode="email"
          />
        )}
      />

      <AuthError message={errors.email?.message} />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            icon="lock-closed-outline"
          />
        )}
      />

      <AuthError message={errors.password?.message} />
      <AuthError message={loginError} />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
}
