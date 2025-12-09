// # Paso 5: Tiempo DIARIO
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "83%" }]} />
          </View>
          <Text style={styles.progressText}>Step 5 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Daily practice time</Text>
          <Text style={styles.subtitle}>How much time can you practice each day?</Text>
        </View>

        {/* Time display */}
        <View style={styles.timeDisplay}>
          <Text style={styles.timeValue}>{dailyMinutes}</Text>
          <Text style={styles.timeLabel}>minutes per day</Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={60}
            step={5}
            value={dailyMinutes}
            onValueChange={setDailyMinutes}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E5E5EA"
            thumbTintColor="#007AFF"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>5 min</Text>
            <Text style={styles.sliderLabel}>60 min</Text>
          </View>
        </View>

        {/* Quick options */}
        <View style={styles.quickOptions}>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option.minutes}
              style={[styles.quickOption, dailyMinutes === option.minutes && styles.quickOptionSelected]}
              onPress={() => setDailyMinutes(option.minutes)}
            >
              <Text
                style={[styles.quickOptionLabel, dailyMinutes === option.minutes && styles.quickOptionLabelSelected]}
              >
                {option.label}
              </Text>
              <Text style={styles.quickOptionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendation */}
        <View style={styles.recommendation}>
          <MaterialCommunityIcons name="lightbulb" size={20} color="#FF9500" />
          <Text style={styles.recommendationText}>We recommend at least 10 minutes daily for consistent progress</Text>
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
    backgroundColor: "#FFFFFF",
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
  timeDisplay: {
    alignItems: "center",
    marginBottom: 40,
  },
  timeValue: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#007AFF",
  },
  timeLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: -8,
  },
  sliderContainer: {
    marginBottom: 40,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#8E8E93",
  },
  quickOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  quickOption: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  quickOptionSelected: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  quickOptionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  quickOptionLabelSelected: {
    color: "#007AFF",
  },
  quickOptionDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  recommendation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: "#8A6A00",
    marginLeft: 12,
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  nextButton: {
    marginBottom: 12,
  },
  backButton: {
    alignSelf: "center",
  },
});
