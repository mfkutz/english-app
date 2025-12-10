// # Paso 4: Objetivos
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";

export default function WizardGoalsScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals);

  const goals = [
    {
      id: "travel",
      title: "Travel & Tourism",
      description: "Communicate while traveling",
      icon: "airplane",
      color: "#5856D6",
    },
    {
      id: "business",
      title: "Business & Work",
      description: "Professional communication",
      icon: "briefcase",
      color: "#FF9500",
    },
    {
      id: "daily",
      title: "Daily Conversation",
      description: "Everyday social interactions",
      icon: "chat",
      color: "#34C759",
    },
    {
      id: "academic",
      title: "Academic",
      description: "Study or research purposes",
      icon: "book",
      color: "#FF2D55",
    },
    {
      id: "pronunciation",
      title: "Improve Pronunciation",
      description: "Sound more natural",
      icon: "microphone",
      color: "#AF52DE",
    },
    {
      id: "exam",
      title: "Exam Preparation",
      description: "TOEFL, IELTS, or other tests",
      icon: "file-document",
      color: "#FF3B30",
    },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]));
  };

  const handleNext = () => {
    updateData({ goals: selectedGoals });
    router.push("/wizard/step-time");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pt-10 pb-8">
        {/* Progress */}
        <View className="mb-10">
          <View className="h-1 bg-gray-300 rounded-full overflow-hidden mb-2">
            <View className="h-full bg-blue-500 rounded-full" style={{ width: "66%" }} />
          </View>
          <Text className="text-xs text-gray-500 text-center">Step 4 of 6</Text>
        </View>

        {/* Title */}
        <View className="mb-8 px-2">
          <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">What are your goals?</Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed">
            Select all that apply (you can change this later)
          </Text>
        </View>

        {/* Goals grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                className={`
                  w-[48%] bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4 relative
                  ${isSelected ? "bg-blue-50 border-blue-500" : ""}
                `}
                onPress={() => toggleGoal(goal.id)}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: `${goal.color}20` }}
                >
                  <MaterialCommunityIcons name={goal.icon as any} size={24} color={goal.color} />
                </View>
                <Text className="text-base font-semibold text-gray-900 mb-1">{goal.title}</Text>
                <Text className="text-xs text-gray-600 leading-4">{goal.description}</Text>
                {isSelected && (
                  <View className="absolute top-3 right-3">
                    <MaterialCommunityIcons name="check-circle" size={20} color="#007AFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected count */}
        <View className="items-center mb-6">
          <Text className="text-sm text-blue-500 font-medium">
            {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""} selected
          </Text>
        </View>

        {/* Buttons */}
        <View className="mt-4">
          <Button title="Next" onPress={handleNext} variant="primary" size="large" className="mb-3" />

          <Button title="Skip" onPress={handleNext} variant="outline" size="small" className="self-center" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
