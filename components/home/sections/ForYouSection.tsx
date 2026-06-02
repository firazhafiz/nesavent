import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { spacing } from "@/constants/theme";
import { FOR_YOU_EVENTS } from "../data";
import SectionHeader from "../SectionHeader";
import ForYouCard from "../cards/ForYouCard";

export default function ForYouSection() {
  return (
    <View style={styles.section}>
      <View>
        <SectionHeader
          title="Rekomendasi Untuk Kamu"
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
        renderItem={({ item }) => (
          <ForYouCard item={item} onPress={() => {}} />
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
