import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionHeader from "../atom/SectionHeader";
import { ARTICLES } from "../utils/data";

export default function ArticleSection() {
  return (
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
                  <Text style={styles.articleStatText}>{article.views}</Text>
                  <View style={{ width: 12 }} />
                  <Ionicons
                    name="thumbs-up-outline"
                    size={13}
                    color="#A0A0A0"
                  />
                  <Text style={styles.articleStatText}>{article.likes}</Text>
                </View>
                <Text style={styles.articleDate}>{article.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
