import { Button } from "@/components/common/Button";
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WizardLanguageScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [selectedLanguage, setSelectedLanguage] = useState<"es" | "en" | "pt">(data.appLanguage);

  const languages = [
    { id: "es", name: "Español", flag: "🇪🇸" },
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "pt", name: "Português", flag: "🇧🇷" },
  ];

  const handleNext = () => {
    updateData({ appLanguage: selectedLanguage });
    router.push("/wizard/step-name");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "16%" }]} />
          </View>
          <Text style={styles.progressText}>Step 1 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose your language</Text>
          <Text style={styles.subtitle}>Select the language you want to use in the app</Text>
        </View>

        {/* Language options */}
        <View style={styles.optionsContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[styles.optionCard, selectedLanguage === lang.id && styles.optionCardSelected]}
              onPress={() => setSelectedLanguage(lang.id as any)}
            >
              <Text style={styles.optionEmoji}>{lang.flag}</Text>
              <Text style={styles.optionText}>{lang.name}</Text>
              {selectedLanguage === lang.id && (
                <MaterialCommunityIcons name="check-circle" size={24} color="#007AFF" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <Button title="Next" onPress={handleNext} variant="primary" size="large" style={styles.nextButton} />
        </View>

        {/* Debug button */}
        <View style={styles.debugContainer}>
          <Button
            title="DEBUG: Clear Auth"
            onPress={async () => {
              await AsyncStorage.clear();
              Alert.alert("Cleared", "Auth data cleared");
            }}
            variant="secondary"
            size="small"
          />
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
  optionsContainer: {
    flex: 1,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionCardSelected: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  optionEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
  },
  checkIcon: {
    marginLeft: "auto",
  },
  buttonsContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
  nextButton: {
    marginBottom: 12,
  },
  skipButton: {
    alignSelf: "center",
  },
  debugContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
