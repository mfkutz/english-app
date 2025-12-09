// # Paso 4: Objetivos
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>What are your goals?</Text>
          <Text style={styles.subtitle}>Select all that apply (you can change this later)</Text>
        </View>

        {/* Goals grid */}
        <View style={styles.goalsGrid}>
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                onPress={() => toggleGoal(goal.id)}
              >
                <View style={[styles.goalIconContainer, { backgroundColor: goal.color + "20" }]}>
                  <MaterialCommunityIcons name={goal.icon as any} size={24} color={goal.color} />
                </View>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDescription}>{goal.description}</Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#007AFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected count */}
        <View style={styles.selectedCount}>
          <Text style={styles.selectedCountText}>
            {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""} selected
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button title="Next" onPress={handleNext} variant="primary" size="large" style={styles.nextButton} />

          <Button title="Skip" onPress={handleNext} variant="outline" size="small" style={styles.skipButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
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
    marginBottom: 32,
    paddingHorizontal: 8,
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
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  goalCard: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  goalCardSelected: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  goalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  checkmark: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  selectedCount: {
    alignItems: "center",
    marginBottom: 24,
  },
  selectedCountText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  buttonsContainer: {
    marginTop: 16,
  },
  nextButton: {
    marginBottom: 12,
  },
  skipButton: {
    alignSelf: "center",
  },
});
