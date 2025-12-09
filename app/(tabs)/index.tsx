import ChapterCard from "@/components/ChapterCard";
import { useLessons } from "@/hooks/useLessons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

// Iconos por tema de capítulo
const chapterIcons = {
  "1": "food-apple",
  "2": "cup",
  "3": "hamburger",
  "4": "airplane",
  "5": "home",
  "6": "school",
  "7": "nature",
  "8": "run",
  default: "book-open-variant",
};

// Colores de gradiente por capítulo
const chapterGradients = {
  "1": ["#F59E0B", "#FBBF24"],
  "2": ["#3B82F6", "#60A5FA"],
  "3": ["#EF4444", "#F87171"],
  "4": ["#10B981", "#34D399"],
  "5": ["#8B5CF6", "#A78BFA"],
  "6": ["#EC4899", "#F472B6"],
  "7": ["#059669", "#10B981"],
  "8": ["#6366F1", "#818CF8"],
  default: ["#6B7280", "#9CA3AF"],
};

export default function HomeScreen() {
  const router = useRouter();
  const { chapters, isLoading, error, refetchLessons } = useLessons();
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("A1");
  const [showLevelModal, setShowLevelModal] = useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetchLessons();
    setRefreshing(false);
  }, []);

  // Obtener icono para el capítulo
  const getChapterIcon = (chapterNumber: string) => {
    const num = chapterNumber.replace("CHAPTER_", "");
    return chapterIcons[num] || chapterIcons.default;
  };

  // Obtener gradiente para el capítulo
  const getChapterGradient = (chapterNumber: string) => {
    const match = chapterNumber.match(/CHAPTER_(\d+)/);
    const num = match ? match[1] : chapterNumber;

    if (chapterGradients[num]) {
      return chapterGradients[num];
    }

    const defaultGradients = [
      ["#6366F1", "#8B5CF6"],
      ["#10B981", "#34D399"],
      ["#F59E0B", "#FBBF24"],
      ["#EC4899", "#F472B6"],
      ["#8B5CF6", "#A78BFA"],
      ["#3B82F6", "#60A5FA"],
    ];

    const hash = Array.from(chapterNumber).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % defaultGradients.length;
    return defaultGradients[index];
  };

  // Calcular tiempo estimado para un capítulo
  const calculateChapterTime = (chapter: any) => {
    const totalMinutes = chapter.totalLessons * 5;
    if (totalMinutes < 60) return `${totalMinutes}m`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={vibrantColors.primary} />
          <Text style={styles.loadingText}>Loading your journey...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="alert-circle" size={64} color="#EF4444" />
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>Failed to load lessons</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetchLessons()}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Contenido principal con fondo personalizado */}
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {/* Header con gradiente */}
          <LinearGradient
            colors={[vibrantColors.gradientStart, vibrantColors.gradientEnd]}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Level {selectedLevel}</Text>
                <Text style={styles.headerSubtitle}>Master English step by step</Text>
              </View>
              <TouchableOpacity style={styles.levelSelectorButton} onPress={() => setShowLevelModal(true)}>
                <Ionicons name="chevron-down" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Stats en header */}
            {chapters.length > 0 && (
              <View style={styles.headerStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.completed}</Text>
                  <Text style={styles.statLabel}>Lessons</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.total}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.chapters}</Text>
                  <Text style={styles.statLabel}>Chapters</Text>
                </View>
              </View>
            )}
          </LinearGradient>

          {/* Promo Banner */}
          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>PRO</Text>
              </View>
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoTitle}>Try Premium for 7 days free!</Text>
                <Text style={styles.promoSubtitle}>Unlock all lessons and features</Text>
              </View>
              <MaterialCommunityIcons name="crown" size={24} color="#F59E0B" />
            </View>
          </View>

          {/* Sección de capítulos con fondo personalizado */}
          <View style={styles.chaptersSection}>
            <Text style={styles.sectionTitle}>Your Learning Journey</Text>
            <View style={styles.chaptersContainer}>
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.chapter}
                    chapter={chapter}
                    selectedLevel={selectedLevel}
                    getChapterIcon={getChapterIcon}
                    getChapterGradient={getChapterGradient}
                    calculateChapterTime={calculateChapterTime}
                  />
                ))
              ) : (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons name="book-open-variant" size={64} color="#CBD5E1" />
                  <Text style={styles.emptyStateTitle}>No chapters available</Text>
                  <Text style={styles.emptyStateText}>Start your learning journey by selecting a level</Text>
                  <TouchableOpacity style={styles.emptyStateButton} onPress={() => setShowLevelModal(true)}>
                    <Text style={styles.emptyStateButtonText}>Choose Level</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.spacer} />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // SOLO para la status bar
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#e1e1e1ff", // Este es el fondo que quieres (azul)
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a78d5ff",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: vibrantColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Header con gradiente
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  levelSelectorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Stats en header
  headerStats: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  // Promo Banner
  promoBanner: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  promoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  promoBadgeText: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "bold",
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },

  // Sección de capítulos
  chaptersSection: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 20,
    marginBottom: 16,
  },
  chaptersContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    marginHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyStateButton: {
    backgroundColor: vibrantColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  spacer: {
    height: 40,
  },
});
