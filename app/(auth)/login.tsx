import { colors, fontFamily, radius, spacing } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Disable button if any field is empty
  const isValid = email.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    if (isValid) {
      router.push("/(auth)/complete-profile");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Background Vector */}
      <View style={styles.bgWrapper}>
        <Image
          source={require("@/assets/images/bg-auth.svg")}
          style={styles.bgImage}
          contentFit="cover"
        />
      </View>

      {/* Back Button */}
      <Pressable
        style={[styles.backButton, { top: Math.max(insets.top, spacing.md) }]}
        onPress={() => router.back()}
      >
        <MaterialIcons
          name="chevron-left"
          size={28}
          color={colors.primary.DEFAULT}
        />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      {/* Main Card */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View
          style={[
            styles.card,
            {
              paddingBottom: Math.max(
                insets.bottom + spacing.xl,
                spacing["3xl"],
              ),
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Ready to explore campus events?{"\n"}Login to continue.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={22}
                  color="#999"
                />
              </Pressable>
            </View>

            <Pressable
              onPress={handleLogin}
              style={styles.loginBtnWrapper}
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
                style={styles.loginBtn}
              >
                <Text
                  style={[
                    styles.loginBtnText,
                    !isValid && styles.loginBtnTextDisabled,
                  ]}
                >
                  Login Now
                </Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable style={styles.googleBtn} onPress={handleLogin}>
            <Image
              source={require("@/assets/icons/google.svg")}
              style={styles.googleIcon}
              contentFit="contain"
            />
            <Text style={styles.googleBtnText}>Continue with Google</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Light neutral bg behind image
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
  backButton: {
    position: "absolute",
    left: spacing.md,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.xs,
  },
  backText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.primary.DEFAULT,
    marginLeft: -4,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing["4xl"],
    marginTop: height * 0.25,
    minHeight: height * 0.7,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing["3xl"],
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.primary.DEFAULT,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
    position: "relative",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radius.md,
    height: 60,
    paddingHorizontal: spacing.xl,
    paddingRight: 50,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.primary.DEFAULT,
  },
  eyeIcon: {
    position: "absolute",
    right: spacing.lg,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  loginBtnWrapper: {
    marginTop: spacing.sm,
  },
  loginBtn: {
    height: 60,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    color: "#FFFFFF",
  },
  loginBtnTextDisabled: {
    color: "#9CA3AF",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#999",
    paddingHorizontal: spacing.lg,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radius.full,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: spacing.md,
  },
  googleBtnText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.primary.DEFAULT,
  },
});
