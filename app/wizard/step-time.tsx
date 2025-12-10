// # Paso 5: Tiempo DIARIO
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";

export default function WizardTimeScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [dailyMinutes, setDailyMinutes] = useState(data.dailyPracticeGoal);

  const timeOptions = [
    { minutes: 5, label: "5 min", description: "Quick practice" },
    { minutes: 10, label: "10 min", description: "Daily routine" },
    { minutes: 20, label: "20 min", description: "Serious learning" },
    { minutes: 30, label: "30+ min", description: "Intensive study" },
  ];

  const handleNext = () => {
    updateData({ dailyPracticeGoal: dailyMinutes });
    router.push("/wizard/step-notifications");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-10 pb-8">
        {/* Progress */}
        <View className="mb-10">
          <View className="h-1 bg-gray-300 rounded-full overflow-hidden mb-2">
            <View className="h-full bg-blue-500 rounded-full" style={{ width: "83%" }} />
          </View>
          <Text className="text-xs text-gray-500 text-center">Step 5 of 6</Text>
        </View>

        {/* Title */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">Daily practice time</Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed">
            How much time can you practice each day?
          </Text>
        </View>

        {/* Time display */}
        <View className="items-center mb-10">
          <Text className="text-6xl font-bold text-blue-500">{dailyMinutes}</Text>
          <Text className="text-base text-gray-600 -mt-2">minutes per day</Text>
        </View>

        {/* Slider */}
        <View className="mb-10">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={5}
            maximumValue={60}
            step={5}
            value={dailyMinutes}
            onValueChange={setDailyMinutes}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E5E5EA"
            thumbTintColor="#007AFF"
          />
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-gray-500">5 min</Text>
            <Text className="text-xs text-gray-500">60 min</Text>
          </View>
        </View>

        {/* Quick options */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option.minutes}
              className={`
                w-[48%] bg-gray-50 border border-gray-300 rounded-xl p-4 mb-3 items-center
                ${dailyMinutes === option.minutes ? "bg-blue-50 border-blue-500" : ""}
              `}
              onPress={() => setDailyMinutes(option.minutes)}
            >
              <Text
                className={`
                  text-lg font-semibold text-gray-900 mb-1
                  ${dailyMinutes === option.minutes ? "text-blue-500" : ""}
                `}
              >
                {option.label}
              </Text>
              <Text className="text-xs text-gray-600 text-center">{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendation */}
        <View className="flex-row items-center bg-orange-50 rounded-xl p-4 mb-8">
          <MaterialCommunityIcons name="lightbulb" size={20} color="#FF9500" />
          <Text className="flex-1 text-sm text-amber-900 ml-3 leading-5">
            We recommend at least 10 minutes daily for consistent progress
          </Text>
        </View>

        {/* Buttons */}
        <View className="mt-4">
          <Button title="Next" onPress={handleNext} variant="primary" size="large" className="mb-3" />

          <Button title="Back" onPress={() => router.back()} variant="outline" size="small" className="self-center" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
