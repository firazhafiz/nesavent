import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { formatPrice } from "../../components/home/utils/helpers";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── MOCK DATA ────────────────────────────────────────────────────

const CATEGORIES = [
  "Semua",
  "Seminar",
  "Workshop",
  "Kompetisi",
  "Seni & Budaya",
  "Olahraga",
  "Sosial",
  "Orientasi",
  "Festival",
];

const ORGANIZERS = [
  {
    id: "1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/UNIVERSITAS_GADJAH_MADA%2C_YOGYAKARTA.png",
  },
  {
    id: "2",
    image:
      "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png",
  },
  {
    id: "3",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Logo-Branding-UNAIR-biru.png",
  },
  {
    id: "4",
    image: "https://upload.wikimedia.org/wikipedia/id/c/c4/Badge_ITS.png",
  },
  {
    id: "5",
    image:
      "https://upload.wikimedia.org/wikipedia/id/7/73/Lambang_Universitas_Negeri_Malang.jpg",
  },
  {
    id: "6",
    image:
      "https://akupintar.id/documents/20143/0/UNEJ.png/1206a4de-ec72-fb7e-1a5f-41a1759faa7a?version=1.0",
  },
  {
    id: "7",
    image: "https://www.uii.ac.id/wp-content/uploads/2017/04/Logo-UII-Asli.png",
  },
  {
    id: "8",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Logo_udinus1.jpg",
  },
];

const ALL_EVENTS = [
  {
    id: "1",
    title: "National Student Summit 2025",
    organizer: "BEM UNESA",
    category: "Seminar",
    date: "Sabtu, 14 Jun 2025",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    tags: ["Internal"],
  },
  {
    id: "2",
    title: "UNESA Design Sprint Challenge",
    organizer: "HIMTI",
    category: "Kompetisi",
    date: "Minggu, 22 Jun 2025",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    tags: ["Terbuka"],
  },
  {
    id: "3",
    title: "Pagelaran Wayang Modern",
    organizer: "UKM Seni Budaya",
    category: "Seni",
    date: "Jumat, 27 Jun 2025",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1751083384534-e4d49e674712?q=80&w=600",
    tags: ["Internal"],
  },
  {
    id: "4",
    title: "Workshop UI/UX Design System",
    organizer: "HIMTI",
    category: "Workshop",
    date: "Sabtu, 5 Jul 2025",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
    tags: ["Terbuka"],
  },
  {
    id: "5",
    title: "Turnamen Futsal Rektor Cup",
    organizer: "BEM UNESA",
    category: "Olahraga",
    date: "Senin, 15 Ags 2025",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    tags: ["Internal"],
  },
  {
    id: "6",
    title: "Pelatihan K3 Laboratorium",
    organizer: "Fakultas Teknik",
    category: "Workshop",
    date: "Kamis, 10 Sep 2025",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
    tags: ["Internal"],
  },
  {
    id: "7",
    title: "Festival Musik Akustik",
    organizer: "UKM Musik",
    category: "Festival",
    date: "Sabtu, 25 Sep 2025",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    tags: ["Terbuka"],
  },
  {
    id: "8",
    title: "Sosialisasi PKM 2025",
    organizer: "LP2M",
    category: "Seminar",
    date: "Selasa, 5 Okt 2025",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    tags: ["Internal"],
  },
];

// ─── MAIN SCREEN ──────────────────────────────────────────────────
export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  // States Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeAccess, setActiveAccess] = useState("Semua");
  const [activeFormat, setActiveFormat] = useState("Semua");
  const [activeCertificate, setActiveCertificate] = useState("Semua");
  const [activePrice, setActivePrice] = useState("Semua");
  const [activeTime, setActiveTime] = useState("Kapanpun");

  // Pagination States
  const ITEMS_PER_PAGE = 5;
  const [data, setData] = useState(ALL_EVENTS.slice(0, ITEMS_PER_PAGE));
  const [page, setPage] = useState(1);

  // Bottom Sheet Ref & Toggle Logic
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    setIsFilterOpen(index >= 0);
  }, []);

  const handleToggleFilter = useCallback(() => {
    if (isFilterOpen) {
      bottomSheetRef.current?.dismiss();
    } else {
      bottomSheetRef.current?.present();
    }
  }, [isFilterOpen]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextData = ALL_EVENTS.slice(0, nextPage * ITEMS_PER_PAGE);
    setData(nextData);
    setPage(nextPage);
  };

  const handleResetFilter = () => {
    setActiveCategory("Semua");
    setActiveAccess("Semua");
    setActiveFormat("Semua");
    setActiveCertificate("Semua");
    setActivePrice("Semua");
    setActiveTime("Kapanpun");
  };

  // ─── RENDER HEADER (Highlight & Organizer) ───
  const renderHeader = () => (
    <View style={styles.bodyContent}>
      {/* 1. SOROTAN SPESIAL */}
      <View style={styles.section}>
        {/* NEW: Wrapper dengan Icon */}
        <View style={styles.sectionTitleWrapper}>
          <Ionicons name="sparkles" size={20} color={colors.primary.DEFAULT} />
          <Text style={styles.sectionTitle}>Sorotan Spesial</Text>
        </View>
        <TouchableOpacity style={styles.highlightCard} activeOpacity={0.9}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
            }}
            style={styles.highlightImage}
            imageStyle={{ borderRadius: radius["2xl"] }}
          >
            <LinearGradient
              colors={["transparent", "rgba(26,22,64,0.9)"]}
              style={styles.highlightOverlay}
              locations={[0.2, 1]}
            >
              <View style={styles.highlightBadge}>
                <Ionicons name="star" size={12} color="#fff" />
                <Text style={styles.highlightBadgeText}>Eksklusif</Text>
              </View>
              <Text style={styles.highlightTitle}>
                Pesta Rakyat Dies Natalis UNESA Ke-62
              </Text>
              <Text style={styles.highlightSubtitle}>
                Penampilan spesial guest star nasional!
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* 2. ORGANISASI */}
      <View style={styles.sectionNoHorizontal}>
        <View style={styles.sectionHeaderPadding}>
          {/* NEW: Wrapper dengan Icon (Tanpa margin bawah agar sejajar dgn Lihat Semua) */}
          <View style={styles.sectionTitleWrapperNoMargin}>
            <Ionicons name="library" size={20} color={colors.primary.DEFAULT} />
            <Text style={styles.sectionOrg}>Organizer Aktif</Text>
          </View>
          <Pressable style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={colors.accent.DEFAULT}
            />
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ORGANIZERS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.organizerScroll}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.organizerItem} activeOpacity={0.8}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.organizerImage}
                imageStyle={{ borderRadius: radius.full }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Title Event */}
      <View
        style={[styles.sectionTitleWrapper, { paddingHorizontal: spacing.lg }]}
      >
        <Ionicons name="ticket" size={22} color={colors.primary.DEFAULT} />
        <Text style={styles.sectionExplore}>Jelajahi Semua Event</Text>
      </View>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* ══════════════════════════════════════════════════════════════
            STICKY HEADER & SEARCH BAR 
        ══════════════════════════════════════════════════════════════ */}
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.muted.foreground}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari nama event, UKM, atau topik..."
              placeholderTextColor={colors.muted.foreground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.muted.foreground}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={handleToggleFilter}
              >
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={
                    isFilterOpen
                      ? colors.accent.DEFAULT
                      : colors.primary.DEFAULT
                  }
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════════════
            FLATLIST FEED UTAMA
        ══════════════════════════════════════════════════════════════ */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
          renderItem={({ item }) => (
            <View style={styles.eventListWrapper}>
              <TouchableOpacity style={styles.eventRowCard} activeOpacity={0.8}>
                {/* Gambar Thumbnail */}
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.eventRowImage}
                  imageStyle={{ borderRadius: radius.xl }}
                >
                  <View style={styles.eventRowCategory}>
                    <Text style={styles.eventRowCategoryText}>
                      {item.tags[0]}
                    </Text>
                  </View>
                </ImageBackground>

                {/* Detail Teks */}
                <View style={styles.eventRowInfo}>
                  <View>
                    <Text style={styles.eventRowTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.eventRowOrganizer} numberOfLines={1}>
                      {item.organizer}
                    </Text>
                  </View>

                  <View style={styles.eventRowBottom}>
                    <View style={styles.eventRowPriceContainer}>
                      <View style={styles.eventRowMeta}>
                        <Ionicons
                          name="calendar-outline"
                          size={12}
                          color={colors.muted.foreground}
                        />
                        <Text style={styles.eventRowMetaText}>{item.date}</Text>
                      </View>
                      <Text
                        style={[
                          styles.eventRowPrice,
                          {
                            color:
                              item.price === 0
                                ? colors.success.DEFAULT
                                : colors.gold[400],
                          },
                        ]}
                      >
                        {formatPrice(item.price)}
                      </Text>
                    </View>
                    <View style={styles.eventRowCategoryBottom}>
                      <Text style={styles.eventRowCategoryTextBottom}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={
            data.length < ALL_EVENTS.length ? (
              <TouchableOpacity
                style={styles.loadMoreBtn}
                onPress={loadMore}
                activeOpacity={0.8}
              >
                <Text style={styles.loadMoreText}>Tampilkan Lebih Banyak</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ height: spacing["2xl"] }} />
            )
          }
        />
      </View>

      {/* ══════════════════════════════════════════════════════════════
          COMPLEX FILTER BOTTOM SHEET
      ══════════════════════════════════════════════════════════════ */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        onChange={handleSheetChanges}
        enableOverDrag={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
        backgroundStyle={{ borderRadius: 0, backgroundColor: "#fff" }}
        handleStyle={{
          borderRadius: 0,
          paddingTop: insets.top + spacing.sm,
          paddingBottom: spacing.sm,
          backgroundColor: "#fff",
        }}
        handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={[
            styles.sheetContent,
            { paddingBottom: insets.bottom + spacing.lg },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row: Title & Reset Button */}
          <View style={styles.sheetHeaderRow}>
            <Text style={styles.sheetTitle}>Filter & Urutkan</Text>
            <TouchableOpacity onPress={handleResetFilter} activeOpacity={0.7}>
              <Text style={styles.resetTextRight}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Section 1: Kategori Utama */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="grid-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Kategori Event</Text>
          </View>
          <View style={styles.filterChipRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterChip,
                  activeCategory === cat && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === cat && styles.filterChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section 2: Akses Peserta */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="people-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Akses Peserta</Text>
          </View>
          <View style={styles.filterChipRow}>
            {["Semua", "Internal UNESA", "Terbuka Umum"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  activeAccess === type && styles.filterChipActive,
                ]}
                onPress={() => setActiveAccess(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeAccess === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section 3: Format Event */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="laptop-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Format Event</Text>
          </View>
          <View style={styles.filterChipRow}>
            {["Semua", "Offline", "Online", "Hybrid"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  activeFormat === type && styles.filterChipActive,
                ]}
                onPress={() => setActiveFormat(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFormat === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section 4: Sertifikat */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="ribbon-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Sertifikat</Text>
          </View>
          <View style={styles.filterChipRow}>
            {[
              "Semua",
              "E-Certificate",
              "Sertifikat Cetak",
              "Tanpa Sertifikat",
            ].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  activeCertificate === type && styles.filterChipActive,
                ]}
                onPress={() => setActiveCertificate(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCertificate === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section 5: Biaya Pendaftaran */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Biaya Pendaftaran</Text>
          </View>
          <View style={styles.filterChipRow}>
            {["Semua", "Gratis Saja", "Berbayar"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  activePrice === type && styles.filterChipActive,
                ]}
                onPress={() => setActivePrice(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activePrice === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section 6: Waktu Pelaksanaan */}
          <View style={styles.filterSectionHeader}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.primary.DEFAULT}
            />
            <Text style={styles.filterSectionLabel}>Waktu Pelaksanaan</Text>
          </View>
          <View style={styles.filterChipRow}>
            {["Kapanpun", "Hari Ini", "Minggu Ini", "Bulan Ini"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  activeTime === type && styles.filterChipActive,
                ]}
                onPress={() => setActiveTime(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeTime === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sheetFooterSpacer} />
          <TouchableOpacity
            style={styles.applyFilterBtnFull}
            activeOpacity={0.9}
            onPress={() => bottomSheetRef.current?.dismiss()}
          >
            <Text style={styles.applyFilterText}>Terapkan Filter</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── HEADER & SEARCH ──
  headerContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 52,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.foreground,
  },
  filterBtn: { padding: spacing.xs },

  // ── GENERAL & TITLES ──
  bodyContent: { paddingTop: spacing.md },
  section: { marginBottom: spacing["3xl"], paddingHorizontal: spacing.lg },
  sectionNoHorizontal: { marginBottom: spacing["3xl"] },
  sectionHeaderPadding: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  // WRAPPERS untuk Title Utama & Icon
  sectionTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.md,
  },
  sectionTitleWrapperNoMargin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.foreground,
  },
  sectionOrg: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.foreground,
  },
  sectionExplore: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.foreground,
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

  // ── 1. SOROTAN SPESIAL ──
  highlightCard: {
    width: "100%",
    height: 160,
    borderRadius: radius["2xl"],
    overflow: "hidden",
  },
  highlightImage: {
    width: "100%",
    height: "100%",
  },
  highlightOverlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "flex-end",
  },
  highlightBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.accent.DEFAULT,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginBottom: 8,
  },
  highlightBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#fff",
    textTransform: "uppercase",
  },
  highlightTitle: {
    fontFamily: fontFamily.extrabold,
    fontSize: 18,
    color: "#fff",
    lineHeight: 24,
  },
  highlightSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },

  // ── 2. ORGANISASI ──
  organizerScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  organizerItem: {
    alignItems: "center",
    width: 72,
    gap: 6,
  },
  organizerImage: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  // ── 3. EVENT FEED VERTIKAL ──
  eventListWrapper: { paddingHorizontal: spacing.lg },
  eventRowCard: {
    flexDirection: "row",
    borderRadius: radius["2xl"],
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  eventRowImage: {
    width: 100,
    height: 100,
  },
  eventRowCategory: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgba(26,22,64,0.75)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  eventRowCategoryText: {
    fontFamily: fontFamily.semibold,
    fontSize: 8,
    color: "#fff",
  },
  eventRowInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  eventRowTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 20,
    marginBottom: 2,
  },
  eventRowOrganizer: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  eventRowBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  eventRowPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },
  eventRowMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eventRowMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.muted.foreground,
  },
  eventRowPrice: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  eventRowCategoryBottom: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  eventRowCategoryTextBottom: {
    fontFamily: fontFamily.semibold,
    fontSize: 9,
    color: colors.navy[500],
  },

  // ── LOAD MORE BUTTON ──
  loadMoreBtn: {
    marginVertical: spacing.lg,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radius.full,
    borderColor: colors.navy[400],
    borderWidth: 1,
  },
  loadMoreText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.primary.DEFAULT,
  },

  // ── FILTER BOTTOM SHEET ──
  sheetContent: {
    paddingHorizontal: spacing.lg,
    flexGrow: 1,
  },
  sheetHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  sheetTitle: {
    fontFamily: fontFamily.extrabold,
    fontSize: 22,
    color: colors.primary.light,
  },
  resetTextRight: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primary.light || "#342B8D",
  },
  filterSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  filterSectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.primary.DEFAULT || "#1A1740",
  },
  filterChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: "#F4F4F5",
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterChipActive: {
    backgroundColor: colors.navy[50],
    borderColor: colors.primary.DEFAULT,
  },
  filterChipText: {
    fontFamily: fontFamily.light,
    fontSize: 13,
    color: "#71717A",
  },
  filterChipTextActive: {
    color: colors.primary.DEFAULT || "#1A1740",
    fontFamily: fontFamily.bold,
  },
  sheetFooterSpacer: {
    flex: 1,
    minHeight: spacing["3xl"],
  },
  applyFilterBtnFull: {
    width: "100%",
    backgroundColor: colors.accent.DEFAULT,
    borderRadius: radius.full,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  applyFilterText: {
    color: "#fff",
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
});
