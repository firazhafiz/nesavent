import { colors, spacing } from "@/constants/theme";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SectionHeader from "../atom/SectionHeader";
import BannerCard from "../cards/BannerCard";
import { BANNER_WIDTH, SCREEN_WIDTH } from "../utils/constants";
import { BANNERS, LOOPING_BANNERS } from "../utils/data";

export default function BannerSection() {
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <View style={[styles.section, { paddingHorizontal: 0 }]}>
      <View style={{ paddingHorizontal: spacing.xl }}>
        <SectionHeader title="Pengumuman & Promo" icon="megaphone" />
      </View>
      <FlatList
        data={LOOPING_BANNERS}
        keyExtractor={(i) => i.uniqueId}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - BANNER_WIDTH) / 2,
        }}
        snapToInterval={BANNER_WIDTH + spacing.md}
        decelerationRate="fast"
        initialScrollIndex={BANNERS.length * 50}
        getItemLayout={(data, index) => ({
          length: BANNER_WIDTH + spacing.md,
          offset: (BANNER_WIDTH + spacing.md) * index,
          index,
        })}
        onScroll={(e) => {
          const idx = Math.round(
            e.nativeEvent.contentOffset.x / (BANNER_WIDTH + spacing.md),
          );
          setActiveBanner(idx % BANNERS.length);
        }}
        renderItem={({ item }) => <BannerCard item={item} onPress={() => {}} />}
      />
      <View style={styles.bannerDots}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.bannerDot,
              i === activeBanner && styles.bannerDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.sm,
  },
  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: spacing.sm,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  bannerDotActive: { width: 18, backgroundColor: colors.accent.DEFAULT },
});
