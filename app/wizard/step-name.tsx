import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";

export default function WizardNameScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [name, setName] = useState(data.name || "");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);
    try {
      updateData({ name: name.trim() });
      router.push("/wizard/step-level");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow px-6 pt-10 pb-8" showsVerticalScrollIndicator={false}>
        {/* Progress indicator */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-medium text-blue-600">Step 2 of 6</Text>
            <Text className="text-sm text-gray-500">Personal Info</Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: "33%" }} />
          </View>
        </View>

        {/* Header with illustration */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl justify-center items-center mb-6 shadow-lg shadow-purple-500/20">
            <MaterialCommunityIcons name="account" size={36} color="white" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 text-center mb-3">What's your name?</Text>

          <Text className="text-base text-gray-600 text-center max-w-xs">
            We'll use this to personalize your learning experience
          </Text>
        </View>

        {/* Form section */}
        <View className="flex-1 mb-8">
          <Input
            label="Your Name"
            placeholder="Enter your first name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
            maxLength={50}
            inputClassName="text-lg"
            className="mb-2"
          />

          <Text className="text-sm text-gray-500 text-center mt-4">
            This is how we'll address you throughout the app
          </Text>
        </View>

        {/* Action button */}
        <View className="mb-8">
          <Button
            title="Continue"
            onPress={handleNext}
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading || !name.trim()}
            className="w-full rounded-2xl shadow-lg"
            icon="arrow-right"
            iconPosition="right"
          />
        </View>

        {/* Back navigation */}
        <View className="items-center mt-6">
          <Button
            title="Back to Language"
            onPress={() => router.back()}
            variant="outline"
            size="small"
            icon="arrow-left"
            className="rounded-xl border-gray-300"
            textClassName="text-gray-600"
          />
        </View>

        {/* Tips section */}
        <View className="mt-10 pt-6 border-t border-gray-200">
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-3 mt-0.5">
              <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-800 mb-1">Why we ask for your name</Text>
              <Text className="text-xs text-gray-600">
                Personalizing lessons with your name helps create a more engaging learning environment and improves
                retention.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
