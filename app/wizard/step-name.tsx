// # Paso 2: Nombre
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";

export default function WizardNameScreen() {
  const router = useRouter();
  const { data, updateData } = useWizardStore();
  const [name, setName] = useState(data.name);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);
    try {
      updateData({ name: name.trim() });
      router.push("/wizard/step-level");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "33%" }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.subtitle}>We'll use this to personalize your experience</Text>
        </View>

        {/* Input */}
        <View style={styles.form}>
          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
            maxLength={50}
          />

          <Text style={styles.hint}>This is how we'll address you in the app</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading || !name.trim()}
            style={styles.nextButton}
          />
        </View>

        {/* Navigation hint */}
        <View style={styles.navigationHint}>
          <MaterialCommunityIcons name="arrow-left" size={16} color="#666" />
          <Text style={styles.navigationText} onPress={() => router.back()}>
            Back to language selection
          </Text>
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
  form: {
    flex: 1,
    marginBottom: 32,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
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
  navigationHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  navigationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    textDecorationLine: "underline",
  },
});
