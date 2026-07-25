import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";
import useNotifications from "@/src/hooks/useNotifications";
import useResponsive from "@/src/hooks/useResponsive";

export default function UserNotificationsScreen() {
  const { isMobile } = useResponsive();
  const {
    notifications,
    loading,
    errorMessage,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotifications();
  const [updating, setUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      setUpdatingId(id);
      setActionError("");
      await markNotificationAsRead(id);
    } catch {
      setActionError("No se pudo marcar la notificación como leída.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setUpdating(true);
      setActionError("");
      await markAllNotificationsAsRead();
    } catch {
      setActionError("No se pudieron marcar las notificaciones como leídas.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <ScrollView style={[styles.container, isMobile && styles.containerMobile]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View>
          <Text style={styles.title}>Mis Notificaciones</Text>
          <Text style={styles.subtitle}>Mantente al día con las novedades de tu cuenta</Text>
        </View>

        {unreadCount > 0 ? (
          <Pressable
            style={[styles.markAllButton, updating && styles.disabled]}
            disabled={updating || updatingId !== null}
            onPress={() => void handleMarkAllAsRead()}
          >
            <Ionicons name="checkmark-done-outline" size={20} color="#000" />
            <Text style={styles.markAllText}>{updating ? "Actualizando..." : "Marcar todas como leídas"}</Text>
          </Pressable>
        ) : null}
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {actionError ? <Text style={styles.error}>{actionError}</Text> : null}

      {loading ? (
        <View style={styles.emptyCard}><ActivityIndicator size="large" color={COLORS.primary} /></View>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="notifications-off-outline" size={34} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No tienes notificaciones.</Text>
        </View>
      ) : (
        notifications.map((notification) => (
          <Pressable
            key={notification.id}
            style={[styles.notificationCard, isMobile && styles.notificationCardMobile, !notification.isRead && styles.unreadCard]}
            disabled={notification.isRead || updating || updatingId !== null}
            onPress={() => void handleMarkAsRead(notification.id)}
          >
            <View style={styles.iconBox}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            </View>

            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                {!notification.isRead ? <Text style={styles.unreadBadge}>No leída</Text> : <Text style={styles.readBadge}>Leída</Text>}
              </View>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.date}>{formatDate(notification.createdAt)}</Text>
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 32 },
  containerMobile: { padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 16, paddingBottom: 26, borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: 26 },
  headerMobile: { flexDirection: "column", alignItems: "stretch" },
  title: { color: COLORS.text, fontSize: 34, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 18, marginTop: 8 },
  markAllButton: { backgroundColor: COLORS.primary, minHeight: 48, borderRadius: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  markAllText: { color: "#000", fontWeight: "800" },
  error: { color: "#ff6666", fontSize: 16, marginBottom: 16 },
  emptyCard: { backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, minHeight: 160, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
  notificationCard: { backgroundColor: "#111111", borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 20, flexDirection: "row", gap: 16, marginBottom: 14 },
  notificationCardMobile: { padding: 16, gap: 12 },
  unreadCard: { backgroundColor: "#042F1E", borderColor: COLORS.primary },
  iconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: "#075C39", alignItems: "center", justifyContent: "center" },
  content: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  notificationTitle: { color: COLORS.text, fontSize: 18, fontWeight: "800", flex: 1 },
  unreadBadge: { color: COLORS.primary, backgroundColor: "#075C39", borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4, fontSize: 12, fontWeight: "800" },
  readBadge: { color: COLORS.textSecondary, backgroundColor: "#1f1f1f", borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4, fontSize: 12, fontWeight: "800" },
  message: { color: COLORS.textSecondary, fontSize: 16, lineHeight: 22, marginTop: 8 },
  date: { color: COLORS.textSecondary, fontSize: 13, marginTop: 12 },
  disabled: { opacity: 0.55 },
});
