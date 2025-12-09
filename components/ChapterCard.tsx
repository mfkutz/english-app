import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Lesson {
  _id: string;
  title: string;
  topics?: string[];
  progress?: {
    completed: boolean;
  };
}

interface ChapterCardProps {
  chapter: {
    chapter: string;
    totalLessons: number;
    completedCount: number;
    lessons: Lesson[];
  };
  selectedLevel: string;
  getChapterIcon: (chapterNumber: string) => string;
  getChapterGradient: (chapterNumber: string) => string[];
  calculateChapterTime: (chapter: any) => string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  selectedLevel,
  getChapterIcon,
  getChapterGradient,
  calculateChapterTime,
}) => {
  const router = useRouter();
  const progressPercentage =
    chapter.totalLessons > 0 ? Math.round((chapter.completedCount / chapter.totalLessons) * 100) : 0;

  const gradientColors = getChapterGradient(chapter.chapter);
  const chapterIcon = getChapterIcon(chapter.chapter);
  const estimatedTime = calculateChapterTime(chapter);

  const handleStartLesson = (lessonId: string) => {
    router.replace(`/lesson/${lessonId}`);
  };

  return (
    <TouchableOpacity className="rounded-2xl overflow-hidden shadow-xl shadow-black/10" activeOpacity={0.95}>
      {/* Fondo con gradiente */}
      <LinearGradient colors={gradientColors} className="p-5" start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        {/* Header del capítulo */}
        <View className="flex-row items-center mb-3">
          <View className="w-12 h-12 rounded-xl bg-white/20 justify-center items-center mr-3">
            <MaterialCommunityIcons name={chapterIcon} size={24} color="#FFF" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-white/80 font-medium mb-0.5">Level {selectedLevel}</Text>
            <Text className="text-xl font-bold text-white">Chapter {chapter.chapter.replace("CHAPTER_", "")}</Text>
          </View>
          <View className="bg-white/20 px-3 py-1.5 rounded-full">
            <Text className="text-white font-bold text-sm">{progressPercentage}%</Text>
          </View>
        </View>

        {/* Descripción del capítulo */}
        <Text className="text-sm text-white/90 mb-4 leading-5">
          {chapter.lessons[0]?.topics?.join(", ") || "General vocabulary"}
        </Text>

        {/* Stats del capítulo */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-row items-center gap-1.5">
            <MaterialCommunityIcons name="book-open" size={16} color="#FFF" />
            <Text className="text-xs text-white/90 font-medium">
              {chapter.completedCount}/{chapter.totalLessons} lessons
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <MaterialCommunityIcons name="clock-outline" size={16} color="#FFF" />
            <Text className="text-xs text-white/90 font-medium">{estimatedTime}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View className="h-1.5 bg-white/20 rounded-full mb-5 overflow-hidden">
          <View className="h-full bg-white rounded-full" style={{ width: `${progressPercentage}%` }} />
        </View>

        {/* Lessons preview */}
        <View className="gap-3">
          {chapter.lessons.slice(0, 3).map((lesson, index) => {
            const isCompleted = lesson.progress?.completed;
            return (
              <TouchableOpacity
                key={lesson._id}
                className="flex-row justify-between items-center bg-white/10 rounded-xl p-3 active:bg-white/15"
                onPress={() => handleStartLesson(lesson._id)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1 gap-3">
                  <View
                    className={`
                      w-7 h-7 rounded-full justify-center items-center
                      ${isCompleted ? "bg-green-500" : "bg-white/20"}
                    `}
                  >
                    <Text className="text-xs font-bold text-white">{index + 1}</Text>
                  </View>
                  <Text
                    className={`
                      text-sm font-medium text-white flex-1
                      ${isCompleted ? "opacity-80" : ""}
                    `}
                    numberOfLines={1}
                  >
                    {lesson.title}
                  </Text>
                </View>
                <View className="ml-2">
                  {isCompleted ? (
                    <View className="w-6 h-6 rounded-full bg-green-500 justify-center items-center">
                      <MaterialCommunityIcons name="check" size={14} color="#FFF" />
                    </View>
                  ) : (
                    <MaterialCommunityIcons name="play-circle" size={24} color="#FFF" className="opacity-90" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {chapter.lessons.length > 3 && (
            <TouchableOpacity className="flex-row items-center justify-center py-2 gap-1">
              <Text className="text-xs text-white/80 font-medium">+{chapter.lessons.length - 3} more lessons</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ChapterCard;
