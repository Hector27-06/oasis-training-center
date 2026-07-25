import React, { useEffect, useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { clientService } from "@/src/services/client.service";
import { membershipService } from "@/src/services/membership.service";
import { MembershipPlan } from "@/src/types/membership.types";

export default function AdminRegisterUserScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [membership, setMembership] = useState<MembershipPlan | null>(null);
  const [memberships, setMemberships] = useState<MembershipPlan[]>([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoadingPlans(true);

        const plans = await membershipService.getPlans({ active: true });

        setMemberships(plans);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message ||
            "No se pudieron cargar las membresías.",
        );
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name.trim()) {
      setErrorMessage("El nombre completo es obligatorio.");
      return;
    }

    if (!gmailRegex.test(email.trim().toLowerCase())) {
      setErrorMessage("Debes ingresar una cuenta Gmail válida.");
      return;
    }

    if (!phoneRegex.test(phone.trim())) {
      setErrorMessage("El teléfono debe contener exactamente 10 dígitos.");
      return;
    }

    if (!membership) {
      setErrorMessage("Debes seleccionar una membresía.");
      return;
    }

    const [firstName, ...lastNameParts] = name.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    if (!lastName) {
      setErrorMessage("Ingresa nombre y apellido.");
      return;
    }

    try {
      setLoading(true);

      const response = await clientService.registerClient({
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        planId: membership.id,
        startDate: new Date().toISOString().split("T")[0],
        activityId: null,
        paymentMethod: "CASH",
        transactionId: null,
        notes: "Cliente registrado desde panel admin",
      });

      setSuccessMessage(
        response?.message ||
          "Cliente registrado correctamente. Se envió el acceso al correo.",
      );

      setName("");
      setEmail("");
      setPhone("");
      setMembership(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "No se pudo registrar el cliente.";

      setErrorMessage(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alta de Cliente</Text>

      <Text style={styles.subtitle}>
        Solo el administrador puede registrar clientes
      </Text>

      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>✕ {errorMessage}</Text>
        </View>
      ) : null}

      {successMessage ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ {successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.label}>Nombre completo</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. María González"
          placeholderTextColor="#777"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />

        <Text style={styles.label}>Correo Gmail</Text>

        <TextInput
          style={styles.input}
          placeholder="usuario@gmail.com"
          placeholderTextColor="#777"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrorMessage("");
            setSuccessMessage("");
          }}
          autoCapitalize="none"
          inputMode="email"
        />

        <Text style={styles.label}>Teléfono</Text>

        <TextInput
          style={styles.input}
          placeholder="6141234567"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={(value) => {
            setPhone(value.replace(/[^0-9]/g, ""));
            setErrorMessage("");
            setSuccessMessage("");
          }}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Seleccionar membresía</Text>

        {loadingPlans ? (
          <Text style={styles.loadingText}>Cargando membresías...</Text>
        ) : memberships.length === 0 ? (
          <Text style={styles.errorSmall}>No hay membresías disponibles.</Text>
        ) : (
          <View style={styles.membershipGrid}>
            {memberships.map((item) => {
              const active = membership?.id === item.id;

              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.membershipOption,
                    active && styles.membershipActive,
                  ]}
                  onPress={() => {
                    setMembership(item);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                >
                  <Text
                    style={[
                      styles.membershipText,
                      active && styles.membershipTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={[
                      styles.membershipPrice,
                      active && styles.membershipTextActive,
                    ]}
                  >
                    ${item.price} · {item.duration} días
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Acceso automático</Text>

          <Text style={styles.infoText}>
            El sistema enviará una contraseña temporal al correo del cliente.
          </Text>
        </View>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registrando..." : "Registrar Cliente"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 24,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },

  subtitle: {
    color: "#b8c2cc",
    fontSize: 16,
    marginTop: 6,
    marginBottom: 20,
  },

  errorBox: {
    backgroundColor: "#3a1515",
    borderWidth: 1,
    borderColor: "#ff4444",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    maxWidth: 760,
  },

  errorText: {
    color: "#ff6666",
    fontWeight: "900",
    fontSize: 15,
  },

  successBox: {
    backgroundColor: "#063d26",
    borderWidth: 1,
    borderColor: "#00ff88",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    maxWidth: 760,
  },

  successText: {
    color: "#00ff88",
    fontWeight: "900",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 22,
    padding: 24,
    maxWidth: 760,
  },

  label: {
    color: "#b8c2cc",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    height: 58,
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    color: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
  },

  loadingText: {
    color: "#00ff88",
    marginTop: 8,
    fontWeight: "800",
  },

  errorSmall: {
    color: "#ff6666",
    marginTop: 8,
    fontWeight: "800",
  },

  membershipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },

  membershipOption: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minWidth: 150,
  },

  membershipActive: {
    backgroundColor: "#00ff88",
    borderColor: "#00ff88",
  },

  membershipText: {
    color: "#b8c2cc",
    fontWeight: "900",
  },

  membershipPrice: {
    color: "#9ca3af",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
  },

  membershipTextActive: {
    color: "#000",
  },

  infoBox: {
    backgroundColor: "#082d1d",
    borderWidth: 1,
    borderColor: "#0c6b42",
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },

  infoTitle: {
    color: "#00ff88",
    fontWeight: "900",
    marginBottom: 6,
  },

  infoText: {
    color: "#c7f5dc",
    lineHeight: 20,
  },

  button: {
    marginTop: 24,
    backgroundColor: "#00ff88",
    height: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
  },
});
