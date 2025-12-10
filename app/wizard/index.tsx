import { Button } from "@/components/common/Button";
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

export default function WizardLanguageScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [selectedLanguage, setSelectedLanguage] = useState<"es" | "en" | "pt">(data.appLanguage);

  const languages = [
    {
      id: "es" as const,
      name: "Español",
      subtitle: "Spanish",
      countryCode: "ES",
    },
    {
      id: "en" as const,
      name: "English",
      subtitle: "English",
      countryCode: "GB",
    },
    {
      id: "pt" as const,
      name: "Português",
      subtitle: "Portuguese",
      countryCode: "PT",
    },
  ];

  const handleNext = () => {
    updateData({ appLanguage: selectedLanguage });
    router.push("/wizard/step-name");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow px-6 pt-12 pb-10" showsVerticalScrollIndicator={false}>
        {/* Progress indicator - Simple */}
        <View className="mb-10">
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <View className="h-full bg-blue-600 rounded-full" style={{ width: "16%" }} />
          </View>
          <Text className="text-xs text-gray-500 text-center">Step 1 of 6</Text>
        </View>

        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-16 h-16 bg-blue-100 rounded-2xl justify-center items-center mb-4">
            <MaterialCommunityIcons name="translate" size={32} color="#3B82F6" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 text-center mb-3">Choose Your Language</Text>

          <Text className="text-base text-gray-600 text-center">Select the language for the app interface</Text>
        </View>

        {/* Language options - Simplified */}
        <View className="flex-1 mb-8">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;

            return (
              <TouchableOpacity
                key={lang.id}
                className={`
                  flex-row items-center p-4 rounded-2xl mb-4
                  ${isSelected ? "bg-blue-50 border-2 border-blue-500" : "bg-gray-50 border border-gray-200"}
                `}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.7}
              >
                {/* Flag */}
                <View className="mr-4">
                  <CountryFlag
                    isoCode={lang.countryCode}
                    size={32}
                    style={{
                      borderRadius: 6,
                      width: 40,
                      height: 30,
                    }}
                  />
                </View>

                {/* Language info */}
                <View className="flex-1">
                  <Text className={`text-lg font-semibold ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                    {lang.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{lang.subtitle}</Text>
                </View>

                {/* Selection indicator */}
                {isSelected ? (
                  <View className="w-8 h-8 bg-blue-600 rounded-full justify-center items-center">
                    <MaterialCommunityIcons name="check" size={16} color="white" />
                  </View>
                ) : (
                  <View className="w-8 h-8 border-2 border-gray-300 rounded-full" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action button */}
        <View className="mb-6">
          <Button title="Continue" onPress={handleNext} variant="primary" size="large" className="w-full rounded-xl" />
        </View>

        {/* Debug section */}
        <View className="items-center mt-6">
          <Button
            title="Debug: Clear Storage"
            onPress={async () => {
              await AsyncStorage.clear();
              Alert.alert("Cleared", "Auth data cleared");
            }}
            variant="outline"
            size="small"
            className="rounded-lg"
          />
        </View>

        {/* Help text */}
        <View className="items-center mt-8 pt-6 border-t border-gray-200">
          <Text className="text-xs text-gray-400">You can change this anytime in Settings</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
