import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExploreSection() {
  return (
    <View style={[styles.section]}>
      <LinearGradient
        colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
        style={styles.exploreCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.exploreContent}>
          <Text style={styles.exploreTitle}>Jelajahi Semua Event</Text>
          <Text style={styles.exploreSubtitle}>
            50+ event aktif tersedia dari berbagai organisasi UNESA
          </Text>
          <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85}>
            <Text style={styles.exploreBtnText}>Mulai Jelajahi</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={colors.primary.DEFAULT}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exploreCircle1} />
        <View style={styles.exploreCircle2} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.sm,
  },
  exploreCard: {
    borderRadius: radius["3xl"],
    padding: spacing.xl,
    overflow: "hidden",
    position: "relative",
    minHeight: 140,
  },
  exploreContent: {
    gap: 6,
    maxWidth: "70%",
    zIndex: 2,
  },
  exploreTitle: {
    fontFamily: fontFamily.extrabold,
    fontSize: 20,
    color: "#fff",
    letterSpacing: -0.5,
  },
  exploreSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 18,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.gold[400],
    alignSelf: "flex-start",
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.full,
    marginTop: spacing.sm,
  },
  exploreBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.primary.DEFAULT,
  },
  exploreCircle1: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.06)",
    right: -20,
    top: -30,
  },
  exploreCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
    right: 50,
    bottom: -60,
  },
});
