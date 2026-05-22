import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/src/constants/colors";

const prs = [
  {
    title: "Back Squat 1RM",
    category: "Fuerza",
    date: "2026-05-08",
    value: "120kg",
    improvement: "+5kg",
    previous: "desde 115kg",
  },
  {
    title: "Deadlift 1RM",
    category: "Fuerza",
    date: "2026-05-01",
    value: "160kg",
    improvement: "+10kg",
    previous: "desde 150kg",
  },
];

export default function UserPrsScreen() {
  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PRs & Benchmarks</Text>
          <Text style={styles.subtitle}>Registra y monitorea tu progreso</Text>
        </View>

        <Pressable style={styles.addButton}>
          <Ionicons name="add-outline" size={24} color="#000" />
          <Text style={styles.addText}>Registrar PR</Text>
        </Pressable>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleRow}>
            <Ionicons
              name="trending-up-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.chartTitle}>Progreso - Back Squat</Text>
          </View>

          <View style={styles.selectBox}>
            <Text style={styles.selectText}>Back Squat</Text>
            <Ionicons
              name="chevron-down-outline"
              size={20}
              color={COLORS.text}
            />
          </View>
        </View>

        <View style={styles.fakeChart}>
          <View style={styles.yAxis}>
            <Text style={styles.axisText}>120</Text>
            <Text style={styles.axisText}>90</Text>
            <Text style={styles.axisText}>60</Text>
            <Text style={styles.axisText}>30</Text>
            <Text style={styles.axisText}>0</Text>
          </View>

          <View style={styles.chartArea}>
            <View style={[styles.line, { top: 48 }]} />
            <View style={[styles.dot, { left: "0%", top: 42 }]} />
            <View style={[styles.dot, { left: "25%", top: 38 }]} />
            <View style={[styles.dot, { left: "50%", top: 30 }]} />
            <View style={[styles.dot, { left: "75%", top: 30 }]} />
            <View style={[styles.dot, { left: "98%", top: 18 }]} />

            <View style={styles.tooltip}>
              <Text style={styles.tooltipTitle}>02/26</Text>
              <Text style={styles.tooltipValue}>value : 112</Text>
            </View>

            <View style={styles.xLabels}>
              <Text style={styles.axisText}>01/26</Text>
              <Text style={styles.axisText}>02/26</Text>
              <Text style={styles.axisText}>03/26</Text>
              <Text style={styles.axisText}>04/26</Text>
              <Text style={styles.axisText}>05/26</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.sectionTitle}>Últimos PRs registrados</Text>

        {prs.map((pr) => (
          <View key={pr.title} style={styles.prItem}>
            <View style={styles.prIcon}>
              <Ionicons
                name="trophy-outline"
                size={28}
                color={COLORS.primary}
              />
            </View>

            <View>
              <View style={styles.prTitleRow}>
                <Text style={styles.prTitle}>{pr.title}</Text>
                <Text style={styles.category}>{pr.category}</Text>
              </View>

              <View style={styles.dateRow}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.prDate}>{pr.date}</Text>
              </View>
            </View>

            <View style={styles.prRight}>
              <Text style={styles.prValue}>{pr.value}</Text>
              <Text style={styles.improvement}>⚡ {pr.improvement}</Text>
              <Text style={styles.previous}>{pr.previous}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 26,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  addText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },
  chartCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
    marginBottom: 28,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  chartTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chartTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },
  selectBox: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 48,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  selectText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },
  fakeChart: {
    height: 300,
    flexDirection: "row",
  },
  yAxis: {
    width: 60,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  axisText: {
    color: COLORS.textSecondary,
    fontSize: 18,
  },
  chartArea: {
    flex: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.textSecondary,
    position: "relative",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.primary,
    transform: [{ rotate: "-1deg" }],
  },
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: "#BFFFE2",
  },
  tooltip: {
    position: "absolute",
    left: "27%",
    top: 130,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
  },
  tooltipTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  tooltipValue: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 10,
  },
  xLabels: {
    position: "absolute",
    left: -10,
    right: 0,
    bottom: -34,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 28,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 22,
  },
  prItem: {
    backgroundColor: "#1f1f1f",
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  prIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#075C39",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  prTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  prTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
  },
  category: {
    color: "#ff4d4f",
    borderWidth: 1,
    borderColor: "#ff4d4f",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  prDate: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  prRight: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  prValue: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },
  improvement: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 8,
  },
  previous: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
});
