import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { inventoryService } from "@/src/services/inventory.service";
import ResponsiveScrollView from "@/src/components/layout/ResponsiveScrollView";
import InventoryDeleteModal from "@/src/features/admin/inventory/components/InventoryDeleteModal";
import useResponsive from "@/src/hooks/useResponsive";
import {
  CreateInventoryItemPayload,
  InventoryItem,
  InventoryStatus,
  InventoryType,
} from "@/src/types/inventory.types";

const statusLabels: Record<InventoryStatus, string> = {
  AVAILABLE: "Disponible",
  IN_MAINTENANCE: "En mantenimiento",
  DAMAGED: "Dañado",
  RETIRED: "Retirado",
};

const typeLabels: Record<InventoryType, string> = {
  EQUIPMENT: "Equipo",
  PRODUCT: "Producto",
};

export default function AdminInventoryScreen() {
  const { isMobile } = useResponsive();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeletion, setPendingDeletion] = useState<InventoryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<InventoryType>("PRODUCT");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<InventoryStatus>("AVAILABLE");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [maintenanceRequired, setMaintenanceRequired] = useState(false);
  const [notes, setNotes] = useState("");

  const loadInventory = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setItems(await inventoryService.getInventory());
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error, "No se pudo cargar el inventario."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInventory();
  }, []);

  const resetForm = () => {
    setShowForm(false);
    setName("");
    setType("PRODUCT");
    setCategory("");
    setDescription("");
    setQuantity("");
    setMinStock("");
    setPrice("");
    setStatus("AVAILABLE");
    setPurchaseDate("");
    setMaintenanceRequired(false);
    setNotes("");
  };

  const createItem = async () => {
    const numericQuantity = Number(quantity);
    const numericMinStock = Number(minStock);
    const numericPrice = Number(price);

    if (
      !name.trim() ||
      !category.trim() ||
      !description.trim() ||
      !purchaseDate.trim() ||
      !notes.trim() ||
      !Number.isFinite(numericQuantity) ||
      !Number.isFinite(numericMinStock) ||
      !Number.isFinite(numericPrice)
    ) {
      setErrorMessage("Completa todos los campos con valores válidos.");
      return;
    }

    const payload: CreateInventoryItemPayload = {
      name: name.trim(),
      type,
      category: category.trim(),
      description: description.trim(),
      quantity: numericQuantity,
      minStock: numericMinStock,
      price: numericPrice,
      status,
      purchaseDate: purchaseDate.trim(),
      maintenanceRequired,
      notes: notes.trim(),
    };

    try {
      setSaving(true);
      setErrorMessage("");
      await inventoryService.createInventoryItem(payload);
      setSuccessMessage("Artículo agregado correctamente.");
      resetForm();
      await loadInventory();
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error, "No se pudo agregar el artículo."));
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (item: InventoryItem) => {
    try {
      setDeletingId(item.id);
      setErrorMessage("");
      await inventoryService.deleteInventoryItem(item.id);
      setSuccessMessage("Artículo eliminado correctamente.");
      setPendingDeletion(null);
      await loadInventory();
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error, "No se pudo eliminar el artículo."));
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (item: InventoryItem) => {
    setErrorMessage("");
    setPendingDeletion(item);
  };

  return (
    <ResponsiveScrollView contentStyle={styles.content}>
      <InventoryDeleteModal
        visible={pendingDeletion !== null}
        itemName={pendingDeletion?.name || ""}
        loading={deletingId === pendingDeletion?.id}
        errorMessage={pendingDeletion ? errorMessage : undefined}
        onCancel={() => setPendingDeletion(null)}
        onConfirm={() => {
          if (pendingDeletion) {
            void deleteItem(pendingDeletion);
          }
        }}
      />
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View>
          <Text style={styles.title}>Inventario</Text>
          <Text style={styles.subtitle}>Registro y control de productos</Text>
        </View>

        <Pressable style={[styles.primaryButton, isMobile && styles.primaryButtonMobile]} onPress={() => setShowForm(true)}>
          <Ionicons name="add-outline" size={22} color="#000" />
          <Text style={styles.primaryText}>Nuevo Producto</Text>
        </Pressable>
      </View>

      {errorMessage ? <Message type="error" text={errorMessage} /> : null}
      {successMessage ? <Message type="success" text={successMessage} /> : null}

      {showForm ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Nuevo artículo</Text>
          <Input label="Nombre" value={name} onChangeText={setName} placeholder="Ej. Barra Olímpica" />

          <Text style={styles.label}>Tipo</Text>
          <OptionRow value={type} options={["EQUIPMENT", "PRODUCT"]} labels={typeLabels} onChange={setType} />
          <Input label="Categoría" value={category} onChangeText={setCategory} placeholder="Ej. Pesas" />
          <Input label="Descripción" value={description} onChangeText={setDescription} placeholder="Descripción del artículo" />
          <Input label="Cantidad" value={quantity} onChangeText={setQuantity} placeholder="0" keyboardType="numeric" />
          <Input label="Stock mínimo" value={minStock} onChangeText={setMinStock} placeholder="0" keyboardType="numeric" />
          <Input label="Precio" value={price} onChangeText={setPrice} placeholder="0" keyboardType="decimal-pad" />

          <Text style={styles.label}>Estado</Text>
          <OptionRow value={status} options={["AVAILABLE", "IN_MAINTENANCE", "DAMAGED", "RETIRED"]} labels={statusLabels} onChange={setStatus} />
          <Input label="Fecha de compra" value={purchaseDate} onChangeText={setPurchaseDate} placeholder="YYYY-MM-DD" />

          <View style={styles.switchRow}>
            <Text style={styles.label}>Requiere mantenimiento</Text>
            <Switch value={maintenanceRequired} onValueChange={setMaintenanceRequired} trackColor={{ false: "#2a2a2a", true: "#075C39" }} thumbColor={maintenanceRequired ? "#00ff88" : "#aaa"} />
          </View>

          <Input label="Notas" value={notes} onChangeText={setNotes} placeholder="Ej. Proveedor: GymPro" multiline />

          <View style={[styles.formActions, isMobile && styles.formActionsMobile]}>
            <Pressable style={styles.cancelButton} onPress={resetForm}><Text style={styles.cancelText}>Cancelar</Text></Pressable>
            <Pressable style={[styles.saveButton, saving && styles.disabled]} disabled={saving} onPress={() => void createItem()}><Text style={styles.saveText}>{saving ? "Guardando..." : "Guardar"}</Text></Pressable>
          </View>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.emptyBox}><ActivityIndicator size="large" color="#00ff88" /></View>
      ) : items.length === 0 ? (
        <View style={styles.emptyBox}><Text style={styles.emptyText}>No hay artículos registrados.</Text></View>
      ) : (
        items.map((item) => (
          <View key={item.id} style={[styles.card, isMobile && styles.cardMobile]}>
            <View>
              <Text style={styles.product}>{item.name}</Text>
              <Text style={styles.category}>{item.category} · {typeLabels[item.type]}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.status}>{statusLabels[item.status]}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.stock}>{item.quantity}</Text>
              <Text style={styles.stockLabel}>stock</Text>
              <Pressable
                style={[styles.deleteButton, deletingId === item.id && styles.disabled]}
                disabled={deletingId !== null}
                onPress={() => confirmDelete(item)}
              >
                <Ionicons name="trash-outline" size={17} color="#ff6666" />
                <Text style={styles.deleteText}>
                  {deletingId === item.id ? "Eliminando..." : "Eliminar"}
                </Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </ResponsiveScrollView>
  );
}

function getErrorMessage(error: unknown, fallback: string) {
  const apiError = error as { response?: { data?: { message?: string } } };
  return apiError.response?.data?.message || fallback;
}

function Message({ type, text }: { type: "error" | "success"; text: string }) {
  return <View style={type === "error" ? styles.errorBox : styles.successBox}><Text style={type === "error" ? styles.errorText : styles.successText}>{text}</Text></View>;
}

function Input({ label, multiline = false, ...props }: { label: string; multiline?: boolean } & React.ComponentProps<typeof TextInput>) {
  return <><Text style={styles.label}>{label}</Text><TextInput {...props} style={[styles.input, multiline && styles.notesInput]} multiline={multiline} placeholderTextColor="#777" /></>;
}

function OptionRow<T extends string>({ value, options, labels, onChange }: { value: T; options: T[]; labels: Record<T, string>; onChange: (value: T) => void }) {
  return <View style={styles.optionRow}>{options.map((option) => <Pressable key={option} style={[styles.optionButton, value === option && styles.optionButtonActive]} onPress={() => onChange(option)}><Text style={[styles.optionText, value === option && styles.optionTextActive]}>{labels[option]}</Text></Pressable>)}</View>;
}

const styles = StyleSheet.create({
  content: { maxWidth: 1120, alignSelf: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 24 },
  headerMobile: { flexDirection: "column", alignItems: "stretch" },
  title: { color: "#fff", fontSize: 32, fontWeight: "800" }, subtitle: { color: "#b8c2cc", marginTop: 6 },
  primaryButton: { backgroundColor: "#00ff88", paddingHorizontal: 22, paddingVertical: 14, borderRadius: 16, flexDirection: "row", alignItems: "center", gap: 8 }, primaryText: { color: "#000", fontWeight: "900" },
  primaryButtonMobile: { justifyContent: "center" },
  errorBox: { backgroundColor: "#3a1515", borderWidth: 1, borderColor: "#ff4444", borderRadius: 14, padding: 14, marginBottom: 16 }, errorText: { color: "#ff6666", fontWeight: "800" }, successBox: { backgroundColor: "#063d26", borderWidth: 1, borderColor: "#00ff88", borderRadius: 14, padding: 14, marginBottom: 16 }, successText: { color: "#00ff88", fontWeight: "800" },
  formCard: { backgroundColor: "#171717", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 20, padding: 22, marginBottom: 24 }, formTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 4 }, label: { color: "#b8c2cc", fontWeight: "700", marginTop: 14, marginBottom: 8 }, input: { minHeight: 54, backgroundColor: "#202020", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 14, color: "#fff", paddingHorizontal: 16, paddingVertical: 12 }, notesInput: { minHeight: 82, textAlignVertical: "top" }, optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, optionButton: { backgroundColor: "#202020", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11 }, optionButtonActive: { backgroundColor: "#063d26", borderColor: "#00ff88" }, optionText: { color: "#b8c2cc", fontWeight: "700" }, optionTextActive: { color: "#00ff88" }, switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }, formActions: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 22 }, formActionsMobile: { flexDirection: "column-reverse", alignItems: "stretch" }, cancelButton: { backgroundColor: "#2a2a2a", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 }, cancelText: { color: "#fff", fontWeight: "800" }, saveButton: { backgroundColor: "#00ff88", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 }, saveText: { color: "#000", fontWeight: "800" }, disabled: { opacity: 0.55 },
  emptyBox: { backgroundColor: "#171717", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 18, padding: 28, alignItems: "center" }, emptyText: { color: "#b8c2cc", fontWeight: "700" },
  card: { backgroundColor: "#171717", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 20, padding: 22, marginBottom: 16, flexDirection: "row", justifyContent: "space-between" }, cardMobile: { flexDirection: "column", gap: 16 }, product: { color: "#fff", fontSize: 22, fontWeight: "800" }, category: { color: "#b8c2cc", marginTop: 6 }, description: { color: "#9ca3af", marginTop: 8, maxWidth: 360 }, status: { color: "#00ff88", fontWeight: "700", marginTop: 10 }, right: { alignItems: "flex-end" }, stock: { color: "#00ff88", fontSize: 28, fontWeight: "900" }, stockLabel: { color: "#aaa" }, deleteButton: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#3a1515", borderWidth: 1, borderColor: "#ff4444", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginTop: 14 }, deleteText: { color: "#ff6666", fontSize: 13, fontWeight: "800" },
});
