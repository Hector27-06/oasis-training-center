import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const memberships = [
  "CrossFit Unlimited",
  "Hyrox Training",
  "Calistenia",
  "Open Box",
];

export default function AdminRegisterUserScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membership, setMembership] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
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

    setSuccessMessage(
      `Cliente registrado correctamente. Contraseña temporal: Oasis2026#`,
    );

    setName("");
    setEmail("");
    setPhone("");
    setMembership("");
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
          }}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Seleccionar membresía</Text>

        <View style={styles.membershipGrid}>
          {memberships.map((item) => {
            const active = membership === item;

            return (
              <Pressable
                key={item}
                style={[
                  styles.membershipOption,
                  active && styles.membershipActive,
                ]}
                onPress={() => {
                  setMembership(item);
                  setErrorMessage("");
                }}
              >
                <Text
                  style={[
                    styles.membershipText,
                    active && styles.membershipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Acceso automático</Text>
          <Text style={styles.infoText}>
            El sistema generará una contraseña temporal para que el cliente
            pueda iniciar sesión.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar Cliente</Text>
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
  },
  membershipActive: {
    backgroundColor: "#00ff88",
    borderColor: "#00ff88",
  },
  membershipText: {
    color: "#b8c2cc",
    fontWeight: "800",
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
  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
  },
});
