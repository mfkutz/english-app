import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Lesson {
  _id: string;
  title: string;
  topics?: string[];
  progress?: {
    completed: boolean | null;
  };
  duration?: string;
  icon?: string;
}

interface ChapterCardProps {
  chapter: {
    chapter: string;
    chapterId: string;
    totalLessons: number;
    completedCount: number;
    lessons: Lesson[];
  };
  selectedLevel: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, selectedLevel }) => {
  const router = useRouter();
  const progressPercentage =
    chapter.totalLessons > 0 ? Math.round((chapter.completedCount / chapter.totalLessons) * 100) : 0;

  const handleStartLesson = (lessonId: string) => {
    router.replace(`/lesson/${lessonId}`);
  };

  const handleOpenChapter = () => {
    console.log("Open chapter details:", chapter.chapterId);
  };

  // Paleta de colores ámbar para toda la app
  const colors = {
    primary: "#F59E0B", // Ámbar principal
    light: "#FFFBEB", // Ámbar muy claro (fondo)
    medium: "#FCD34D", // Ámbar medio (hover/estados)
    dark: "#D97706", // Ámbar oscuro (textos/icons)
    accent: "#92400E", // Ámbar muy oscuro (accent)
    primaryLight: "#FEF3C7", // Ámbar claro
  };

  // Formatear el nombre del capítulo
  const formatChapterName = (chapterStr: string) => {
    const chapterNumber = chapterStr.replace("CHAPTER_", "");
    return `Chapter ${chapterNumber}`;
  };

  // Obtener un título descriptivo basado en las lecciones
  const getChapterDescription = () => {
    if (chapter.lessons.length > 0) {
      const firstLesson = chapter.lessons[0];
      if (firstLesson.topics && firstLesson.topics.length > 0) {
        return firstLesson.topics.join(" • ");
      }
      if (firstLesson.title) {
        const keywords = firstLesson.title.split(" ").slice(0, 3).join(", ");
        return keywords;
      }
    }
    return "General vocabulary and phrases";
  };

  // Obtener icono para la lección (solo ámbar)
  const getLessonIcon = (index: number, completed?: boolean | null) => {
    if (completed) {
      return {
        name: "check-circle",
        color: colors.primary,
        iconSet: "MaterialCommunityIcons" as const,
      };
    }

    // Diferentes iconos pero todos en tonos ámbar
    const icons = [
      { name: "book-open-variant", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "message-text", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "headphones", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "microphone", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "pencil", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "flashcards", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "translate", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
      { name: "alphabetical", color: colors.dark, iconSet: "MaterialCommunityIcons" as const },
    ];

    return icons[index % icons.length];
  };

  return (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden shadow-lg bg-white border border-amber-100  active:opacity-95"
      activeOpacity={0.9}
      onPress={handleOpenChapter}
    >
      {/* Header del capítulo con fondo ámbar claro */}
      <View className="px-5 py-4" style={{ backgroundColor: colors.light }}>
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.primary }} />
            <Text className="text-base font-medium" style={{ color: colors.dark }}>
              Level {selectedLevel}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-base font-medium mr-2" style={{ color: colors.dark }}>
              {chapter.completedCount}/{chapter.totalLessons} done
            </Text>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.primaryLight }}>
              <Text className="text-base font-bold" style={{ color: colors.accent }}>
                {progressPercentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Título del capítulo */}
        <Text className="text-2xl font-bold mb-1" style={{ color: colors.accent }}>
          {formatChapterName(chapter.chapter)}
        </Text>

        {/* Descripción temática del capítulo */}
        <Text className="text-base mb-3" style={{ color: colors.dark }}>
          {getChapterDescription()}
        </Text>

        {/* Progress bar ámbar */}
        <View className="mt-2">
          <View className="h-2 bg-white rounded-full overflow-hidden border border-amber-200">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: colors.primary,
              }}
            />
          </View>
        </View>
      </View>

      {/* Lista de lecciones */}
      <View className="px-4 py-2 bg-white">
        <Text className="text-base font-medium mb-3 px-1" style={{ color: colors.dark }}>
          Lessons in this chapter:
        </Text>

        {chapter.lessons.slice(0, 4).map((lesson, index) => {
          const isCompleted = lesson.progress?.completed;
          const icon = getLessonIcon(index, isCompleted);

          return (
            <TouchableOpacity
              key={lesson._id}
              className="flex-row items-center py-3 border-t border-amber-50 first:border-t-0"
              onPress={() => handleStartLesson(lesson._id)}
              activeOpacity={0.7}
            >
              {/* Número e icono de la lección */}
              <View className="flex-row items-center mr-3">
                <View
                  className="w-8 h-8 rounded-lg justify-center items-center mr-3"
                  style={{ backgroundColor: colors.primaryLight }}
                >
                  <Text className="text-base font-bold" style={{ color: colors.accent }}>
                    {index + 1}
                  </Text>
                </View>

                <View
                  className="w-10 h-10 rounded-xl justify-center items-center"
                  style={{ backgroundColor: colors.light }}
                >
                  {icon.iconSet === "MaterialCommunityIcons" ? (
                    <MaterialCommunityIcons name={icon.name as any} size={20} color={icon.color} />
                  ) : (
                    <Ionicons name={icon.name as any} size={20} color={icon.color} />
                  )}
                </View>
              </View>

              {/* Información de la lección */}
              <View className="flex-1">
                <Text className={`text-lg font-medium ${isCompleted ? "text-gray-500" : "text-gray-900"}`}>
                  {lesson.title}
                </Text>
                {lesson.topics && lesson.topics.length > 0 && (
                  <Text className="text-base mt-0.5" style={{ color: colors.dark }}>
                    {lesson.topics.slice(0, 2).join(" • ")}
                  </Text>
                )}
              </View>

              {/* Estado/Acción */}
              <View className="ml-2">
                {isCompleted ? (
                  <View
                    className="w-8 h-8 rounded-full justify-center items-center"
                    style={{ backgroundColor: colors.primaryLight }}
                  >
                    <MaterialCommunityIcons name="check" size={16} color={colors.primary} />
                  </View>
                ) : (
                  <View className="flex-row items-center">
                    <View
                      className="w-8 h-8 rounded-full justify-center items-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Ionicons name="play" size={14} color="#FFF" />
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Ver más lecciones si hay más de 4 */}
        {chapter.lessons.length > 4 && (
          <TouchableOpacity className="flex-row items-center justify-center py-3 border-t border-amber-100">
            <Text className="text-sm font-medium mr-1" style={{ color: colors.primary }}>
              +{chapter.lessons.length - 4} more lessons
            </Text>
            <Ionicons name="chevron-forward" size={16} style={{ color: colors.primary }} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChapterCard;
