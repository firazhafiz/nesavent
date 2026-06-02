import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ticket } from "../types";
import { SCREEN_WIDTH } from "../constants";

export default function TicketCard({
  item,
  onPress,
}: {
  item: Ticket;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.ticketCard}
      activeOpacity={0.88}
    >
      <View style={[styles.ticketAccent, { backgroundColor: item.color }]} />
      <View style={styles.ticketBody}>
        <View style={styles.ticketHeader}>
          <View style={styles.ticketTypeBadge}>
            <Text style={styles.ticketTypeText}>{item.ticketType}</Text>
          </View>
          <View
            style={[
              styles.ticketStatusBadge,
              { backgroundColor: colors.status.approved.bg },
            ]}
          >
            <View
              style={[
                styles.ticketStatusDot,
                { backgroundColor: colors.status.approved.text },
              ]}
            />
            <Text
              style={[
                styles.ticketStatusText,
                { color: colors.status.approved.text },
              ]}
            >
              Aktif
            </Text>
          </View>
        </View>
        <Text style={styles.ticketTitle} numberOfLines={2}>
          {item.eventTitle}
        </Text>
        <Text style={styles.ticketOrganizer}>{item.organizer}</Text>

        <View style={styles.ticketDivider}>
          <View style={styles.ticketDividerCircleLeft} />
          <View style={styles.ticketDividerLine} />
          <View style={styles.ticketDividerCircleRight} />
        </View>

        <View style={styles.ticketInfoRow}>
          <View style={styles.ticketInfoItem}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color={colors.muted.foreground}
            />
            <Text style={styles.ticketInfoText} numberOfLines={1}>
              {item.date}
            </Text>
          </View>
          <View style={styles.ticketInfoItem}>
            <Ionicons
              name="time-outline"
              size={13}
              color={colors.muted.foreground}
            />
            <Text style={styles.ticketInfoText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.ticketInfoRow}>
          <View style={styles.ticketInfoItem}>
            <Ionicons
              name="location-outline"
              size={13}
              color={colors.muted.foreground}
            />
            <Text style={styles.ticketInfoText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
        <View style={styles.ticketCodeRow}>
          <MaterialCommunityIcons
            name="qrcode"
            size={22}
            color={colors.primary.DEFAULT}
          />
          <Text style={styles.ticketCode}>{item.ticketCode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ticketCard: {
    width: SCREEN_WIDTH * 0.78,
    backgroundColor: colors.card,
    borderRadius: radius["2xl"],
    flexDirection: "row",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 3 },
    }),
  },
  ticketAccent: {
    width: 6,
    borderTopLeftRadius: radius["2xl"],
    borderBottomLeftRadius: radius["2xl"],
  },
  ticketBody: {
    flex: 1,
    padding: spacing.md,
    gap: 4,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  ticketTypeBadge: {
    backgroundColor: colors.navy[50],
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ticketTypeText: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    color: colors.primary.DEFAULT,
  },
  ticketStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ticketStatusDot: { width: 6, height: 6, borderRadius: 3 },
  ticketStatusText: { fontFamily: fontFamily.semibold, fontSize: 11 },
  ticketTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 20,
  },
  ticketOrganizer: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.muted.foreground,
  },
  ticketDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.sm,
    marginHorizontal: -spacing.md,
  },
  ticketDividerCircleLeft: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.background,
  },
  ticketDividerLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  ticketDividerCircleRight: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.background,
  },
  ticketInfoRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  ticketInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  ticketInfoText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
    flex: 1,
  },
  ticketCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  ticketCode: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
    letterSpacing: 0.5,
  },
});
