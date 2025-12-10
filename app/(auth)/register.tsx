import { useWizard } from "@/hooks/useWizard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
      Alert.alert("Registration Failed", error.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {/* Header con ícono de cerrar en esquina superior derecha */}
        <View className="absolute top-4 right-4 z-10">
          <TouchableOpacity
            onPress={() => router.replace("/welcome")}
            className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerClassName="flex-grow justify-center"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Contenido centrado */}
          <View className="max-w-md w-full mx-auto">
            {/* Título */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</Text>
              <Text className="text-base text-gray-600 text-center">Start your English learning journey</Text>
            </View>

            {/* Formulario */}
            <View className="space-y-6">
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
                placeholder="At least 6 characters"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                secureTextEntry
                autoComplete="password-new"
                inputClassName="bg-gray-50"
              />

              <Text className="text-sm text-gray-500 mt-2">Your password must be at least 6 characters long.</Text>

              {/* Botón de registro */}
              <Button
                title="Create Account"
                onPress={handleRegister}
                loading={isLoading}
                disabled={isLoading}
                size="large"
                className="w-full rounded-xl mt-4"
              />

              {/* Términos y condiciones */}
              <Text className="text-xs text-gray-500 text-center mt-6 leading-5">
                By creating an account, you agree to our <Text className="text-blue-600">Terms of Service</Text> and{" "}
                <Text className="text-blue-600">Privacy Policy</Text>
              </Text>

              {/* Link a login */}
              <View className="flex-row justify-center mt-8 pt-6 border-t border-gray-200">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")} activeOpacity={0.7}>
                  <Text className="text-blue-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
