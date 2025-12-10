import { useWizard } from "@/hooks/useWizard";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Header minimalista */}
          <View className="flex-row justify-end mb-8">
            <TouchableOpacity
              onPress={() => router.replace("/welcome")}
              className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Contenido principal */}
          <View>
            {/* Título */}
            <View className="mb-10">
              <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</Text>
              <Text className="text-base text-gray-600 text-center">Sign in to continue your learning journey</Text>
            </View>

            {/* Google Button - Minimalista */}
            <TouchableOpacity
              className="border border-gray-300 rounded-xl p-4 mb-6 active:bg-gray-50"
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome5 name="google" size={20} />
                <Text className="text-gray-900 font-medium text-base ml-3">Continue with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm">or continue with email</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Formulario */}
            <View className="space-y-4">
              <Input
                label="Email"
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                inputClassName="bg-gray-50"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                secureTextEntry
                autoComplete="password"
                inputClassName="bg-gray-50"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end mt-4 mb-8"
              onPress={() => Alert.alert("Coming Soon", "Password reset feature coming soon!")}
              activeOpacity={0.7}
            >
              <Text className="text-blue-600 font-medium text-sm">Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="Sign In"
              onPress={handleEmailLogin}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              className="w-full rounded-xl"
            />

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8 pt-6 border-t border-gray-200">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup-options")} activeOpacity={0.7}>
                <Text className="text-blue-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
