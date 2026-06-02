import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { SEARCH_BAR_H, SEARCH_OVERLAP } from "../constants";
import { mockUser } from "../data";

export default function HeaderSection({
  originalHeaderOpacity,
  insets,
}: {
  originalHeaderOpacity: Animated.AnimatedInterpolation<number>;
  insets: EdgeInsets;
}) {
  return (
    <Animated.View style={{ opacity: originalHeaderOpacity }}>
      <LinearGradient
        colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: SEARCH_OVERLAP,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
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

        <View style={styles.statsContainer}>
          {[
            { value: "24", label: "Event Aktif", icon: "calendar-outline" },
            { value: "2", label: "Tiket Saya", icon: "ticket-outline" },
            { value: "5", label: "Tersimpan", icon: "bookmark-outline" },
            {
              value: "8",
              label: "Diikuti",
              icon: "checkmark-circle-outline",
            },
          ].map((s, index, array) => (
            <React.Fragment key={s.label}>
              <TouchableOpacity
                style={styles.statCard}
                activeOpacity={0.75}
              >
                <Text style={styles.statNum}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </TouchableOpacity>
              {index < array.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.searchBarFloat}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.muted.foreground}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari event, organisasi..."
            placeholderTextColor={colors.muted.foreground}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchFilter}>
            <Feather name="sliders" size={16} color={colors.primary.DEFAULT} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: radius["3xl"],
    borderBottomRightRadius: radius["3xl"],
    zIndex: 20,
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing["2xl"],
    marginTop: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  statNum: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: "#fff",
    lineHeight: 20,
  },
  statLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 9,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.accent.DEFAULT, // Gold 500
    alignSelf: "center",
    opacity: 0.4,
  },
  searchBarFloat: {
    marginHorizontal: spacing.lg,
    marginTop: -SEARCH_OVERLAP,
    zIndex: 30,
    ...Platform.select({
      android: { elevation: 10 },
    }),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: SEARCH_BAR_H,
    gap: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.gold[400],
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.foreground,
  },
  searchFilter: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
