import { spacing } from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SectionHeader from "../atom/SectionHeader";
import ForYouCard from "../cards/ForYouCard";
import { FOR_YOU_EVENTS } from "../utils/data";

export default function ForYouSection() {
  return (
    <View style={styles.section}>
      <View>
        <SectionHeader
          title="Rekomendasi"
          subtitle="Berdasarkan minat & jurusanmu"
          icon="sparkles"
          onPressAll={() => {}}
        />
      </View>
      <FlatList
        data={FOR_YOU_EVENTS}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.md,
        }}
        renderItem={({ item }) => <ForYouCard item={item} onPress={() => {}} />}
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
