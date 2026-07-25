import React, { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Client, clientService } from "@/src/services/client.service";
import { userService } from "@/src/services/user.service";
import { UserAccount } from "@/src/types/user.types";
import AdminMobileDataCard from "@/src/features/admin/components/AdminMobileDataCard";
import useResponsive from "@/src/hooks/useResponsive";

import AdminRegisterUserScreen from "./AdminRegisterUserScreen";

export default function AdminUsersScreen() {
  const [section, setSection] = useState<"users" | "clients">("users");

  if (section === "clients") {
    return <AdminClientsScreen onShowUsers={() => setSection("users")} />;
  }

  return <UserAccountsScreen onShowClients={() => setSection("clients")} />;
}

function AdminClientsScreen({ onShowUsers }: { onShowUsers: () => void }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [showRegister, setShowRegister] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const loadClients = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await clientService.getClients({ limit: 50 });

      setClients(response.data);
      setFilteredClients(response.data);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "No se pudieron cargar los usuarios.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);

    const normalized = value.toLowerCase();

    const result = clients.filter((client) => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const email = client.user?.email?.toLowerCase() || "";
      const phone = client.phone || "";

      return (
        fullName.includes(normalized) ||
        email.includes(normalized) ||
        phone.includes(normalized)
      );
    });

    setFilteredClients(result);
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setEditName(`${client.firstName} ${client.lastName}`);
    setEditPhone(client.phone || "");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const cancelEdit = () => {
    setEditingClient(null);
    setEditName("");
    setEditPhone("");
  };

  const saveEdit = async () => {
    if (!editingClient) return;

    const phoneRegex = /^[0-9]{10}$/;

    const [firstName, ...lastNameParts] = editName.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    if (!firstName || !lastName) {
      setErrorMessage("Ingresa nombre y apellido.");
      return;
    }

    if (!phoneRegex.test(editPhone.trim())) {
      setErrorMessage("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    try {
      await clientService.updateClient(editingClient.id, {
        firstName,
        lastName,
        phone: editPhone.trim(),
      });

      setSuccessMessage("Usuario actualizado correctamente.");
      cancelEdit();
      await loadClients();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "No se pudo actualizar el usuario.",
      );
    }
  };

  const deleteClient = async (client: Client) => {
    try {
      await clientService.deleteClient(client.id);

      setSuccessMessage("Usuario eliminado correctamente.");
      await loadClients();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "No se pudo eliminar el usuario.",
      );
    }
  };

  const confirmDelete = (client: Client) => {
    Alert.alert(
      "Eliminar cliente",
      `¿Seguro que deseas eliminar a ${client.firstName} ${client.lastName}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => void deleteClient(client) },
      ],
    );
  };

  if (showRegister) {
    return <AdminRegisterUserScreen />;
  }

  return (
    <ScrollView style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.topBar, isMobile && styles.topBarMobile]}>
        <View>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Gestión de Clientes
          </Text>
          <Text style={styles.subtitle}>
            Información, edición y baja de clientes
          </Text>
        </View>

        <View style={[styles.headerActions, isMobile && styles.headerActionsMobile]}>
          <Pressable style={styles.secondaryButton} onPress={onShowUsers}>
            <Text style={styles.secondaryButtonText}>Cuentas</Text>
          </Pressable>
          <Pressable
            style={[
              styles.registerButton,
              isMobile && styles.registerButtonMobile,
            ]}
            onPress={() => setShowRegister(true)}
          >
            <Ionicons name="person-add-outline" size={20} color="#000" />
            <Text style={styles.registerText}>Registrar Cliente</Text>
          </Pressable>
        </View>
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

      {editingClient ? (
        <View style={styles.editCard}>
          <Text style={styles.editTitle}>Editar usuario</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.editInput}
            value={editName}
            onChangeText={setEditName}
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.editInput}
            value={editPhone}
            onChangeText={(value) => setEditPhone(value.replace(/[^0-9]/g, ""))}
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="#777"
          />

          <View style={[styles.editActions, isMobile && styles.editActionsMobile]}>
            <Pressable style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.saveText}>Guardar cambios</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={24} color="#9ca3af" />

        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre, email o teléfono..."
          placeholderTextColor="#8b8b8b"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Cargando usuarios...</Text>
        </View>
      ) : filteredClients.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No hay usuarios registrados.</Text>
        </View>
      ) : isMobile ? (
        <View style={styles.mobileList}>
          {filteredClients.map((client) => (
            <AdminMobileDataCard
              key={client.id}
              title={`${client.firstName} ${client.lastName}`}
              subtitle={`ID: ${client.id.slice(0, 8)}`}
              badge={<Text style={[styles.badge, client.user?.isActive ? styles.active : styles.expired]}>{client.user?.isActive ? "Activo" : "Inactivo"}</Text>}
              actions={<>
                <Pressable style={styles.mobileActionBtn} onPress={() => openEdit(client)}>
                  <Ionicons name="create-outline" size={18} color="#9ca3af" />
                  <Text style={styles.mobileActionText}>Editar</Text>
                </Pressable>
                <Pressable style={styles.mobileActionBtn} onPress={() => confirmDelete(client)}>
                  <Ionicons name="trash-outline" size={18} color="#ff6666" />
                  <Text style={[styles.mobileActionText, styles.dangerText]}>Eliminar</Text>
                </Pressable>
              </>}
            >
              <View style={styles.mobileRow}>
                <Ionicons name="mail-outline" size={16} color="#8b8b8b" />
                <Text style={styles.mobileText} numberOfLines={1}>
                  {client.user?.email || "Sin correo"}
                </Text>
              </View>

              <View style={styles.mobileRow}>
                <Ionicons name="call-outline" size={16} color="#8b8b8b" />
                <Text style={styles.mobileText}>
                  {client.phone || "Sin teléfono"}
                </Text>
              </View>

            </AdminMobileDataCard>
          ))}
        </View>
      ) : (
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.th, { flex: 1.5 }]}>Usuario</Text>
            <Text style={[styles.th, { flex: 1.5 }]}>Email</Text>
            <Text style={[styles.th, { flex: 1 }]}>Teléfono</Text>
            <Text style={[styles.th, { flex: 1 }]}>Estado</Text>
            <Text style={[styles.th, { width: 90, textAlign: "right" }]}>
              Acciones
            </Text>
          </View>

          {filteredClients.map((client) => (
            <View key={client.id} style={styles.row}>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.name}>
                  {client.firstName} {client.lastName}
                </Text>
                <Text style={styles.email}>ID: {client.id.slice(0, 8)}</Text>
              </View>

              <Text style={[styles.membership, { flex: 1.5 }]}>
                {client.user?.email || "Sin correo"}
              </Text>

              <Text style={[styles.date, { flex: 1 }]}>
                {client.phone || "Sin teléfono"}
              </Text>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.badge,
                    client.user?.isActive ? styles.active : styles.expired,
                  ]}
                >
                  {client.user?.isActive ? "Activo" : "Inactivo"}
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable onPress={() => openEdit(client)}>
                  <Ionicons name="create-outline" size={20} color="#9ca3af" />
                </Pressable>

                <Pressable onPress={() => confirmDelete(client)}>
                  <Ionicons name="trash-outline" size={20} color="#ff6666" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function UserAccountsScreen({ onShowClients }: { onShowClients: () => void }) {
  const { isMobile } = useResponsive();
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await userService.getUsers({ limit: 50 });
      setUsers(response.data);
    } catch (error: unknown) {
      setErrorMessage(getApiErrorMessage(error, "No se pudieron cargar las cuentas."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const toggleUserStatus = async (user: UserAccount) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await userService.updateUser(user.id, { isActive: !user.isActive });
      setSuccessMessage(`Cuenta ${user.isActive ? "desactivada" : "activada"} correctamente.`);
      await loadUsers();
    } catch (error: unknown) {
      setErrorMessage(getApiErrorMessage(error, "No se pudo actualizar el estado de la cuenta."));
    }
  };

  return (
    <ScrollView style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.topBar, isMobile && styles.topBarMobile]}>
        <View>
          <Text style={styles.title}>Gestión de Usuarios</Text>
          <Text style={styles.subtitle}>Cuentas, roles y estado de acceso</Text>
        </View>
        <Pressable style={[styles.secondaryButton, isMobile && styles.secondaryButtonMobile]} onPress={onShowClients}>
          <Text style={styles.secondaryButtonText}>Gestionar clientes</Text>
        </Pressable>
      </View>

      {errorMessage ? <View style={styles.errorBox}><Text style={styles.errorText}>✕ {errorMessage}</Text></View> : null}
      {successMessage ? <View style={styles.successBox}><Text style={styles.successText}>✓ {successMessage}</Text></View> : null}

      {loading ? (
        <View style={styles.emptyBox}><Text style={styles.emptyText}>Cargando cuentas...</Text></View>
      ) : users.length === 0 ? (
        <View style={styles.emptyBox}><Text style={styles.emptyText}>No hay cuentas registradas.</Text></View>
      ) : isMobile ? (
        <View style={styles.mobileList}>
          {users.map((user) => (
            <AdminMobileDataCard
              key={user.id}
              title={user.email}
              subtitle="Cuenta de acceso"
              badge={<Text style={[styles.badge, user.isActive ? styles.active : styles.expired]}>{user.isActive ? "Activo" : "Inactivo"}</Text>}
              actions={<Pressable style={styles.mobileStatusButton} onPress={() => void toggleUserStatus(user)}><Text style={styles.statusButtonText}>{user.isActive ? "Desactivar cuenta" : "Activar cuenta"}</Text></Pressable>}
            >
              <View style={styles.mobileRow}>
                <Ionicons name="mail-outline" size={16} color="#8b8b8b" />
                <Text style={styles.mobileText} numberOfLines={1} ellipsizeMode="tail">{user.email}</Text>
              </View>
              <View style={styles.mobileRow}>
                <Ionicons name="shield-outline" size={16} color="#8b8b8b" />
                <Text style={styles.mobileText}>Rol: {user.role}</Text>
              </View>
            </AdminMobileDataCard>
          ))}
        </View>
      ) : (
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.th, { flex: 2 }]}>Correo</Text>
            <Text style={[styles.th, { flex: 1 }]}>Rol</Text>
            <Text style={[styles.th, { flex: 1 }]}>Estado</Text>
            <Text style={[styles.th, { width: 130, textAlign: "right" }]}>Acciones</Text>
          </View>
          {users.map((user) => (
            <View key={user.id} style={styles.row}>
              <Text style={[styles.membership, { flex: 2 }]}>{user.email}</Text>
              <Text style={[styles.date, { flex: 1 }]}>{user.role}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.badge, user.isActive ? styles.active : styles.expired]}>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Text>
              </View>
              <View style={{ width: 130, alignItems: "flex-end" }}>
                <Pressable style={styles.statusButton} onPress={() => void toggleUserStatus(user)}>
                  <Text style={styles.statusButtonText}>{user.isActive ? "Desactivar" : "Activar"}</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function getApiErrorMessage(error: unknown, fallback: string) {
  if (typeof error !== "object" || error === null || !("response" in error)) return fallback;

  const response = error.response;
  if (typeof response !== "object" || response === null || !("data" in response)) return fallback;

  const data = response.data;
  if (typeof data !== "object" || data === null || !("message" in data)) return fallback;

  const message = data.message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.join(", ");
  return fallback;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 24,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#b8c2cc",
    fontSize: 16,
    marginTop: 6,
  },

  registerButton: {
    backgroundColor: "#00ff88",
    height: 56,
    paddingHorizontal: 22,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  registerText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 15,
  },

  secondaryButton: {
    backgroundColor: "#1f1f1f",
    borderColor: "#3a3a3a",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  secondaryButtonText: {
    color: "#fff",
    fontWeight: "800",
  },

  statusButton: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  statusButtonText: {
    color: "#00ff88",
    fontWeight: "800",
    fontSize: 13,
  },

  errorBox: {
    backgroundColor: "#3a1515",
    borderWidth: 1,
    borderColor: "#ff4444",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  errorText: {
    color: "#ff6666",
    fontWeight: "900",
  },

  successBox: {
    backgroundColor: "#063d26",
    borderWidth: 1,
    borderColor: "#00ff88",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  successText: {
    color: "#00ff88",
    fontWeight: "900",
  },

  editCard: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  editTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },

  label: {
    color: "#b8c2cc",
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 10,
  },

  editInput: {
    height: 54,
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    color: "#fff",
    paddingHorizontal: 16,
  },

  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 18,
  },

  cancelButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  cancelText: {
    color: "#fff",
    fontWeight: "900",
  },

  saveButton: {
    backgroundColor: "#00ff88",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  saveText: {
    color: "#000",
    fontWeight: "900",
  },

  searchBox: {
    height: 68,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

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

  table: {
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 18,
    overflow: "hidden",
  },

  headerRow: {
    height: 56,
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  th: {
    color: "#b8c2cc",
    fontWeight: "800",
  },

  row: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#242424",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  email: {
    color: "#b8c2cc",
    marginTop: 4,
  },

  membership: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 13,
    fontWeight: "900",
  },

  active: {
    color: "#00ff88",
    backgroundColor: "#063d26",
  },

  expired: {
    color: "#ff4d4d",
    backgroundColor: "#3a1515",
  },

  date: {
    color: "#fff",
    fontSize: 16,
  },

  actions: {
    width: 90,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
  },

  containerMobile: {
    padding: 16,
  },

  topBarMobile: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
  },
  editActionsMobile: { flexDirection: "column-reverse", alignItems: "stretch" },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerActionsMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  titleMobile: {
    fontSize: 22,
  },

  registerButtonMobile: {
    width: "100%",
    justifyContent: "center",
  },

  mobileList: {
    gap: 12,
  },

  mobileCard: {
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2b2b2b",
    borderRadius: 18,
    padding: 16,
  },

  mobileCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },

  mobileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  mobileText: {
    color: "#b8c2cc",
    fontSize: 14,
    flexShrink: 1,
  },

  mobileActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#242424",
    paddingTop: 12,
  },

  mobileActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    justifyContent: "center",
  },

  mobileActionText: {
    color: "#9ca3af",
    fontWeight: "700",
    fontSize: 13,
  },

  mobileStatusButton: { backgroundColor: "#075C39", borderRadius: 10, paddingVertical: 12, alignItems: "center" },
  dangerText: { color: "#ff6666" },
  secondaryButtonMobile: { width: "100%", alignItems: "center" },
});
