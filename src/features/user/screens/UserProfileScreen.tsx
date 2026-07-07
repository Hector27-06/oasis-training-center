import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/src/constants/colors";
import { authService } from "@/src/services/auth.service";

type ProfileData = {
  email?: string;

  user?: {
    email?: string;
    role?: string;
  };

  client?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    birthDate?: string;
  };

  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
};

interface Props {
  userName?: string;
}

export default function UserProfileScreen({ userName }: Props) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await authService.getProfile();

      console.log("PROFILE RESPONSE");
      console.log(response);

      setProfile(response);
    } catch (error: any) {
      console.log(error);

      Alert.alert("Error", "No se pudo cargar la información del perfil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />

        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  const client = profile?.client ?? profile;

  const fullName =
    client?.firstName && client?.lastName
      ? `${client.firstName} ${client.lastName}`
      : userName || "Usuario";

  const email = profile?.user?.email || profile?.email || "Sin correo";

  const phone = client?.phone || "No registrado";

  const address = client?.address || "No registrada";

  const birthDate = client?.birthDate || "No registrada";

  const role = profile?.user?.role || "CLIENT";

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>

        <Text style={styles.subtitle}>Gestiona tu información personal</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <Pressable
            style={styles.editButton}
            onPress={() =>
              Alert.alert(
                "Próximamente",
                "La edición del perfil estará disponible pronto.",
              )
            }
          >
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />

            <Text style={styles.editText}>Editar</Text>
          </Pressable>
        </View>

        <View style={styles.formGrid}>
          <Field
            label="Nombre completo"
            value={fullName}
            icon="person-outline"
          />

          <Field label="Email" value={email} icon="mail-outline" />

          <Field label="Teléfono" value={phone} icon="call-outline" />

          <Field label="Rol" value={role} icon="shield-outline" />
        </View>

        <Field
          full
          label="Fecha de nacimiento"
          value={birthDate}
          icon="calendar-outline"
        />

        <Field full label="Dirección" value={address} icon="location-outline" />
      </View>

      <View style={styles.membershipCard}>
        <Text style={styles.sectionTitle}>Estado de la Cuenta</Text>

        <View style={styles.membershipGrid}>
          <Info label="Estado" value="Activa" green />

          <Info label="Rol" value={role} />

          <Info label="Correo" value={email} />
        </View>
      </View>
    </>
  );
}

function Field({
  label,
  value,
  icon,
  full,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  full?: boolean;
}) {
  return (
    <View style={[styles.field, full && styles.fullField]}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={16} color={COLORS.textSecondary} />

        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.inputLike}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );
}

function Info({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <View>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={[styles.infoValue, green && styles.greenText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: COLORS.text,
    marginTop: 16,
    fontSize: 16,
  },

  header: {
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 26,
  },

  title: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
  },

  profileCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 26,
    marginBottom: 26,
    maxWidth: 860,
    alignSelf: "center",
    width: "100%",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },

  editButton: {
    backgroundColor: "#075C39",
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  editText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 15,
  },

  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
  },

  field: {
    flexBasis: "48%",
    marginBottom: 22,
  },

  fullField: {
    flexBasis: "100%",
    width: "100%",
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },

  inputLike: {
    height: 50,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  inputText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },

  membershipCard: {
    backgroundColor: "#042F1E",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    padding: 26,
    maxWidth: 860,
    alignSelf: "center",
    width: "100%",
  },

  membershipGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  greenText: {
    color: COLORS.primary,
  },
});
