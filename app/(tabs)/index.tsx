import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const CARD_HEIGHT = CARD_WIDTH * (5 / 4); // 4:5 aspect ratio
const BANNER_WIDTH = SCREEN_WIDTH * 0.82;

// ─── SEARCH BAR HEIGHT & OVERLAP ─────────────────────────────────
// Search bar tinggi 48, overlap separuh ke atas (24) dan separuh ke bawah (24)
const SEARCH_BAR_H = 48;
const SEARCH_OVERLAP = SEARCH_BAR_H / 2; // 24px overlap tiap sisi

// ─── MOCK DATA ────────────────────────────────────────────────────

const mockUser = {
  name: "Firaz Fulvian Hafiz",
  role: "Mahasiswa",
  faculty: "Teknik",
  avatar: "https://i.pravatar.cc/150?img=8",
  notifCount: 3,
};

const CATEGORIES = [
  { id: "all", label: "Semua", icon: "grid-outline" },
  { id: "seminar", label: "Seminar", icon: "mic-outline" },
  { id: "workshop", label: "Workshop", icon: "construct-outline" },
  { id: "kompetisi", label: "Kompetisi", icon: "trophy-outline" },
  { id: "seni", label: "Seni & Budaya", icon: "musical-notes-outline" },
  { id: "olahraga", label: "Olahraga", icon: "football-outline" },
  { id: "sosial", label: "Sosial", icon: "people-outline" },
  { id: "festival", label: "Festival", icon: "sparkles-outline" },
];

const TRENDING_EVENTS = [
  {
    id: "1",
    title: "National Student Summit 2025",
    organizer: "BEM UNESA",
    category: "Seminar",
    date: "Sabtu, 14 Jun 2025",
    time: "08.00 WIB",
    location: "Gedung Rektorat UNESA",
    price: 0,
    quota: 500,
    remaining: 127,
    image:
      "https://images.unsplash.com/photo-1756367274325-5e3fd0a83652?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Gratis", "Internal"],
    isHot: true,
  },
  {
    id: "2",
    title: "UNESA Design Sprint Challenge",
    organizer: "Himpunan Teknik Informatika",
    category: "Kompetisi",
    date: "Minggu, 22 Jun 2025",
    time: "09.00 WIB",
    location: "Gedung T8 Kampus Ketintang",
    price: 50000,
    quota: 120,
    remaining: 34,
    image:
      "https://images.unsplash.com/photo-1673252412864-db659fd8707a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Terbuka"],
    isHot: true,
  },
  {
    id: "3",
    title: "Pagelaran Wayang Modern — Lakon Arjuna",
    organizer: "UKM Seni Budaya",
    category: "Seni",
    date: "Jumat, 27 Jun 2025",
    time: "19.00 WIB",
    location: "Auditorium UNESA",
    price: 35000,
    quota: 300,
    remaining: 89,
    image:
      "https://images.unsplash.com/photo-1751083384534-e4d49e674712?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Internal"],
    isHot: false,
  },
  {
    id: "4",
    title: "Workshop UI/UX Design System",
    organizer: "Himpunan Teknologi Pendidikan",
    category: "Workshop",
    date: "Sabtu, 5 Jul 2025",
    time: "08.30 WIB",
    location: "Lab Komputer B4",
    price: 75000,
    quota: 50,
    remaining: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1658506729016-b0beeebda208?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Sertifikat"],
    isHot: false,
  },
];

// Buat 100 set duplikat untuk efek infinite loop tanpa batas
const LOOPING_TRENDING = Array.from({ length: 100 })
  .flatMap(() => TRENDING_EVENTS)
  .map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));

const FOR_YOU_EVENTS = [
  {
    id: "5",
    title: "Pelatihan Pemrograman Web Modern",
    organizer: "UKM Coding UNESA",
    category: "Workshop",
    date: "Rabu, 18 Jun 2025",
    time: "13.00 WIB",
    location: "Lab Terpadu FMIPA",
    price: 0,
    quota: 80,
    remaining: 45,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    tags: ["Gratis", "Internal"],
  },
  {
    id: "6",
    title: "Seminar Kewirausahaan Mahasiswa",
    organizer: "LP2M UNESA",
    category: "Seminar",
    date: "Kamis, 19 Jun 2025",
    time: "09.00 WIB",
    location: "Aula Rektorat Lt. 3",
    price: 0,
    quota: 200,
    remaining: 178,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    tags: ["Gratis", "Terbuka"],
  },
];

const UPCOMING_EVENTS = [
  {
    id: "7",
    title: "PKKMB Mahasiswa Baru 2025",
    organizer: "BEM UNESA",
    date: "Senin, 21 Jul 2025",
    time: "07.00 WIB",
    location: "Lapangan Rektorat",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    daysLeft: 33,
  },
  {
    id: "8",
    title: "UNESA Cup Futsal 2025",
    organizer: "BEM Fakultas Teknik",
    date: "Sabtu, 26 Jul 2025",
    time: "08.00 WIB",
    location: "GOR UNESA Kampus Lidah",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    daysLeft: 38,
  },
  {
    id: "9",
    title: "Dies Natalis UNESA ke-61",
    organizer: "Panitia Dies Natalis",
    date: "Selasa, 19 Ags 2025",
    time: "08.00 WIB",
    location: "Kampus UNESA Ketintang",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    daysLeft: 62,
  },
];

const MY_TICKETS = [
  {
    id: "t1",
    eventTitle: "National Student Summit 2025",
    organizer: "BEM UNESA",
    date: "Sabtu, 14 Jun 2025",
    time: "08.00 WIB",
    location: "Gedung Rektorat",
    ticketType: "Reguler",
    ticketCode: "NSS-2025-00142",
    status: "upcoming",
    color: colors.primary.DEFAULT,
  },
  {
    id: "t2",
    eventTitle: "Workshop UI/UX Design System",
    organizer: "Himpunan TP",
    date: "Sabtu, 5 Jul 2025",
    time: "08.30 WIB",
    location: "Lab Komputer B4",
    ticketType: "Early Bird",
    ticketCode: "WRK-2025-00089",
    status: "upcoming",
    color: colors.accent.DEFAULT,
  },
];

const BANNERS = [
  {
    id: "b1",
    title: "Event Bulan Juni",
    subtitle: "20+ event seru menanti kamu",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Lihat Semua",
  },
  {
    id: "b2",
    title: "Daftarkan Organisasimu",
    subtitle: "Buat dan kelola event UNESA",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    cta: "Daftar Sekarang",
  },
  {
    id: "b3",
    title: "Tiket Gratis Tersedia!",
    subtitle: "Seminar Kewirausahaan — 19 Jun",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    cta: "Ambil Tiket",
  },
];

const LOOPING_BANNERS = Array.from({ length: 100 })
  .flatMap(() => BANNERS)
  .map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));

const ARTICLES = [
  {
    id: "1",
    title: "Saksikan Aksi Seru Bob Odenkirk di Film Terbarunya, 'Normal'",
    date: "3 hari lalu",
    views: "432",
    likes: "1",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "2",
    title:
      "Perankan Guru di Film 'Children of Heaven', Dodit Mulyanto Pernah Jadi Peng...",
    date: "4 hari lalu",
    views: "984",
    likes: "3",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "3",
    title: "Yuk Berpetualang di Gunung Klawih Bareng Geng Sekawan Limo!",
    date: "6 hari lalu",
    views: "2K",
    likes: "33",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────

const formatPrice = (price: number) =>
  price === 0 ? "Gratis" : `Rp${price.toLocaleString("id-ID")}`;

// ─── SUB-COMPONENTS ───────────────────────────────────────────────

const SectionHeader = ({
  title,
  subtitle,
  icon,
  onPressAll,
}: {
  title: string;
  subtitle?: string;
  icon?: any;
  onPressAll?: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <View style={{ flex: 1, marginRight: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {icon && (
          <Ionicons name={icon} size={20} color={colors.primary.DEFAULT} />
        )}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {onPressAll && (
      <TouchableOpacity onPress={onPressAll} style={styles.seeAllBtn}>
        <Text style={styles.seeAllText}>Lihat Semua</Text>
        <Ionicons
          name="chevron-forward"
          size={14}
          color={colors.accent.DEFAULT}
        />
      </TouchableOpacity>
    )}
  </View>
);

const TagBadge = ({ label }: { label: string }) => {
  const isFree = label === "Gratis";
  return (
    <View style={[styles.tagBadge, isFree ? styles.tagFree : styles.tagPaid]}>
      <Text
        style={[
          styles.tagText,
          isFree ? styles.tagFreeText : styles.tagPaidText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const TrendingEventCard = ({
  item,
  onPress,
}: {
  item: (typeof TRENDING_EVENTS)[0];
  onPress: () => void;
}) => {
  const isAlmostFull = item.remaining <= 50;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.trendingCard}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.trendingCardImage}
      >
        {item.isHot && (
          <View style={styles.hotBadge}>
            <Ionicons name="flame" size={11} color="#fff" />
            <Text style={styles.hotBadgeText}>HOT</Text>
          </View>
        )}

        <LinearGradient
          colors={["transparent", "rgba(26,22,64,0.6)", "rgba(26,22,64,1)"]}
          style={styles.trendingCardOverlay}
          locations={[0, 0.4, 0.9]}
        >
          <View style={styles.trendingTagRow}>
            {item.tags.map((t) => (
              <TagBadge key={t} label={t} />
            ))}
          </View>
          <Text style={styles.trendingEventTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.trendingOrganizer} numberOfLines={1}>
            {item.organizer}
          </Text>
          <View style={styles.trendingMeta}>
            <View style={styles.trendingMetaItem}>
              <Ionicons
                name="calendar-outline"
                size={12}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.trendingMetaText}>{item.date}</Text>
            </View>
            <View style={styles.trendingMetaItem}>
              <Ionicons
                name="location-outline"
                size={12}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.trendingMetaText} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          </View>
          <View style={styles.trendingFooter}>
            <Text style={styles.trendingPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.quotaContainer}>
              {isAlmostFull && (
                <View style={styles.almostFullBadge}>
                  <Text style={styles.almostFullText}>Hampir Habis!</Text>
                </View>
              )}
              <Text style={styles.quotaText}>{item.remaining} sisa</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ForYouCard = ({
  item,
  onPress,
}: {
  item: (typeof FOR_YOU_EVENTS)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.forYouCard}
    activeOpacity={0.85}
  >
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.forYouImage}
      imageStyle={{
        borderTopLeftRadius: radius["2xl"],
        borderTopRightRadius: radius["2xl"],
      }}
    >
      <LinearGradient
        colors={["transparent", "rgba(26,22,64,0.55)"]}
        style={StyleSheet.absoluteFillObject}
        locations={[0.4, 1]}
      />
      <View style={styles.forYouCategoryBadge}>
        <Text style={styles.forYouCategoryText}>{item.category}</Text>
      </View>
    </ImageBackground>
    <View style={styles.forYouBody}>
      <Text style={styles.forYouTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.forYouOrganizer} numberOfLines={1}>
        {item.organizer}
      </Text>
      <View style={styles.forYouMeta}>
        <View style={styles.forYouMetaItem}>
          <Ionicons
            name="calendar-outline"
            size={12}
            color={colors.muted.foreground}
          />
          <Text style={styles.forYouMetaText} numberOfLines={1}>
            {item.date.includes(",")
              ? item.date.split(",")[1].trim()
              : item.date}
          </Text>
        </View>
        <View style={styles.forYouMetaItem}>
          <Ionicons
            name="time-outline"
            size={12}
            color={colors.muted.foreground}
          />
          <Text style={styles.forYouMetaText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.forYouFooter}>
        <Text
          style={[
            styles.forYouPrice,
            {
              color:
                item.price === 0 ? colors.success.DEFAULT : colors.foreground,
            },
          ]}
        >
          {formatPrice(item.price)}
        </Text>
        <View style={styles.forYouBookmark}>
          <Ionicons
            name="bookmark-outline"
            size={16}
            color={colors.muted.foreground}
          />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const UpcomingEventCardModern = ({
  item,
  onPress,
}: {
  item: (typeof UPCOMING_EVENTS)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.upcomingCardModern}
    activeOpacity={0.9}
  >
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.upcomingCardModernImage}
    >
      <View style={styles.upcomingDaysBadge}>
        <Text style={styles.upcomingDaysBadgeNum}>{item.daysLeft}</Text>
        <Text style={styles.upcomingDaysBadgeLabel}>HARI LAGI</Text>
      </View>
      <LinearGradient
        colors={["transparent", "rgba(26,22,64,0.8)", "rgba(26,22,64,1)"]}
        style={styles.upcomingCardModernOverlay}
        locations={[0, 0.6, 1]}
      >
        <Text style={styles.upcomingCardModernTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.upcomingCardModernMetaRow}>
          <Ionicons name="calendar" size={12} color={colors.accent.light} />
          <Text style={styles.upcomingCardModernMetaText}>{item.date}</Text>
          <View style={styles.upcomingCardModernDot} />
          <Ionicons name="location" size={12} color={colors.accent.light} />
          <Text style={styles.upcomingCardModernMetaText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

const TicketCard = ({
  item,
  onPress,
}: {
  item: (typeof MY_TICKETS)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.ticketCard}
    activeOpacity={0.88}
  >
    <View style={[styles.ticketAccent, { backgroundColor: item.color }]} />
    <View style={styles.ticketBody}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketTypeBadge}>
          <Text style={styles.ticketTypeText}>{item.ticketType}</Text>
        </View>
        <View
          style={[
            styles.ticketStatusBadge,
            { backgroundColor: colors.status.approved.bg },
          ]}
        >
          <View
            style={[
              styles.ticketStatusDot,
              { backgroundColor: colors.status.approved.text },
            ]}
          />
          <Text
            style={[
              styles.ticketStatusText,
              { color: colors.status.approved.text },
            ]}
          >
            Aktif
          </Text>
        </View>
      </View>
      <Text style={styles.ticketTitle} numberOfLines={2}>
        {item.eventTitle}
      </Text>
      <Text style={styles.ticketOrganizer}>{item.organizer}</Text>

      <View style={styles.ticketDivider}>
        <View style={styles.ticketDividerCircleLeft} />
        <View style={styles.ticketDividerLine} />
        <View style={styles.ticketDividerCircleRight} />
      </View>

      <View style={styles.ticketInfoRow}>
        <View style={styles.ticketInfoItem}>
          <Ionicons
            name="calendar-outline"
            size={13}
            color={colors.muted.foreground}
          />
          <Text style={styles.ticketInfoText} numberOfLines={1}>
            {item.date}
          </Text>
        </View>
        <View style={styles.ticketInfoItem}>
          <Ionicons
            name="time-outline"
            size={13}
            color={colors.muted.foreground}
          />
          <Text style={styles.ticketInfoText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.ticketInfoRow}>
        <View style={styles.ticketInfoItem}>
          <Ionicons
            name="location-outline"
            size={13}
            color={colors.muted.foreground}
          />
          <Text style={styles.ticketInfoText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </View>
      <View style={styles.ticketCodeRow}>
        <MaterialCommunityIcons
          name="qrcode"
          size={22}
          color={colors.primary.DEFAULT}
        />
        <Text style={styles.ticketCode}>{item.ticketCode}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const BannerCard = ({
  item,
  onPress,
}: {
  item: (typeof BANNERS)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.bannerCard}
    activeOpacity={0.9}
  >
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.bannerImage}
      imageStyle={{ borderRadius: radius["3xl"] }}
    >
      <LinearGradient
        colors={["rgba(26,22,64,0.3)", "rgba(26,22,64,0.85)"]}
        style={styles.bannerOverlay}
        locations={[0, 1]}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.bannerCTA} onPress={onPress}>
            <Text style={styles.bannerCTAText}>{item.cta}</Text>
            <Ionicons
              name="arrow-forward"
              size={14}
              color={colors.primary.DEFAULT}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

// ─── MAIN SCREEN ──────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBanner, setActiveBanner] = useState(0);
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
    outputRange: [-500, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.stickyHeader,
          {
            opacity: stickyHeaderOpacity,
            transform: [{ translateY: stickyHeaderTranslateY }],
            paddingTop: insets.top + spacing.sm,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.headerTopRow}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarWrapper}>
              <ImageBackground
                source={{ uri: mockUser.avatar }}
                style={styles.avatar}
                imageStyle={{ borderRadius: radius.full }}
              />
              <View
                style={[
                  styles.onlineIndicator,
                  { backgroundColor: colors.success.DEFAULT },
                ]}
              />
            </View>
            <View style={styles.headerGreeting}>
              <View style={styles.headerGreetingRow}>
                <Text style={styles.headerHi}>Halo, </Text>
                <Text style={styles.headerName}>
                  {mockUser.name.split(" ")[0]}! 👋
                </Text>
              </View>
              <Text style={styles.roleText}>{mockUser.role}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            {mockUser.notifCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{mockUser.notifCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>

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
        <Animated.View style={{ opacity: originalHeaderOpacity }}>
          <LinearGradient
            colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
            style={[
              styles.header,
              {
                paddingTop: insets.top + spacing.sm,
                paddingBottom: SEARCH_OVERLAP,
              },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerTopRow}>
              <View style={styles.headerLeft}>
                <View style={styles.avatarWrapper}>
                  <ImageBackground
                    source={{ uri: mockUser.avatar }}
                    style={styles.avatar}
                    imageStyle={{ borderRadius: radius.full }}
                  />
                  <View
                    style={[
                      styles.onlineIndicator,
                      { backgroundColor: colors.success.DEFAULT },
                    ]}
                  />
                </View>
                <View style={styles.headerGreeting}>
                  <View style={styles.headerGreetingRow}>
                    <Text style={styles.headerHi}>Halo, </Text>
                    <Text style={styles.headerName}>
                      {mockUser.name.split(" ")[0]}! 👋
                    </Text>
                  </View>
                  <Text style={styles.roleText}>{mockUser.role}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
                {mockUser.notifCount > 0 && (
                  <View style={styles.notifBadge}>
                    <Text style={styles.notifBadgeText}>
                      {mockUser.notifCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              {[
                { value: "24", label: "Event Aktif", icon: "calendar-outline" },
                { value: "2", label: "Tiket Saya", icon: "ticket-outline" },
                { value: "5", label: "Tersimpan", icon: "bookmark-outline" },
                {
                  value: "8",
                  label: "Diikuti",
                  icon: "checkmark-circle-outline",
                },
              ].map((s) => (
                <TouchableOpacity
                  key={s.label}
                  style={styles.statCard}
                  activeOpacity={0.75}
                >
                  <Text style={styles.statNum}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>

          <View style={styles.searchBarFloat}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.muted.foreground}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari event, organisasi..."
                placeholderTextColor={colors.muted.foreground}
                returnKeyType="search"
              />
              <TouchableOpacity style={styles.searchFilter}>
                <Feather
                  name="sliders"
                  size={16}
                  color={colors.primary.DEFAULT}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={{ height: spacing.lg }} />

        <View style={[styles.section, { paddingTop: spacing.sm }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                style={[
                  styles.categoryChip,
                  activeCategory === cat.id && styles.categoryChipActive,
                ]}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={15}
                  color={
                    activeCategory === cat.id
                      ? colors.primary.DEFAULT
                      : colors.muted.foreground
                  }
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    activeCategory === cat.id && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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

        {MY_TICKETS.length > 0 && (
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
        )}

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
            renderItem={({ item }) => (
              <BannerCard item={item} onPress={() => {}} />
            )}
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
              <UpcomingEventCardModern item={item} onPress={() => {}} />
            )}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Artikel & Berita"
            subtitle="Info kampus terkini"
            icon="newspaper"
            onPressAll={() => {}}
          />
          <View style={{ gap: 0 }}>
            {ARTICLES.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={{ uri: article.image }}
                  style={styles.articleImage}
                  imageStyle={{ borderRadius: radius.md }}
                />
                <View style={styles.articleContent}>
                  <View style={styles.articleHeaderRow}>
                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {article.title}
                    </Text>
                    <View style={styles.newsBadge}>
                      <Text style={styles.newsBadgeText}>News</Text>
                    </View>
                  </View>
                  <View style={styles.articleFooterRow}>
                    <View style={styles.articleStats}>
                      <Ionicons name="eye-outline" size={14} color="#A0A0A0" />
                      <Text style={styles.articleStatText}>
                        {article.views}
                      </Text>
                      <View style={{ width: 12 }} />
                      <Ionicons
                        name="thumbs-up-outline"
                        size={13}
                        color="#A0A0A0"
                      />
                      <Text style={styles.articleStatText}>
                        {article.likes}
                      </Text>
                    </View>
                    <Text style={styles.articleDate}>{article.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section]}>
          <LinearGradient
            colors={[colors.primary.DEFAULT, colors.secondary.DEFAULT]}
            style={styles.exploreCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.exploreContent}>
              <Text style={styles.exploreTitle}>Jelajahi Semua Event</Text>
              <Text style={styles.exploreSubtitle}>
                50+ event aktif tersedia dari berbagai organisasi UNESA
              </Text>
              <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85}>
                <Text style={styles.exploreBtnText}>Mulai Jelajahi</Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.primary.DEFAULT}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.exploreCircle1} />
            <View style={styles.exploreCircle2} />
          </LinearGradient>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: radius["3xl"],
    borderBottomRightRadius: radius["3xl"],
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    flex: 1,
  },
  avatarWrapper: {
    position: "relative",
    width: 46,
    height: 46,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accent.DEFAULT,
    overflow: "hidden",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  headerGreeting: {
    flex: 1,
    gap: 2,
  },
  headerGreetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerHi: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "rgba(255,255,255,0.75)",
  },
  headerName: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#fff",
  },
  roleText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing["2xl"],
    marginTop: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  statNum: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: "#fff",
    lineHeight: 20,
  },
  statLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 9,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
    textAlign: "center",
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent.DEFAULT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 9,
    color: colors.primary.DEFAULT,
  },
  searchBarFloat: {
    marginHorizontal: spacing.lg,
    marginTop: -SEARCH_OVERLAP,
    zIndex: 30,
    ...Platform.select({
      android: { elevation: 10 },
    }),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: SEARCH_BAR_H,
    gap: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.foreground,
  },
  searchFilter: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xs,
  },
  section: {
    marginBottom: spacing["2xl"],
    paddingHorizontal: spacing["xl"],
    paddingVertical: spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.foreground,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.muted.foreground,
    marginTop: 2,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: colors.accent.DEFAULT,
  },
  categoryScroll: {
    paddingRight: spacing.xs,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  categoryChipActive: {
    backgroundColor: colors.accent.DEFAULT,
    borderColor: colors.accent.DEFAULT,
  },
  categoryLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.muted.foreground,
  },
  categoryLabelActive: {
    color: colors.primary.DEFAULT,
    fontFamily: fontFamily.semibold,
  },
  trendingScroll: {
    gap: spacing.md,
  },
  trendingCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radius["2xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
    }),
  },
  trendingCardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  trendingCardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingTop: spacing["3xl"],
    gap: 4,
  },
  hotBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FF4D4D",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    zIndex: 10,
  },
  hotBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#fff",
    letterSpacing: 0.5,
  },
  trendingTagRow: { flexDirection: "row", gap: 5, marginBottom: 2 },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  tagFree: { backgroundColor: "rgba(34,197,94,0.25)" },
  tagPaid: { backgroundColor: "rgba(201,151,60,0.25)" },
  tagText: { fontFamily: fontFamily.semibold, fontSize: 10 },
  tagFreeText: { color: "#6EE7A3" },
  tagPaidText: { color: colors.accent.light },
  trendingEventTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  trendingOrganizer: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  trendingMeta: { gap: 3, marginTop: 4 },
  trendingMetaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  trendingMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    flex: 1,
  },
  trendingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  trendingPrice: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: colors.accent.light,
  },
  quotaContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  almostFullBadge: {
    backgroundColor: "rgba(239,68,68,0.8)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  almostFullText: { fontFamily: fontFamily.bold, fontSize: 9, color: "#fff" },
  quotaText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
  },
  ticketCard: {
    width: SCREEN_WIDTH * 0.78,
    backgroundColor: colors.card,
    borderRadius: radius["2xl"],
    flexDirection: "row",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 3 },
    }),
  },
  ticketAccent: {
    width: 6,
    borderTopLeftRadius: radius["2xl"],
    borderBottomLeftRadius: radius["2xl"],
  },
  ticketBody: {
    flex: 1,
    padding: spacing.md,
    gap: 4,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  ticketTypeBadge: {
    backgroundColor: colors.navy[50],
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ticketTypeText: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    color: colors.primary.DEFAULT,
  },
  ticketStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ticketStatusDot: { width: 6, height: 6, borderRadius: 3 },
  ticketStatusText: { fontFamily: fontFamily.semibold, fontSize: 11 },
  ticketTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 20,
  },
  ticketOrganizer: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.muted.foreground,
  },
  ticketDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.sm,
    marginHorizontal: -spacing.md,
  },
  ticketDividerCircleLeft: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.background,
  },
  ticketDividerLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  ticketDividerCircleRight: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.background,
  },
  ticketInfoRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  ticketInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  ticketInfoText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
    flex: 1,
  },
  ticketCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  ticketCode: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
    letterSpacing: 0.5,
  },

  // ── Banner ──
  bannerCard: {
    width: BANNER_WIDTH,
    height: 150,
    borderRadius: radius["3xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
      },
      android: { elevation: 5 },
    }),
  },
  bannerImage: { flex: 1 },
  bannerOverlay: {
    flex: 1,
    borderRadius: radius["3xl"],
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  bannerContent: { gap: 4 },
  bannerSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  bannerTitle: { fontFamily: fontFamily.bold, fontSize: 18, color: "#fff" },
  bannerCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.accent.DEFAULT,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: 4,
  },
  bannerCTAText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
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

  // ── For You card ──
  forYouCard: {
    width: 200,
    backgroundColor: colors.card,
    borderRadius: radius["2xl"],
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  forYouImage: {
    width: "100%",
    height: 120,
  },
  forYouCategoryBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.secondary.DEFAULT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  forYouCategoryText: {
    fontFamily: fontFamily.semibold,
    fontSize: 10,
    color: "#fff",
  },
  forYouBody: {
    padding: spacing.md,
    gap: 4,
  },
  forYouTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: colors.foreground,
    lineHeight: 18,
  },
  forYouOrganizer: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  forYouMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
    flexWrap: "wrap",
  },
  forYouMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  forYouMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  forYouFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  forYouPrice: { fontFamily: fontFamily.bold, fontSize: 14 },
  forYouBookmark: {
    width: 28,
    height: 28,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Upcoming Events Modern ──
  upcomingCardModern: {
    width: SCREEN_WIDTH * 0.85,
    height: 200,
    borderRadius: radius["2xl"],
    overflow: "hidden",
    marginRight: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  upcomingCardModernImage: {
    width: "100%",
    height: "100%",
  },
  upcomingDaysBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  upcomingDaysBadgeNum: {
    fontFamily: fontFamily.extrabold,
    fontSize: 16,
    color: colors.primary.DEFAULT,
    lineHeight: 18,
  },
  upcomingDaysBadgeLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 8,
    color: colors.primary.DEFAULT,
    letterSpacing: 0.5,
  },
  upcomingCardModernOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingTop: spacing["2xl"],
    gap: 6,
  },
  upcomingCardModernTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: "#fff",
    letterSpacing: -0.5,
  },
  upcomingCardModernMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  upcomingCardModernMetaText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  upcomingCardModernDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },

  // ── Explore CTA ──
  exploreCard: {
    borderRadius: radius["3xl"],
    padding: spacing.xl,
    overflow: "hidden",
    position: "relative",
    minHeight: 140,
  },
  exploreContent: {
    gap: 6,
    maxWidth: "70%",
    zIndex: 2,
  },
  exploreTitle: {
    fontFamily: fontFamily.extrabold,
    fontSize: 20,
    color: "#fff",
    letterSpacing: -0.5,
  },
  exploreSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 18,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.accent.DEFAULT,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.full,
    marginTop: spacing.sm,
  },
  exploreBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.primary.DEFAULT,
  },
  exploreCircle1: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.06)",
    right: -20,
    top: -30,
  },
  exploreCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
    right: 50,
    bottom: -60,
  },

  // ── Articles ──
  articleCard: {
    flexDirection: "row",
    paddingVertical: spacing.md,
    gap: spacing.md,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
  },
  articleContent: {
    flex: 1,
    justifyContent: "space-between",
    height: 80,
  },
  articleHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  articleTitle: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#2C2C2C",
    lineHeight: 20,
  },
  newsBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newsBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.muted.foreground,
  },
  articleFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  articleStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  articleStatText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: "#A0A0A0",
  },
  articleDate: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: "#A0A0A0",
  },
});
