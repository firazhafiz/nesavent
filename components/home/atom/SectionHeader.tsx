import { colors, fontFamily, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SectionHeader({
  title,
  subtitle,
  icon,
  onPressAll,
}: {
  title: string;
  subtitle?: string;
  icon?: any;
  onPressAll?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1, marginRight: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {icon && (
            <Ionicons name={icon} size={20} color={colors.primary.DEFAULT} />
          )}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {onPressAll && (
        <Pressable onPress={onPressAll} style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>Lihat Semua</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.accent.DEFAULT}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.foreground,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.muted.foreground,
    marginTop: 2,
    paddingLeft: 26,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: colors.accent.DEFAULT,
  },
});
