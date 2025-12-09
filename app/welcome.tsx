import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { Button } from "../components/common/Button";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-10 pb-8 justify-between">
        {/* Logo/Imagen */}
        <View className="items-center mt-10">
          <Text className="text-6xl mb-4">🎯</Text>
          <Text className="text-3xl font-bold text-gray-900 mb-2">English Practice</Text>
          <Text className="text-base text-gray-600">Speak English confidently</Text>
        </View>

        {/* Ilustración/Texto */}
        <View className="items-center my-10">
          <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">Start Your Journey</Text>
          <Text className="text-base text-gray-600 text-center leading-6">
            Practice English conversations with AI, get instant feedback, and become fluent faster.
          </Text>
        </View>

        <Button
          title="DEBUG: Clear Auth"
          onPress={async () => {
            await AsyncStorage.clear();
            Alert.alert("Cleared", "Auth data cleared");
          }}
          variant="outline"
          size="small"
          style={{ marginTop: 20 }}
        />

        {/* Botones */}
        <View className="w-full">
          <Button
            title="Get Started"
            onPress={() => router.push("/signup-options")}
            variant="primary"
            size="large"
            className="mb-3"
          />

          <Button
            title="I already have an account"
            onPress={() => router.push("/(auth)/login")}
            variant="outline"
            size="large"
            className="mb-3"
          />
        </View>

        {/* Footer */}
        <Text className="text-xs text-gray-500 text-center leading-4 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
