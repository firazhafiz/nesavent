import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../helpers";
import { ForYouEvent } from "../types";

export default function ForYouCard({
  item,
  onPress,
}: {
  item: ForYouEvent;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.forYouCard}
      activeOpacity={0.85}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.forYouImage}
        imageStyle={{
          borderTopLeftRadius: radius["2xl"],
          borderTopRightRadius: radius["2xl"],
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(26,22,64,0.55)"]}
          style={StyleSheet.absoluteFillObject}
          locations={[0.4, 1]}
        />
        <View style={styles.forYouCategoryBadge}>
          <Text style={styles.forYouCategoryText}>{item.category}</Text>
        </View>
      </ImageBackground>
      <View style={styles.forYouBody}>
        <Text style={styles.forYouTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.forYouOrganizer} numberOfLines={1}>
          {item.organizer}
        </Text>
        <View style={styles.forYouMeta}>
          <View style={styles.forYouMetaItem}>
            <Ionicons
              name="calendar-outline"
              size={12}
              color={colors.muted.foreground}
            />
            <Text style={styles.forYouMetaText} numberOfLines={1}>
              {item.date.includes(",")
                ? item.date.split(",")[1].trim()
                : item.date}
            </Text>
          </View>
          <View style={styles.forYouMetaItem}>
            <Ionicons
              name="time-outline"
              size={12}
              color={colors.muted.foreground}
            />
            <Text style={styles.forYouMetaText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.forYouFooter}>
          <Text
            style={[
              styles.forYouPrice,
              {
                color:
                  item.price === 0 ? colors.success.DEFAULT : colors.foreground,
              },
            ]}
          >
            {formatPrice(item.price)}
          </Text>
          <View style={styles.forYouBookmark}>
            <Ionicons
              name="bookmark-outline"
              size={16}
              color={colors.muted.foreground}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  forYouCard: {
    width: 200,
    backgroundColor: colors.card,
    borderRadius: radius["2xl"],
    overflow: "hidden",
  },
  forYouImage: {
    width: "100%",
    height: 120,
  },
  forYouCategoryBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.secondary.DEFAULT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  forYouCategoryText: {
    fontFamily: fontFamily.semibold,
    fontSize: 10,
    color: "#fff",
  },
  forYouBody: {
    padding: spacing.md,
    gap: 4,
  },
  forYouTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: colors.foreground,
    lineHeight: 18,
  },
  forYouOrganizer: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  forYouMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
    flexWrap: "wrap",
  },
  forYouMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  forYouMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  forYouFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  forYouPrice: { fontFamily: fontFamily.bold, fontSize: 14 },
  forYouBookmark: {
    width: 28,
    height: 28,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
