import React, { useState } from "react";
import { Alert } from "react-native";

import { router } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

import { getRegisteredUser } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { loginSchema } from "@/src/utils/validators";

import AuthError from "../components/AuthError";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setUser } = useAuthStore();

  const [loginError, setLoginError] = useState("");

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

    try {
      const registeredUser = await getRegisteredUser();

      if (!registeredUser) {
        setLoginError("Usuario no encontrado");
        return;
      }

      const normalizedEmail = data.email.trim().toLowerCase();

      if (registeredUser.email !== normalizedEmail) {
        setLoginError("Usuario no encontrado");
        return;
      }

      if (registeredUser.password !== data.password) {
        setLoginError("Contraseña incorrecta");
        return;
      }

      setUser({
        id: "1",
        name: registeredUser.name,
        email: registeredUser.email,
        role: "member",
      });

      Alert.alert("Bienvenido", registeredUser.name);

      router.replace("/member-dashboard");
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
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
            placeholder="usuario@ejemplo.com"
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

      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
