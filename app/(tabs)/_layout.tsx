import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // Tinggi tab bar dinamis agar aman menempel di iOS maupun Android
  const barHeight = Platform.OS === "ios" ? 44 + insets.bottom : 70;
  const paddingBottomAmount = Platform.OS === "ios" ? insets.bottom - 8 : 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => (
          <HapticTab
            {...props}
            style={[props.style, styles.customButtonWrapper]}
          />
        ),
        tabBarShowLabel: false, // Bersih minimalis tanpa teks
        tabBarStyle: [
          styles.tabBar,
          {
            height: barHeight,
            paddingBottom: paddingBottomAmount,
          },
        ],
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "home" : "home-outline"}
              isExplore={false}
            />
          ),
        }}
      />

      {/* 2. EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "compass" : "compass-outline"}
              isExplore={true} // Trigger kalibrasi khusus kompas
            />
          ),
        }}
      />

      {/* 3. SEARCH (HIDDEN DARI BAR BAWAH) */}
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />

      {/* 4. TICKET */}
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Ticket",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "ticket" : "ticket-outline"}
              isExplore={false}
            />
          ),
        }}
      />

      {/* 5. PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "person" : "person-outline"}
              isExplore={false}
            />
          ),
        }}
      />
    </Tabs>
  );
}

interface TabIconProps {
  focused: boolean;
  iconName: any;
  isExplore: boolean;
}

function TabIcon({ focused, iconName, isExplore }: TabIconProps) {
  const iconColor = focused ? colors.gold[500] : colors.foreground;

  // KALIBRASI OPTIK UTAMA:
  // Jika ikon adalah explore (kompas), kita up ukurannya ke 26 agar lingkaran kompasnya melar
  // dan seimbang dengan tinggi ikon home/ticket/profile yang dikunci di 24.
  const finalSize = isExplore ? 26 : 22;

  return (
    <View style={styles.iconWrapper}>
      <View style={styles.centerTarget}>
        <Ionicons name={iconName} size={finalSize} color={iconColor} />
      </View>

      {/* Dot penanda aktif warna Gold UNESA asli */}
      {focused && <View style={styles.indicatorDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white", // Base Navy Gelap pekat UNESA

    // Sudut atas melengkung halus ke dalam, bawah merapat rata casing

    // Grid internal
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  customButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: 50,
    height: 50,
  },
  centerTarget: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorDot: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.accent.DEFAULT, // Gold 500 UNESA
  },
});
