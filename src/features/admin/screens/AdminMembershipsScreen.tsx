import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { authService } from "@/src/services/auth.service";

type Plan = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive?: boolean;
};

export default function AdminMembershipsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPlans = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await authService.getMembershipPlans();
      setPlans(data || []);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "No se pudieron cargar las membresías.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const resetForm = () => {
    setShowForm(false);
    setEditingPlan(null);
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setShowForm(true);
    setName(plan.name);
    setDescription(plan.description || "");
    setPrice(String(plan.price));
    setDuration(String(plan.duration));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const savePlan = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("El nombre de la membresía es obligatorio.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("La descripción es obligatoria.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setErrorMessage("El precio debe ser mayor a 0.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      setErrorMessage("La duración debe ser mayor a 0 días.");
      return;
    }

    try {
      if (editingPlan) {
        await authService.updateMembershipPlan(editingPlan.id, {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          duration: Number(duration),
        });

        setSuccessMessage("Membresía actualizada correctamente.");
      } else {
        await authService.createMembershipPlan({
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          duration: Number(duration),
        });

        setSuccessMessage("Membresía creada correctamente.");
      }

      resetForm();
      await loadPlans();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "No se pudo guardar la membresía.",
      );
    }
  };

  const deletePlan = async (plan: Plan) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la membresía ${plan.name}?`,
    );

    if (!confirmed) return;

    try {
      await authService.deleteMembershipPlan(plan.id);
      setSuccessMessage("Membresía eliminada correctamente.");
      await loadPlans();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "No se pudo eliminar. Puede tener membresías activas asociadas.",
      );
    }
  };

  return (
    <ScrollView style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Gestión de Membresías
          </Text>
          <Text style={styles.subtitle}>Administra planes y precios</Text>
        </View>

        <Pressable
          style={[styles.button, isMobile && styles.buttonMobile]}
          onPress={openCreate}
        >
          <Ionicons name="add-outline" size={22} color="#000" />
          <Text style={styles.buttonText}>Nueva Membresía</Text>
        </Pressable>
      </View>

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

      {showForm ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {editingPlan ? "Editar Membresía" : "Nueva Membresía"}
          </Text>

          <Text style={styles.formLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. CrossFit Unlimited"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.formLabel}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Clases ilimitadas"
            placeholderTextColor="#777"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.formLabel}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="1200"
            placeholderTextColor="#777"
            value={price}
            onChangeText={(value) => setPrice(value.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Duración en días</Text>
          <TextInput
            style={styles.input}
            placeholder="30"
            placeholderTextColor="#777"
            value={duration}
            onChangeText={(value) => setDuration(value.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />

          <View style={styles.formActions}>
            <Pressable style={styles.cancelButton} onPress={resetForm}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.saveButton} onPress={savePlan}>
              <Text style={styles.saveText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Cargando membresías...</Text>
        </View>
      ) : plans.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No hay membresías registradas.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {plans.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                  <Ionicons name="card-outline" size={30} color="#00ff88" />
                </View>

                <View style={styles.cardActions}>
                  <Pressable onPress={() => openEdit(item)}>
                    <Ionicons name="create-outline" size={20} color="#9ca3af" />
                  </Pressable>

                  <Pressable onPress={() => deletePlan(item)}>
                    <Ionicons name="trash-outline" size={20} color="#ff6666" />
                  </Pressable>
                </View>
              </View>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>
                {item.description || "Sin descripción"}
              </Text>

              <Info label="Precio" value={`$${item.price}`} />
              <Info label="Duración" value={`${item.duration} días`} />
              <Info
                label="Estado"
                value={item.isActive === false ? "Inactiva" : "Activa"}
              />

              <Pressable style={styles.details}>
                <Text style={styles.detailsText}>Ver detalles</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 24 },

  containerMobile: { padding: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  headerMobile: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
  },

  title: { color: "#fff", fontSize: 32, fontWeight: "900" },
  titleMobile: { fontSize: 24 },
  subtitle: { color: "#b8c2cc", marginTop: 6 },

  button: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonMobile: {
    width: "100%",
  },

  buttonText: { color: "#000", fontWeight: "900" },

  errorBox: {
    backgroundColor: "#3a1515",
    borderWidth: 1,
    borderColor: "#ff4444",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  errorText: { color: "#ff6666", fontWeight: "900" },

  successBox: {
    backgroundColor: "#063d26",
    borderWidth: 1,
    borderColor: "#00ff88",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  successText: { color: "#00ff88", fontWeight: "900" },

  formCard: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    maxWidth: 760,
  },

  formTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
  },

  formLabel: {
    color: "#b8c2cc",
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 8,
  },

  input: {
    height: 56,
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    color: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
  },

  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 22,
  },

  cancelButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  cancelText: { color: "#fff", fontWeight: "900" },

  saveButton: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  saveText: { color: "#000", fontWeight: "900" },

  emptyBox: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 24,
  },

  emptyText: {
    color: "#b8c2cc",
    fontWeight: "800",
  },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 18 },

  card: {
    width: 360,
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 24,
    padding: 24,
  },

  cardMobile: {
    width: "100%",
    padding: 18,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#063d26",
    justifyContent: "center",
    alignItems: "center",
  },

  cardActions: {
    flexDirection: "row",
    gap: 16,
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 22,
  },

  description: {
    color: "#b8c2cc",
    marginTop: 8,
    marginBottom: 22,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: { color: "#b8c2cc" },
  value: { color: "#fff", fontWeight: "800" },

  details: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },

  detailsText: { color: "#fff", fontWeight: "800" },
});
