import React from "react";
import { Alert } from "react-native";

import { router } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

import { saveRegisteredUser } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { registerSchema } from "@/src/utils/validators";

import AuthError from "../components/AuthError";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { setUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const normalizedEmail = data.email.trim().toLowerCase();
      const normalizedName = data.name.trim();

      await saveRegisteredUser({
        name: normalizedName,
        email: normalizedEmail,
        password: data.password,
      });

      setUser({
        name: normalizedName,
        email: normalizedEmail,
        role: "member",
        id: Math.random().toString(36).substring(2, 9),
      });

      Alert.alert("Cuenta creada", "Usuario guardado localmente");

      router.replace("/(member)/member-dashboard" as any);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar");
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            label="Nombre completo"
            placeholder="Juan Pérez"
            value={field.value}
            onChangeText={field.onChange}
            icon="person-outline"
          />
        )}
      />

      <AuthError message={errors.name?.message} />

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

      <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
