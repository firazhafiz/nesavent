import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fontFamily, radius } from "@/constants/theme";

export default function TagBadge({ label }: { label: string }) {
  const isFree = label === "Gratis";
  return (
    <View style={[styles.tagBadge, isFree ? styles.tagFree : styles.tagPaid]}>
      <Text
        style={[
          styles.tagText,
          isFree ? styles.tagFreeText : styles.tagPaidText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  tagFree: { backgroundColor: "rgba(34,197,94,0.25)" },
  tagPaid: { backgroundColor: "rgba(201,151,60,0.25)" },
  tagText: { fontFamily: fontFamily.semibold, fontSize: 10 },
  tagFreeText: { color: "#6EE7A3" },
  tagPaidText: { color: colors.accent.light },
});
