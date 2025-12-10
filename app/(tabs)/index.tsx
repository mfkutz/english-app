import ChapterCard from "@/components/ChapterCard";
import LevelHeader from "@/components/principalHeader/PrincipalHeader";
import PromoBanner from "@/components/PromoBanner";
import { useLessons } from "@/hooks/useLessons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LevelSelectorModal from "../../components/LevelSelectorModal";

// Para gradientes más vibrantes
const vibrantColors = {
  primary: "#6366F1",
  secondary: "#8B5CF6",
  accent: "#EC4899",
  success: "#10B981",
  warning: "#F59E0B",
  gradientStart: "#6366F1",
  gradientEnd: "#8B5CF6",
};

export default function HomeScreen() {
  const { chapters, isLoading, error, refetchLessons } = useLessons();
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("A1");
  const [showLevelModal, setShowLevelModal] = useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetchLessons();
    setRefreshing(false);
  }, []);

  // Función para calcular estadísticas totales
  const calculateStats = () => {
    if (chapters.length === 0) return { completed: 0, total: 0, chapters: 0 };

    const completed = chapters.reduce((total, chapter) => total + chapter.completedCount, 0);
    const total = chapters.reduce((total, chapter) => total + chapter.totalLessons, 0);

    return {
      completed,
      total,
      chapters: chapters.length,
    };
  };

  const stats = calculateStats();

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center bg-[#1a78d5] p-5">
          <ActivityIndicator size="large" color={vibrantColors.primary} />
          <Text className="mt-3 text-white text-sm font-medium">Loading your journey...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center bg-[#1a78d5] p-5">
          <MaterialCommunityIcons name="alert-circle" size={64} color="#EF4444" />
          <Text className="text-2xl font-bold text-white mt-4 mb-2">Oops!</Text>
          <Text className="text-base text-white/90 text-center mb-6">Failed to load lessons</Text>
          <TouchableOpacity className="bg-indigo-500 px-6 py-3 rounded-xl" onPress={() => refetchLessons()}>
            <Text className="text-white text-base font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex-1">
        {/* Header fijo con LevelHeader y PromoBanner */}
        <View className="flex-shrink-0 relative mb-6 ">
          <LevelHeader
            selectedLevel={selectedLevel}
            stats={stats}
            onLevelPress={() => setShowLevelModal(true)}
            hasChapters={chapters.length > 0}
          />

          {/* Banner promocional */}
          <View className="absolute bottom-[-30px] left-2 right-2 z-10">
            <PromoBanner compact={true} variant="dark" onPress={() => console.log("Start free trial")} />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 500 }}
        >
          {/* Sección de capítulos  */}
          <View className="pt-5">
            <View className="px-5 gap-5">
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <ChapterCard key={chapter.chapter} chapter={chapter} selectedLevel={selectedLevel} />
                ))
              ) : (
                <View className="items-center justify-center p-10 mt-5 bg-white/10 rounded-2xl mx-5">
                  <MaterialCommunityIcons name="book-open-variant" size={64} color="#CBD5E1" />
                  <Text className="text-xl font-bold text-white mt-4 mb-2">No chapters available</Text>
                  <Text className="text-sm text-white/80 text-center mb-6 leading-5">
                    Start your learning journey by selecting a level
                  </Text>
                  <TouchableOpacity
                    className="bg-indigo-500 px-6 py-3 rounded-xl"
                    onPress={() => setShowLevelModal(true)}
                  >
                    <Text className="text-white text-base font-semibold">Choose Level</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View className="h-10" />
        </ScrollView>
      </View>

      {/* Modal de selección de nivel */}
      <LevelSelectorModal
        visible={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />
    </SafeAreaView>
  );
}
