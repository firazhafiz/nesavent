import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import TagBadge from "../TagBadge";
import { formatPrice } from "../helpers";
import { TrendingEvent } from "../types";
import { CARD_WIDTH, CARD_HEIGHT } from "../constants";

export default function TrendingEventCard({
  item,
  onPress,
}: {
  item: TrendingEvent;
  onPress: () => void;
}) {
  const isAlmostFull = item.remaining <= 50;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.trendingCard}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.trendingCardImage}
      >
        {item.isHot && (
          <View style={styles.hotBadge}>
            <Ionicons name="flame" size={11} color="#fff" />
            <Text style={styles.hotBadgeText}>HOT</Text>
          </View>
        )}

        <LinearGradient
          colors={["transparent", "rgba(26,22,64,0.6)", "rgba(26,22,64,1)"]}
          style={styles.trendingCardOverlay}
          locations={[0, 0.4, 0.9]}
        >
          <View style={styles.trendingTagRow}>
            {item.tags.map((t) => (
              <TagBadge key={t} label={t} />
            ))}
          </View>
          <Text style={styles.trendingEventTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.trendingOrganizer} numberOfLines={1}>
            {item.organizer}
          </Text>
          <View style={styles.trendingMeta}>
            <View style={styles.trendingMetaItem}>
              <Ionicons
                name="calendar-outline"
                size={12}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.trendingMetaText}>{item.date}</Text>
            </View>
            <View style={styles.trendingMetaItem}>
              <Ionicons
                name="location-outline"
                size={12}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.trendingMetaText} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          </View>
          <View style={styles.trendingFooter}>
            <Text style={styles.trendingPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.quotaContainer}>
              {isAlmostFull && (
                <View style={styles.almostFullBadge}>
                  <Text style={styles.almostFullText}>Hampir Habis!</Text>
                </View>
              )}
              <Text style={styles.quotaText}>{item.remaining} sisa</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trendingCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radius["2xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
    }),
  },
  trendingCardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  trendingCardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingTop: spacing["3xl"],
    gap: 4,
  },
  hotBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FF4D4D",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    zIndex: 10,
  },
  hotBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#fff",
    letterSpacing: 0.5,
  },
  trendingTagRow: { flexDirection: "row", gap: 5, marginBottom: 2 },
  trendingEventTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  trendingOrganizer: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  trendingMeta: { gap: 3, marginTop: 4 },
  trendingMetaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  trendingMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    flex: 1,
  },
  trendingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  trendingPrice: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: colors.accent.light,
  },
  quotaContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  almostFullBadge: {
    backgroundColor: "rgba(239,68,68,0.8)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  almostFullText: { fontFamily: fontFamily.bold, fontSize: 9, color: "#fff" },
  quotaText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
  },
});
