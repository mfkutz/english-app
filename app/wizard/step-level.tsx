import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";

export default function WizardLevelScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [selectedLevel, setSelectedLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">(data.level || "A1");

  const levels = [
    {
      id: "A1",
      title: "Beginner (A1)",
      description: "I can understand and use basic phrases",
      icon: "school",
      color: "#10B981",
      details: "Basic vocabulary, simple sentences",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      id: "A2",
      title: "Elementary (A2)",
      description: "I can communicate in simple situations",
      icon: "chat",
      color: "#34D399",
      details: "Everyday expressions, routine matters",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      id: "B1",
      title: "Intermediate (B1)",
      description: "I can handle most travel situations",
      icon: "airplane",
      color: "#3B82F6",
      details: "Main points of clear standard input",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: "B2",
      title: "Upper Intermediate (B2)",
      description: "I can interact with fluency",
      icon: "account-voice",
      color: "#6366F1",
      details: "Technical discussions, abstract topics",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
    },
    {
      id: "C1",
      title: "Advanced (C1)",
      description: "I can use language flexibly",
      icon: "trophy",
      color: "#F59E0B",
      details: "Complex texts, implicit meaning",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      id: "C2",
      title: "Proficient (C2)",
      description: "I have mastery of the language",
      icon: "crown",
      color: "#EF4444",
      details: "Everything heard/read with ease",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  const handleNext = () => {
    updateData({ level: selectedLevel });
    router.push("/wizard/step-goals");
  };

  const selectedLevelData = levels.find((l) => l.id === selectedLevel);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow px-6 pt-10 pb-8" showsVerticalScrollIndicator={false}>
        {/* Progress indicator */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-medium text-blue-600">Step 3 of 6</Text>
            <Text className="text-sm text-gray-500">English Level</Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: "50%" }} />
          </View>
        </View>

        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl justify-center items-center mb-6 shadow-lg shadow-blue-500/20">
            <MaterialCommunityIcons name="chart-bar" size={36} color="white" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 text-center mb-3">What's your English level?</Text>

          <Text className="text-base text-gray-600 text-center max-w-xs">
            Select your current proficiency to personalize lessons
          </Text>
        </View>

        {/* Level Grid - 2 columns */}
        <View className="mb-8">
          <View className="flex-row flex-wrap -mx-2">
            {levels.map((level) => {
              const isSelected = selectedLevel === level.id;

              return (
                <View key={level.id} className="w-1/2 px-2 mb-4">
                  <TouchableOpacity
                    className={`
                      bg-white rounded-2xl p-4 border-2
                      ${isSelected ? "border-blue-500 shadow-lg shadow-blue-500/10" : "border-gray-200 shadow-sm"}
                      ${level.bgColor}
                      active:opacity-80
                    `}
                    onPress={() => setSelectedLevel(level.id as any)}
                    activeOpacity={0.7}
                  >
                    {/* Header with icon and level */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <View
                          className="w-10 h-10 rounded-xl justify-center items-center mr-3"
                          style={{ backgroundColor: `${level.color}20` }}
                        >
                          <MaterialCommunityIcons name={level.icon as any} size={20} color={level.color} />
                        </View>
                        <View>
                          <Text className={`text-lg font-bold ${level.textColor}`}>{level.id}</Text>
                          <Text className="text-xs text-gray-500">{level.title.split("(")[0].trim()}</Text>
                        </View>
                      </View>

                      {/* Selection indicator */}
                      {isSelected ? (
                        <View className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center">
                          <MaterialCommunityIcons name="check" size={14} color="white" />
                        </View>
                      ) : (
                        <View className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                      )}
                    </View>

                    {/* Description */}
                    <Text className="text-sm text-gray-800 mb-2">{level.description}</Text>

                    {/* Details */}
                    <Text className="text-xs text-gray-500">{level.details}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Selected Level Preview */}
        {selectedLevelData && (
          <View
            className={`mb-8 rounded-2xl p-5 border-l-4 ${selectedLevelData.borderColor} ${selectedLevelData.bgColor}`}
          >
            <View className="flex-row items-center mb-3">
              <View
                className="w-10 h-10 rounded-xl justify-center items-center mr-3"
                style={{ backgroundColor: selectedLevelData.color }}
              >
                <MaterialCommunityIcons name={selectedLevelData.icon as any} size={20} color="white" />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900">{selectedLevelData.title}</Text>
                <Text className="text-sm text-gray-600">Selected level</Text>
              </View>
            </View>

            <Text className="text-gray-700">
              Perfect! Lessons will be tailored for {selectedLevelData.id.toLowerCase()} level speakers.
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="space-y-4">
          <Button
            title="Continue"
            onPress={handleNext}
            variant="primary"
            size="large"
            className="w-full rounded-2xl shadow-lg"
            icon="arrow-right"
            iconPosition="right"
          />

          <Button
            title="Back"
            onPress={() => router.back()}
            variant="outline"
            size="large"
            className="w-full rounded-2xl"
            icon="arrow-left"
          />
        </View>

        {/* Help Section */}
        <View className="mt-10 pt-6 border-t border-gray-200">
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-3 mt-0.5">
              <MaterialCommunityIcons name="help-circle" size={16} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-800 mb-1">Not sure about your level?</Text>
              <Text className="text-xs text-gray-600">
                Choose the level that feels most comfortable. You can always adjust it later in settings.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
