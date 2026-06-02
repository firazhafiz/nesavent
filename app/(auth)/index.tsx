import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    tag: "Smart & Practical",
    icon: "auto-awesome",
    title: "Discover Events\nEasily",
    description:
      "Explore various exciting events on campus without having to look for posters.",
    image: require("@/assets/images/vector1.svg"),
    headerColor: "#FDE8EC", // Soft Pink
  },
  {
    id: "2",
    tag: "Instant Booking",
    icon: "confirmation-number",
    title: "Get Tickets\nin Seconds",
    description:
      "Get digital tickets instantly. Just scan upon arrival, no need to wait in line.",
    image: require("@/assets/images/vector2.svg"),
    headerColor: "#E8F1F8", // Soft Blue
  },
  {
    id: "3",
    tag: "Easy Management",
    icon: "dashboard-customize",
    title: "Manage Events\nProfessionally",
    description:
      "Help your organization committee manage registrations and participant check-ins efficiently.",
    image: require("@/assets/images/vector3.svg"),
    headerColor: "#EDEBF7", // Soft Purple
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/(auth)/login");
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/login");
  };

  const slide = SLIDES[currentIndex];

  // Animate the inner pill button width (from 55% to 70% to 100%)
  const pillAnimatedStyle = useAnimatedStyle(() => {
    const w = currentIndex === 0 ? "40%" : currentIndex === 1 ? "70%" : "100%";

    return {
      // Geser mulus selama 300 milidetik tanpa efek membal
      width: withTiming(w, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      }),
    };
  });

  return (
    <View style={styles.container}>
      {/* Background with Transitioning Header Colors */}
      {SLIDES.map((item, index) => {
        if (index !== currentIndex) return null;
        return (
          <Animated.View
            key={`bg-${item.id}`}
            entering={FadeIn.duration(600)}
            exiting={FadeOut.duration(600)}
            style={StyleSheet.absoluteFillObject}
          >
            <LinearGradient
              colors={[item.headerColor, "#FFFFFF", "#FFFFFF"]}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
            />
          </Animated.View>
        );
      })}

      <View
        style={[
          styles.innerContainer,
          { paddingTop: Math.max(insets.top, spacing.xl) },
        ]}
      >
        {/* Vector Image Area */}
        <View style={styles.imageContainer}>
          {SLIDES.map((item, index) => {
            if (index !== currentIndex) return null;
            return (
              <Animated.View
                key={`img-${item.id}`}
                entering={FadeIn.duration(600)}
                exiting={FadeOut.duration(600)}
                style={styles.imageWrapper}
              >
                <Image
                  source={item.image}
                  style={styles.image}
                  contentFit="contain"
                />
              </Animated.View>
            );
          })}
        </View>

        {/* Content Area */}
        <View
          style={[
            styles.contentContainer,
            {
              paddingBottom: Math.max(
                insets.bottom + spacing.md,
                spacing["2xl"],
              ),
            },
          ]}
        >
          <Animated.View
            key={`content-${slide.id}`}
            entering={FadeIn.duration(500)}
            style={styles.textContainer}
          >
            {/* Tag Badge */}
            <View style={styles.tagBadge}>
              <MaterialIcons
                name={slide.icon as any}
                size={16}
                color={colors.accent.DEFAULT}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{slide.tag}</Text>
            </View>

            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </Animated.View>

          {/* CTA Area */}
          <View style={styles.ctaContainer}>
            <Pressable onPress={handleNext} style={styles.nextButtonWrapper}>
              <LinearGradient
                colors={[colors.navy[50], colors.gold[50]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextTrack}
              >
                <Animated.View style={[styles.nextPill, pillAnimatedStyle]}>
                  <Text style={styles.nextText}>
                    {currentIndex === SLIDES.length - 1
                      ? "Get Started"
                      : "Next"}
                  </Text>
                </Animated.View>

                {currentIndex < SLIDES.length - 1 && (
                  <View style={styles.arrowsRow}>
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color={colors.primary.light}
                      style={{ opacity: 0.2, marginRight: -12 }}
                    />
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color={colors.primary.light}
                      style={{ opacity: 0.5, marginRight: -12 }}
                    />
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color={colors.primary.light}
                    />
                  </View>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: spacing["4xl"],
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.primary.DEFAULT,
    textAlign: "center",
    marginBottom: spacing.md,
    lineHeight: 36,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  ctaContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: spacing.md,
  },
  nextButtonWrapper: {
    width: "100%",
    maxWidth: 280,
  },
  nextTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 60,
    height: 64,
  },
  nextPill: {
    backgroundColor: colors.primary.DEFAULT,
    height: "100%",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontFamily: fontFamily.semibold,
    color: "#FFF",
    fontSize: 16,
  },
  arrowsRow: {
    flexDirection: "row",
    paddingRight: 24,
    position: "absolute",
    right: 0,
  },
});
