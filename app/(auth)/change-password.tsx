import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet } from "react-native";
import { z } from "zod";

import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";
import Input from "@/src/components/ui/Input";
import { COLORS } from "@/src/constants/colors";
import AuthError from "@/src/features/auth/components/AuthError";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Ingresa tu contraseña actual"),
    newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordScreen() {
  const user = useAuthStore((state) => state.user);
  const setMustChangePassword = useAuthStore((state) => state.setMustChangePassword);
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const onSubmit = async ({ currentPassword, newPassword }: ChangePasswordFormData) => {
    setRequestError("");
    setLoading(true);

    try {
      await authService.changePassword(currentPassword, newPassword);
      setMustChangePassword(false);
      router.replace(user.role === "admin" ? "/admin-dashboard" : "/member-dashboard");
    } catch (error) {
      const response = (error as AxiosError<{ message?: string | string[] }>).response;
      const apiMessage = response?.data?.message;
      setRequestError(
        (Array.isArray(apiMessage) ? apiMessage[0] : apiMessage) ||
          "No fue posible cambiar la contraseña",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Controller control={control} name="currentPassword" render={({ field }) => (
          <Input label="Contraseña actual" placeholder="••••••••" icon="lock-closed-outline" secureTextEntry value={field.value} onChangeText={field.onChange} />
        )} />
        <AuthError message={errors.currentPassword?.message} />
        <Controller control={control} name="newPassword" render={({ field }) => (
          <Input label="Nueva contraseña" placeholder="••••••••" icon="lock-closed-outline" secureTextEntry value={field.value} onChangeText={field.onChange} />
        )} />
        <AuthError message={errors.newPassword?.message} />
        <Controller control={control} name="confirmPassword" render={({ field }) => (
          <Input label="Confirmar nueva contraseña" placeholder="••••••••" icon="lock-closed-outline" secureTextEntry value={field.value} onChangeText={field.onChange} />
        )} />
        <AuthError message={errors.confirmPassword?.message} />
        <AuthError message={requestError} />
        <Button title={loading ? "Actualizando..." : "Actualizar contraseña"} onPress={handleSubmit(onSubmit)} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
