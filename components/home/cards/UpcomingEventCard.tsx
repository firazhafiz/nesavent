import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREEN_WIDTH } from "../constants";
import { UpcomingEvent } from "../types";

export default function UpcomingEventCard({
  item,
  onPress,
}: {
  item: UpcomingEvent;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.upcomingCardModern}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.upcomingCardModernImage}
      >
        <View style={styles.upcomingDaysBadge}>
          <Text style={styles.upcomingDaysBadgeNum}>{item.daysLeft}</Text>
          <Text style={styles.upcomingDaysBadgeLabel}>HARI LAGI</Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(16, 14, 39, 0.8)", "rgba(26,22,64,1)"]}
          style={styles.upcomingCardModernOverlay}
          locations={[0.3, 0.8, 1]}
        >
          <Text style={styles.upcomingCardModernTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.upcomingCardModernMetaRow}>
            <Ionicons name="calendar" size={12} color={colors.accent.light} />
            <Text style={styles.upcomingCardModernMetaText}>{item.date}</Text>
            <View style={styles.upcomingCardModernDot} />
            <Ionicons name="location" size={12} color={colors.accent.light} />
            <Text style={styles.upcomingCardModernMetaText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  upcomingCardModern: {
    width: SCREEN_WIDTH * 0.85,
    height: 200,
    borderRadius: radius["2xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  upcomingCardModernImage: {
    width: "100%",
    height: "100%",
  },
  upcomingDaysBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  upcomingDaysBadgeNum: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: colors.primary.DEFAULT,
    lineHeight: 18,
  },
  upcomingDaysBadgeLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 8,
    color: colors.primary.DEFAULT,
    letterSpacing: 0.5,
  },
  upcomingCardModernOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingTop: spacing["5xl"],
    gap: 6,
  },
  upcomingCardModernTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: "#fff",
    letterSpacing: -0.5,
  },
  upcomingCardModernMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  upcomingCardModernMetaText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  upcomingCardModernDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
});
