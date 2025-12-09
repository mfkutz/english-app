// # Paso 6: Notificaciones
import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";
import { useWizard } from "../../hooks/useWizard";

export default function WizardNotificationsScreen() {
  const router = useRouter();
  const { data } = useWizardStore();

  const { completeWizard, isLoading } = useWizard();

  const [wantsNotifications, setWantsNotifications] = useState(data.wantsNotifications);
  const [wantsDailyReminder, setWantsDailyReminder] = useState(data.wantsDailyReminder);
  const [reminderTime, setReminderTime] = useState(data.reminderTime);

  const handleComplete = async () => {
    try {
      const finalData = {
        ...data,
        wantsNotifications,
        wantsDailyReminder,
        reminderTime,
      };

      await completeWizard(finalData);

      // Navegar a tabs
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing wizard:", error);
      Alert.alert("Error", "Failed to complete setup. Please try again.");
    }
  };

  const times = ["08:00", "12:00", "17:00", "20:00", "22:00"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress - COMPLETADO */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "100%" }]} />
          </View>
          <Text style={styles.progressText}>Step 6 of 6</Text>
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Almost done! 🎉</Text>
          <Text style={styles.subtitle}>Set up notifications to stay on track</Text>
        </View>

        {/* Main option */}
        <View style={styles.mainOption}>
          <TouchableOpacity
            style={[styles.notificationToggle, wantsNotifications && styles.notificationToggleActive]}
            onPress={() => setWantsNotifications(!wantsNotifications)}
          >
            <View style={styles.toggleContent}>
              <MaterialCommunityIcons name="bell" size={32} color={wantsNotifications ? "#007AFF" : "#8E8E93"} />
              <View style={styles.toggleTexts}>
                <Text style={styles.toggleTitle}>Enable Notifications</Text>
                <Text style={styles.toggleDescription}>Get reminders and progress updates</Text>
              </View>
              <View style={[styles.toggleSwitch, wantsNotifications && styles.toggleSwitchActive]}>
                <View style={[styles.toggleKnob, wantsNotifications && styles.toggleKnobActive]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily reminder - Solo si notificaciones activas */}
        {wantsNotifications && (
          <View style={styles.dailyReminder}>
            <Text style={styles.sectionTitle}>Daily Reminder</Text>
            <TouchableOpacity
              style={[styles.reminderToggle, wantsDailyReminder && styles.reminderToggleActive]}
              onPress={() => setWantsDailyReminder(!wantsDailyReminder)}
            >
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color={wantsDailyReminder ? "#007AFF" : "#8E8E93"}
              />
              <Text style={styles.reminderText}>Practice reminder</Text>
              <View style={[styles.reminderSwitch, wantsDailyReminder && styles.reminderSwitchActive]}>
                <View style={[styles.reminderKnob, wantsDailyReminder && styles.reminderKnobActive]} />
              </View>
            </TouchableOpacity>

            {/* Time selection */}
            {wantsDailyReminder && (
              <View style={styles.timeSelection}>
                <Text style={styles.timeTitle}>Reminder time</Text>
                <View style={styles.timeOptions}>
                  {times.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeOption, reminderTime === time && styles.timeOptionSelected]}
                      onPress={() => setReminderTime(time)}
                    >
                      <Text style={[styles.timeOptionText, reminderTime === time && styles.timeOptionTextSelected]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Features summary */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Your setup includes:</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Personalized lessons</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Progress tracking</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>AI conversation practice</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Pronunciation feedback</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Complete Setup"
            onPress={handleComplete}
            variant="primary"
            size="large"
            loading={isLoading}
            disabled={isLoading}
            style={styles.completeButton}
          />

          <Button title="Back" onPress={() => router.back()} variant="outline" size="small" style={styles.backButton} />
        </View>

        {/* Skip notifications */}
        <TouchableOpacity style={styles.skipContainer} onPress={handleComplete} disabled={isLoading}>
          <Text style={styles.skipText}>Skip notifications for now</Text>
        </TouchableOpacity>
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
  mainOption: {
    marginBottom: 32,
  },
  notificationToggle: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 16,
    padding: 20,
  },
  notificationToggleActive: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  toggleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleTexts: {
    flex: 1,
    marginLeft: 16,
  },
  toggleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: "#666",
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E5EA",
    padding: 2,
    justifyContent: "center",
  },
  toggleSwitchActive: {
    backgroundColor: "#007AFF",
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 0 }],
  },
  toggleKnobActive: {
    transform: [{ translateX: 22 }],
  },
  dailyReminder: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  reminderToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reminderToggleActive: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  reminderText: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
    marginLeft: 12,
  },
  reminderSwitch: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
    padding: 2,
    justifyContent: "center",
  },
  reminderSwitchActive: {
    backgroundColor: "#007AFF",
  },
  reminderKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 0 }],
  },
  reminderKnobActive: {
    transform: [{ translateX: 16 }],
  },
  timeSelection: {
    marginTop: 8,
  },
  timeTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  timeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeOption: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timeOptionSelected: {
    backgroundColor: "#F0F7FF",
    borderColor: "#007AFF",
  },
  timeOptionText: {
    fontSize: 14,
    color: "#666",
  },
  timeOptionTextSelected: {
    color: "#007AFF",
    fontWeight: "500",
  },
  features: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  buttonsContainer: {
    marginBottom: 24,
  },
  completeButton: {
    marginBottom: 12,
  },
  backButton: {
    alignSelf: "center",
  },
  skipContainer: {
    alignItems: "center",
  },
  skipText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
});
