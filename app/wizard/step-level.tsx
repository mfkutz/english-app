//  # Paso 3: Nivel
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";

// app/wizard/step-level.tsx
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
      color: "#34C759",
      details: "Basic vocabulary, simple sentences",
    },
    {
      id: "A2",
      title: "Elementary (A2)",
      description: "I can communicate in simple situations",
      icon: "chat",
      color: "#4CD964",
      details: "Everyday expressions, routine matters",
    },
    {
      id: "B1",
      title: "Intermediate (B1)",
      description: "I can handle most travel situations",
      icon: "airplane",
      color: "#007AFF",
      details: "Main points of clear standard input",
    },
    {
      id: "B2",
      title: "Upper Intermediate (B2)",
      description: "I can interact with fluency",
      icon: "account-voice",
      color: "#5856D6",
      details: "Technical discussions, abstract topics",
    },
    {
      id: "C1",
      title: "Advanced (C1)",
      description: "I can use language flexibly",
      icon: "trophy",
      color: "#FF9500",
      details: "Complex texts, implicit meaning",
    },
    {
      id: "C2",
      title: "Proficient (C2)",
      description: "I have mastery of the language",
      icon: "crown",
      color: "#FF3B30",
      details: "Everything heard/read with ease",
    },
  ];

  const handleNext = () => {
    updateData({ level: selectedLevel });
    router.push("/wizard/step-goals");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "50%" }]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your English level?</Text>
          <Text style={styles.subtitle}>Select your current proficiency level</Text>
        </View>

        {/* Level options - GRID de 2 columnas */}
        <View style={styles.optionsContainer}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[styles.levelCard, selectedLevel === level.id && styles.levelCardSelected]}
              onPress={() => setSelectedLevel(level.id as any)}
            >
              <View style={styles.levelHeader}>
                <View style={[styles.iconContainer, { backgroundColor: level.color + "20" }]}>
                  <MaterialCommunityIcons name={level.icon as any} size={24} color={level.color} />
                </View>
                <View style={styles.levelTitleContainer}>
                  <Text style={styles.levelTitle}>{level.id}</Text>
                  <Text style={styles.levelSubtitle}>{level.title.split("(")[0].trim()}</Text>
                </View>
                {selectedLevel === level.id && (
                  <MaterialCommunityIcons name="check-circle" size={20} color={level.color} />
                )}
              </View>
              <Text style={styles.levelDescription}>{level.description}</Text>
              <Text style={styles.levelDetails}>{level.details}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected level preview */}
        <View style={styles.selectedPreview}>
          <Text style={styles.previewTitle}>Selected: {selectedLevel}</Text>
          <Text style={styles.previewText}>{levels.find((l) => l.id === selectedLevel)?.description}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button title="Next" onPress={handleNext} variant="primary" size="large" style={styles.nextButton} />
          <Button title="Back" onPress={() => router.back()} variant="outline" size="small" style={styles.backButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  levelCard: {
    width: "48%", // Para grid de 2 columnas
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelCardSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  levelTitleContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d1d1f",
  },
  levelSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  levelDescription: {
    fontSize: 13,
    color: "#1d1d1f",
    marginBottom: 4,
  },
  levelDetails: {
    fontSize: 11,
    color: "#8e8e93",
    fontStyle: "italic",
  },
  selectedPreview: {
    backgroundColor: "#E8F4FF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 4,
  },
  previewText: {
    fontSize: 14,
    color: "#1d1d1f",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E5EA",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },

  levelBadge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelBadgeText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  buttonsContainer: {
    marginTop: 32,
  },
  nextButton: {
    marginBottom: 12,
  },
  backButton: {
    alignSelf: "center",
  },
});
