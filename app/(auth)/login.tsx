import { useWizard } from "@/hooks/useWizard";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { checkStatus } = useWizard();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    try {
      await login(email, password);

      const status = await checkStatus();

      if (status.needsWizard) {
        router.replace("/wizard");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "An error occurred");
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert("Coming Soon", "Google Sign-In will be available soon!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header con X */}
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <TouchableOpacity onPress={() => router.replace("/welcome")} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {/* Logo o mensaje de bienvenida */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Sign In</Text>
              <Text style={styles.welcomeSubtitle}>Continue your learning</Text>
            </View>

            {/* Google Button moderno */}
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <View style={styles.socialButtonContent}>
                <FontAwesome5
                  name="google"
                  size={24}
                  // Sin color prop - muestra colores automáticos
                />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Divider más elegante */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or with email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Formulario */}
            <View style={styles.inputsContainer}>
              <Input
                label="Email"
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                containerStyle={styles.input}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                secureTextEntry
                autoComplete="password"
                containerStyle={styles.input}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => Alert.alert("Coming Soon", "Password reset feature coming soon!")}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="Sign In"
              onPress={handleEmailLogin}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              style={styles.loginButton}
            />

            {/* Sign Up Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup-options")}>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    minHeight: "100%", // Para centrar verticalmente
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 40,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 40, // Para mantener simetría
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
    flex: 1, // Para centrar realmente
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 8,
  },
  input: {
    // Si tu componente Input acepta containerStyle
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 40,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
