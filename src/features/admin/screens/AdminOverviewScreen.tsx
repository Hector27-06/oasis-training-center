import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminOverviewScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Usuarios"
          value="248"
          detail="+12 este mes"
          icon="people-outline"
          active
        />
        <StatCard
          title="Membresías Activas"
          value="186"
          detail="75.0% del total"
          icon="card-outline"
        />
        <StatCard
          title="Ingresos del Mes"
          value="$24,580"
          detail="+5.1% vs mes anterior"
          icon="cash-outline"
        />
        <StatCard
          title="Nuevos Usuarios"
          value="12"
          detail="Últimos 30 días"
          icon="person-add-outline"
        />
        <StatCard
          title="Clases Hoy"
          value="8"
          detail="86/120 reservas"
          icon="calendar-outline"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.panel, { flex: 1.4 }]}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>↗ Ingresos Mensuales</Text>
            <Text style={styles.green}>+18.7%</Text>
          </View>

          <Text style={styles.bigValue}>$112,450</Text>
          <Text style={styles.muted}>Ingresos totales</Text>

          <View style={styles.fakeChart}>
            {[
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ].map((m, i) => (
              <View key={m} style={styles.chartItem}>
                <View style={[styles.bar, { height: 35 + ((i * 17) % 90) }]} />
                <Text style={styles.month}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.panel, { flex: 1 }]}>
          <Text style={styles.panelTitle}>▭ Distribución de Membresías</Text>

          <View style={styles.membershipList}>
            <Membership name="CrossFit Unlimited" value="100" percent="53.8%" />
            <Membership name="Hyrox Training" value="45" percent="24.2%" />
            <Membership name="Calistenia" value="32" percent="17.2%" />
            <Membership name="Open Box" value="9" percent="4.8%" />
          </View>
        </View>

        <View style={[styles.panel, { flex: 0.9 }]}>
          <Text style={styles.panelTitle}>Estado de Membresías</Text>

          <Status label="Activas" value="186" percent="75.0%" type="active" />
          <Status label="Por vencer" value="18" percent="7.3%" type="warning" />
          <Status label="Vencidas" value="44" percent="17.7%" type="danger" />

          <View style={styles.totalRow}>
            <Text style={styles.white}>Total</Text>
            <Text style={styles.white}>248</Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.panel, { flex: 1.2 }]}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Actividad Reciente</Text>
            <Text style={styles.green}>Ver todas</Text>
          </View>

          <Activity
            name="María González"
            detail="Nueva membresía • CrossFit Unlimited"
            time="Hace 5 min"
            icon="person-outline"
          />
          <Activity
            name="Pago recibido de Pedro Martínez"
            detail="Hyrox Training • $150.00"
            time="Hace 1 hora"
            icon="cash-outline"
          />
          <Activity
            name="Nueva clase creada"
            detail="CrossFit WOD • Mañana 06:00"
            time="Hace 2 horas"
            icon="calendar-outline"
          />
          <Activity
            name="Entrada de inventario"
            detail="Proteína Whey • +20 unidades"
            time="Hace 3 horas"
            icon="cube-outline"
          />
        </View>

        <View style={[styles.panel, { flex: 0.9 }]}>
          <Text style={styles.panelTitle}>Clases Más Populares</Text>

          <Popular
            index="1"
            name="CrossFit WOD"
            reservations="86 reservas"
            percent="71.7%"
          />
          <Popular
            index="2"
            name="Hyrox Training"
            reservations="52 reservas"
            percent="57.8%"
          />
          <Popular
            index="3"
            name="Calistenia Básica"
            reservations="31 reservas"
            percent="51.7%"
          />
          <Popular
            index="4"
            name="Gimnasia & Mobility"
            reservations="17 reservas"
            percent="37.8%"
          />
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ title, value, detail, icon, active }: any) {
  return (
    <View style={[styles.statCard, active && styles.statActive]}>
      <View style={styles.cardHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <Ionicons name={icon} size={24} color="#00ff88" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statDetail}>{detail}</Text>
    </View>
  );
}

function Membership({ name, value, percent }: any) {
  return (
    <View style={styles.membershipRow}>
      <View>
        <Text style={styles.white}>{name}</Text>
        <Text style={styles.muted}>
          {value} ({percent})
        </Text>
      </View>
    </View>
  );
}

function Status({ label, value, percent, type }: any) {
  const color =
    type === "active" ? "#00ff88" : type === "warning" ? "#facc15" : "#ff4444";

  return (
    <View style={styles.statusRow}>
      <Text style={[styles.white, { color }]}>{label}</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.white}>{value}</Text>
        <Text style={styles.muted}>{percent}</Text>
      </View>
    </View>
  );
}

function Activity({ name, detail, time, icon }: any) {
  return (
    <View style={styles.activity}>
      <View style={styles.activityIcon}>
        <Ionicons name={icon} size={22} color="#00ff88" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.whiteBold}>{name}</Text>
        <Text style={styles.muted}>{detail}</Text>
      </View>
      <Text style={styles.muted}>{time}</Text>
    </View>
  );
}

function Popular({ index, name, reservations, percent }: any) {
  return (
    <View style={styles.popular}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{index}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.whiteBold}>{name}</Text>
        <Text style={styles.muted}>{reservations}</Text>
        <View style={styles.progress}>
          <View style={[styles.progressFill, { width: percent }]} />
        </View>
      </View>

      <Text style={styles.white}>{percent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 24,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 20,
  },
  statActive: {
    backgroundColor: "#06351f",
    borderColor: "#087a49",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statTitle: {
    color: "#b8c2cc",
    fontWeight: "800",
  },
  statValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 18,
  },
  statDetail: {
    color: "#00ff88",
    marginTop: 6,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 18,
  },
  panel: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 18,
    padding: 22,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  panelTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  green: {
    color: "#00ff88",
    fontWeight: "900",
  },
  bigValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 18,
  },
  muted: {
    color: "#b8c2cc",
  },
  white: {
    color: "#fff",
  },
  whiteBold: {
    color: "#fff",
    fontWeight: "900",
  },
  fakeChart: {
    height: 180,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#242424",
    paddingTop: 20,
  },
  chartItem: {
    flex: 1,
    alignItems: "center",
  },
  bar: {
    width: "70%",
    backgroundColor: "#00ff88",
    borderRadius: 8,
  },
  month: {
    color: "#b8c2cc",
    marginTop: 8,
    fontSize: 12,
  },
  membershipList: {
    gap: 18,
    marginTop: 24,
  },
  membershipRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#242424",
    paddingBottom: 12,
  },
  statusRow: {
    height: 64,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 14,
    marginTop: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRow: {
    height: 50,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  activity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242424",
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#064b2b",
    justifyContent: "center",
    alignItems: "center",
  },
  popular: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#00ff88",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#000",
    fontWeight: "900",
  },
  progress: {
    height: 6,
    backgroundColor: "#2a2a2a",
    borderRadius: 999,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00ff88",
  },
});
