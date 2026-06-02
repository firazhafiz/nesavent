import { colors, spacing } from "@/constants/theme";
import React, { useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import Sections
import ArticleSection from "@/components/home/sections/ArticleSection";
import BannerSection from "@/components/home/sections/BannerSection";
import CategoryFilter from "@/components/home/sections/CategoryFilter";
import ExploreSection from "@/components/home/sections/ExploreSection";
import ForYouSection from "@/components/home/sections/ForYouSection";
import HeaderSection from "@/components/home/sections/HeaderSection";
import SloganBanner from "@/components/home/sections/SloganBanner";
import StickyHeader from "@/components/home/sections/StickyHeader";
import TicketSection from "@/components/home/sections/TicketSection";
import TrendingSection from "@/components/home/sections/TrendingSection";
import UpcomingSection from "@/components/home/sections/UpcomingSection";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [180, 360],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const originalHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const stickyHeaderTranslateY = scrollY.interpolate({
    inputRange: [180, 360],
    outputRange: [-50, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <StickyHeader
        stickyHeaderOpacity={stickyHeaderOpacity}
        stickyHeaderTranslateY={stickyHeaderTranslateY}
        insets={insets}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.DEFAULT}
            colors={[colors.primary.DEFAULT]}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <HeaderSection
          originalHeaderOpacity={originalHeaderOpacity}
          insets={insets}
        />

        <View style={{ height: spacing.lg }} />

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <TrendingSection />
        <TicketSection />
        <BannerSection />
        <ForYouSection />
        <SloganBanner />
        <UpcomingSection />
        <ArticleSection />
        <ExploreSection />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xs,
  },
});
