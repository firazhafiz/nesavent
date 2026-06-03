import { fontFamily, spacing } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../utils/constants";

export default function SloganBanner() {
  return (
    <View style={{ marginBottom: spacing["2xl"] }}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
        }}
        style={{
          width: SCREEN_WIDTH,
          minHeight: 60,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: spacing["2xl"],
          paddingHorizontal: spacing.lg,
        }}
      >
        <LinearGradient
          colors={["rgba(26,22,64,0.7)", "rgba(26,22,64,0.9)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <Text
          style={{
            fontFamily: fontFamily.bold,
            fontSize: 13,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          Jelajahi Kehidupan Kampusmu Dengan Nesavent!
        </Text>
      </ImageBackground>
    </View>
  );
}
