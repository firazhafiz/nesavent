import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Platform, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { mockUser } from "../data";
import { EdgeInsets } from "react-native-safe-area-context";

export default function StickyHeader({
  stickyHeaderOpacity,
  stickyHeaderTranslateY,
  insets,
}: {
  stickyHeaderOpacity: Animated.AnimatedInterpolation<number>;
  stickyHeaderTranslateY: Animated.AnimatedInterpolation<number>;
  insets: EdgeInsets;
}) {
  return (
    <Animated.View
      style={[
        styles.stickyHeader,
        {
          opacity: stickyHeaderOpacity,
          transform: [{ translateY: stickyHeaderTranslateY }],
          paddingTop: insets.top + spacing.sm,
        },
      ]}
    >
      <LinearGradient
        colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.headerTopRow}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrapper}>
            <ImageBackground
              source={{ uri: mockUser.avatar }}
              style={styles.avatar}
              imageStyle={{ borderRadius: radius.full }}
            />
            <View
              style={[
                styles.onlineIndicator,
                { backgroundColor: colors.success.DEFAULT },
              ]}
            />
          </View>
          <View style={styles.headerGreeting}>
            <View style={styles.headerGreetingRow}>
              <Text style={styles.headerHi}>Halo, </Text>
              <Text style={styles.headerName}>
                {mockUser.name.split(" ")[0]}! 👋
              </Text>
            </View>
            <Text style={styles.roleText}>{mockUser.role}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          {mockUser.notifCount > 0 && (
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>{mockUser.notifCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    flex: 1,
  },
  avatarWrapper: {
    position: "relative",
    width: 46,
    height: 46,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accent.DEFAULT,
    overflow: "hidden",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  headerGreeting: {
    flex: 1,
    gap: 2,
  },
  headerGreetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerHi: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "rgba(255,255,255,0.75)",
  },
  headerName: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#fff",
  },
  roleText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent.DEFAULT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 9,
    color: colors.primary.DEFAULT,
  },
});
