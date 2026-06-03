import { spacing } from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SectionHeader from "../atom/SectionHeader";
import UpcomingEventCard from "../cards/UpcomingEventCard";
import { SCREEN_WIDTH } from "../utils/constants";
import { UPCOMING_EVENTS } from "../utils/data";

export default function UpcomingSection() {
  return (
    <View style={[styles.section, { paddingHorizontal: 0 }]}>
      <View style={{ paddingHorizontal: spacing.xl }}>
        <SectionHeader
          title="Segera Hadir"
          subtitle="Jangan sampai ketinggalan"
          icon="calendar"
          onPressAll={() => {}}
        />
      </View>
      <FlatList
        data={UPCOMING_EVENTS}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.xl }}
        snapToInterval={SCREEN_WIDTH * 0.85 + spacing.md}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <UpcomingEventCard item={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.sm,
  },
});
