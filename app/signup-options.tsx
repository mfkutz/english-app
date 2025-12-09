import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/common/Button";

export default function SignupOptionsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Background decorative elements */}
      <View className="absolute top-0 left-0 right-0">
        <LinearGradient
          colors={["#E0F2FE", "#F0F9FF", "#FFFFFF"]}
          className="h-64"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      <View className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-12">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-gray-100 justify-center items-center active:bg-gray-200"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-3xl font-bold text-gray-900">Join English Practice</Text>
            <Text className="text-gray-600 mt-1">Start your journey to fluency</Text>
          </View>
        </View>

        {/* Main content */}
        <View className="flex-1 justify-center">
          {/* Welcome card */}
          <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 mb-8 border border-blue-100">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-blue-500 rounded-2xl justify-center items-center mr-4">
                <MaterialCommunityIcons name="star" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">Why join us?</Text>
                <Text className="text-gray-600 text-sm mt-1">
                  AI-powered practice • Personalized lessons • Daily streaks
                </Text>
              </View>
            </View>
          </View>

          {/* Signup options */}
          <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">Choose your signup method</Text>

          {/* Google Button */}
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-4 border-2 border-gray-200 active:border-blue-300 active:bg-blue-50"
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-10 h-10 bg-white rounded-xl justify-center items-center border border-gray-200">
                <MaterialCommunityIcons name="google" size={20} color="#DB4437" />
              </View>
              <Text className="text-gray-900 font-semibold text-lg ml-4">Continue with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Apple Button (opcional pero moderno) */}
          <TouchableOpacity
            className="bg-gray-900 rounded-2xl p-4 mb-6 border-2 border-gray-800 active:bg-gray-800"
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-10 h-10 bg-gray-800 rounded-xl justify-center items-center">
                <MaterialCommunityIcons name="apple" size={20} color="white" />
              </View>
              <Text className="text-white font-semibold text-lg ml-4">Continue with Apple</Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Email Button */}
          <Button
            title="Continue with Email"
            onPress={() => router.push("/(auth)/register")}
            variant="primary"
            size="large"
            icon="email"
            className="w-full rounded-2xl mb-2"
          />

          <Text className="text-sm text-gray-500 text-center mb-8">
            By continuing, you agree to our Terms and Privacy Policy
          </Text>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")} activeOpacity={0.7}>
              <Text className="text-blue-600 font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features footer */}
        <View className="mt-8 mb-6">
          <View className="flex-row justify-between">
            <View className="items-center flex-1 px-2">
              <View className="w-10 h-10 bg-green-100 rounded-xl justify-center items-center mb-2">
                <MaterialCommunityIcons name="robot" size={20} color="#10B981" />
              </View>
              <Text className="text-xs text-gray-600 text-center">AI Practice</Text>
            </View>

            <View className="items-center flex-1 px-2">
              <View className="w-10 h-10 bg-purple-100 rounded-xl justify-center items-center mb-2">
                <MaterialCommunityIcons name="chart-line" size={20} color="#8B5CF6" />
              </View>
              <Text className="text-xs text-gray-600 text-center">Progress Tracking</Text>
            </View>

            <View className="items-center flex-1 px-2">
              <View className="w-10 h-10 bg-amber-100 rounded-xl justify-center items-center mb-2">
                <MaterialCommunityIcons name="trophy" size={20} color="#F59E0B" />
              </View>
              <Text className="text-xs text-gray-600 text-center">Daily Goals</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
