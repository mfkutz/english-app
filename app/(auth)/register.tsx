import { useWizard } from "@/hooks/useWizard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { checkStatus } = useWizard();

  const validateForm = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(email, password);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header con X */}
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <TouchableOpacity onPress={() => router.replace("/welcome")} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />

            <Input
              label="Password"
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              autoComplete="password-new"
            />

            <Text style={styles.passwordHint}>Your password must be at least 6 characters long.</Text>

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              style={styles.registerButton}
            />

            <Text style={styles.termsText}>
              By creating an account, you agree to our <Text style={styles.link}>Terms of Service</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Text style={styles.footerLink} onPress={() => router.push("/(auth)/login")}>
                Sign In
              </Text>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  headerSpacer: {
    width: 40, // Para mantener simetría
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  form: {
    flex: 1,
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginTop: -8,
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 24,
  },
  link: {
    color: "#007AFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 40,
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
