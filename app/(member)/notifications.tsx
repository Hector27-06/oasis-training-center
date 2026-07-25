import AppLayout from "@/src/components/layout/AppLayout";
import { NotificationProvider } from "@/src/context/NotificationContext";
import UserNotificationsScreen from "@/src/features/user/screens/UserNotificationsScreen";

export default function NotificationsScreen() {
  return (
    <NotificationProvider>
      <AppLayout>
        <UserNotificationsScreen />
      </AppLayout>
    </NotificationProvider>
  );
}
