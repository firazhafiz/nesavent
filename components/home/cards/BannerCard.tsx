import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Banner } from "../types";
import { BANNER_WIDTH } from "../constants";

export default function BannerCard({
  item,
  onPress,
}: {
  item: Banner;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.bannerCard}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.bannerImage}
        imageStyle={{ borderRadius: radius["3xl"] }}
      >
        <LinearGradient
          colors={["rgba(26,22,64,0.3)", "rgba(26,22,64,0.85)"]}
          style={styles.bannerOverlay}
          locations={[0, 1]}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <TouchableOpacity style={styles.bannerCTA} onPress={onPress}>
              <Text style={styles.bannerCTAText}>{item.cta}</Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color={colors.primary.DEFAULT}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    width: BANNER_WIDTH,
    height: 150,
    borderRadius: radius["3xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
      },
      android: { elevation: 5 },
    }),
  },
  bannerImage: { flex: 1 },
  bannerOverlay: {
    flex: 1,
    borderRadius: radius["3xl"],
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  bannerContent: { gap: 4 },
  bannerSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  bannerTitle: { fontFamily: fontFamily.bold, fontSize: 18, color: "#fff" },
  bannerCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.accent.DEFAULT,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: 4,
  },
  bannerCTAText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
  },
});
