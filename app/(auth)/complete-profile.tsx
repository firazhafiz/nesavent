import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const STATUS_OPTIONS = ["Student", "Lecturer", "Staff"];
const FACULTY_OPTIONS = [
  "Faculty of Education (FIP)",
  "Faculty of Languages and Arts (FBS)",
  "Faculty of Mathematics and Natural Sciences (FMIPA)",
  "Faculty of Social Sciences and Law (FISH)",
  "Faculty of Engineering (FT)",
  "Faculty of Sports and Health Sciences (FIKK)",
  "Faculty of Economics and Business (FEB)",
  "Faculty of Medicine (FK)",
  "Vocational",
  "Postgraduate",
];

export default function CompleteProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState("");
  const [nim, setNim] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [faculty, setFaculty] = useState("");

  // Refs & Variables for Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const isValid =
    fullName.trim() !== "" &&
    nim.trim() !== "" &&
    phone.trim() !== "" &&
    status !== "" &&
    faculty !== "";

  const handleSave = () => {
    if (isValid) {
      router.replace("/(tabs)");
    }
  };

  // Callbacks for Bottom Sheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    [],
  );

  const renderStatusChips = () => (
    <View style={styles.chipsContainer}>
      {STATUS_OPTIONS.map((opt) => {
        const isSelected = status === opt;
        return (
          <Pressable
            key={opt}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => setStatus(opt)}
          >
            <Text
              style={[styles.chipText, isSelected && styles.chipTextSelected]}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/* Background overlapping top */}
        <View style={styles.bgWrapper}>
          <Image
            source={require("@/assets/images/bg-auth.svg")}
            style={styles.bgImage}
            contentFit="cover"
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          {/* Main Card (Fixed) */}
          <View style={[styles.card, { marginTop: height * 0.15, flex: 1 }]}>
            {/* ScrollView inside the card */}
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                {
                  paddingBottom: Math.max(
                    insets.bottom + spacing.xl,
                    spacing["3xl"],
                  ),
                },
              ]}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Complete Profile</Text>
                <Text style={styles.subtitle}>
                  One more step to get started. Please complete your personal
                  information below.
                </Text>
              </View>

              <View style={styles.form}>
                {/* Full Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                {/* NIM / NIP */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ID Number (NIM/NIP) *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your NIM or NIP"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={nim}
                    onChangeText={setNim}
                  />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number (WhatsApp) *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 08123456789"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                {/* Status (Civitas) */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Academic Status *</Text>
                  {renderStatusChips()}
                </View>

                {/* Faculty Dropdown Trigger */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Faculty *</Text>
                  <Pressable
                    style={styles.dropdownTrigger}
                    onPress={handlePresentModalPress}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        !faculty && { color: "#999" },
                      ]}
                    >
                      {faculty || "Select Faculty"}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={24}
                      color="#999"
                    />
                  </Pressable>
                </View>

                <Pressable
                  onPress={handleSave}
                  style={styles.submitBtnWrapper}
                  disabled={!isValid}
                >
                  <LinearGradient
                    colors={
                      isValid
                        ? [colors.navy[700], colors.navy[600]]
                        : ["#E5E7EB", "#E5E7EB"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.submitBtn}
                  >
                    <Text
                      style={[
                        styles.submitBtnText,
                        !isValid && styles.submitBtnTextDisabled,
                      ]}
                    >
                      Save Profile
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        {/* Gorhom Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.sheetIndicator}
        >
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Select Faculty</Text>
            <Pressable onPress={handleCloseModalPress} style={styles.closeBtn}>
              <MaterialIcons
                name="close"
                size={24}
                color={colors.primary.DEFAULT}
              />
            </Pressable>
          </View>

          <BottomSheetFlatList
            data={FACULTY_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.facultyOption,
                  faculty === item && styles.facultyOptionSelected,
                ]}
                onPress={() => {
                  setFaculty(item);
                  handleCloseModalPress();
                }}
              >
                <Text
                  style={[
                    styles.facultyOptionText,
                    faculty === item && styles.facultyOptionTextSelected,
                  ]}
                >
                  {item}
                </Text>
                {faculty === item && (
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                )}
              </Pressable>
            )}
            contentContainerStyle={[
              styles.facultyList,
              { paddingBottom: Math.max(insets.bottom, spacing.lg) },
            ]}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  bgWrapper: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.45,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing["3xl"],
    shadowColor: colors.primary.DEFAULT,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: spacing["2xl"],
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.primary.DEFAULT,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: colors.primary.DEFAULT,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radius.md, // <--- Diubah ke md (sebelumnya full)
    height: 56,
    paddingHorizontal: spacing.lg,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.primary.DEFAULT,
  },
  dropdownTrigger: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radius.md, // <--- Diubah ke md (sebelumnya full)
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.primary.DEFAULT,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.full, // Chip biasanya tetap full-rounded agar terlihat seperti pil, tapi kalau mau disamain md, bisa diganti ke radius.md
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: colors.gold[50],
    borderColor: colors.accent.DEFAULT,
  },
  chipText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "#6B7280",
  },
  chipTextSelected: {
    color: colors.primary.DEFAULT,
    fontFamily: fontFamily.bold,
  },
  submitBtnWrapper: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  submitBtn: {
    height: 60,
    borderRadius: radius.full, // Button tetap pakai radius.full sesuai request "selain button"
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    fontFamily: fontFamily.semibold, // <--- Diubah ke semibold (sebelumnya bold)
    fontSize: 16,
    color: "#FFFFFF",
  },
  submitBtnTextDisabled: {
    color: "#9CA3AF",
  },

  // Gorhom Bottom Sheet Specific Styles
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetIndicator: {
    backgroundColor: "#E5E7EB",
    width: 40,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  bottomSheetTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.primary.DEFAULT,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  facultyList: {
    padding: spacing.lg,
  },
  facultyOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    marginBottom: spacing.xs,
  },
  facultyOptionSelected: {
    backgroundColor: colors.navy[50],
  },
  facultyOptionText: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: "#4B5563",
  },
  facultyOptionTextSelected: {
    fontFamily: fontFamily.bold,
    color: colors.primary.DEFAULT,
  },
});
