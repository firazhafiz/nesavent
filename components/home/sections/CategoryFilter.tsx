import React from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { CATEGORIES } from "../data";

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}) {
  return (
    <View style={[styles.section, { paddingTop: spacing.sm }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onCategoryChange(cat.id)}
            style={[
              styles.categoryChip,
              activeCategory === cat.id && styles.categoryChipActive,
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={cat.icon as any}
              size={15}
              color={
                activeCategory === cat.id
                  ? colors.primary.DEFAULT
                  : colors.muted.foreground
              }
            />
            <Text
              style={[
                styles.categoryLabel,
                activeCategory === cat.id && styles.categoryLabelActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.sm,
  },
  categoryScroll: {
    paddingRight: spacing.xs,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  categoryChipActive: {
    backgroundColor: colors.accent.DEFAULT,
    borderColor: colors.accent.DEFAULT,
  },
  categoryLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.muted.foreground,
  },
  categoryLabelActive: {
    color: colors.primary.DEFAULT,
    fontFamily: fontFamily.semibold,
  },
});
