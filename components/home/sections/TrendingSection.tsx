import { spacing } from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SectionHeader from "../atom/SectionHeader";
import TrendingEventCard from "../cards/TrendingEventCard";
import { CARD_WIDTH, SCREEN_WIDTH } from "../utils/constants";
import { LOOPING_TRENDING, TRENDING_EVENTS } from "../utils/data";

export default function TrendingSection() {
  return (
    <View style={[styles.section, { paddingHorizontal: 0 }]}>
      <View style={{ paddingHorizontal: spacing.xl }}>
        <SectionHeader
          title="Trending Sekarang"
          subtitle="Event paling banyak diminati"
          icon="flame"
          onPressAll={() => {}}
        />
      </View>
      <FlatList
        data={LOOPING_TRENDING}
        keyExtractor={(i) => i.uniqueId}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
        }}
        snapToInterval={CARD_WIDTH + spacing.md}
        decelerationRate="fast"
        initialScrollIndex={TRENDING_EVENTS.length * 50}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + spacing.md,
          offset: (CARD_WIDTH + spacing.md) * index,
          index,
        })}
        renderItem={({ item }) => (
          <TrendingEventCard item={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.xs,
  },
});
