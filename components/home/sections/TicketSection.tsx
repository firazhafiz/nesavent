import { spacing } from "@/constants/theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SectionHeader from "../atom/SectionHeader";
import TicketCard from "../cards/TicketCard";
import { MY_TICKETS } from "../utils/data";

export default function TicketSection() {
  if (MY_TICKETS.length === 0) return null;

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Tiket Saya"
        subtitle="Tiket aktif yang dimiliki"
        icon="ticket"
        onPressAll={() => {}}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.md }}
      >
        {MY_TICKETS.map((ticket) => (
          <TicketCard key={ticket.id} item={ticket} onPress={() => {}} />
        ))}
      </ScrollView>
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
