import { useWizardStore } from "@/store/useWizardStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/common/Button";
import { useWizard } from "../../hooks/useWizard";

export default function WizardNotificationsScreen() {
  const router = useRouter();
  const { data } = useWizardStore();
  const { completeWizard, isLoading } = useWizard();

  const [wantsNotifications, setWantsNotifications] = useState(data.wantsNotifications || true);
  const [wantsDailyReminder, setWantsDailyReminder] = useState(data.wantsDailyReminder || true);
  const [reminderTime, setReminderTime] = useState(data.reminderTime || "20:00");

  const handleComplete = async () => {
    try {
      const finalData = {
        ...data,
        wantsNotifications,
        wantsDailyReminder,
        reminderTime,
      };

      await completeWizard(finalData);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing wizard:", error);
      Alert.alert("Error", "Failed to complete setup. Please try again.");
    }
  };

  const times = ["08:00", "12:00", "17:00", "20:00", "22:00"];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow px-6 pt-10 pb-8" showsVerticalScrollIndicator={false}>
        {/* Progress - 100% Complete */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-medium text-green-600">Step 6 of 6 • Complete!</Text>
            <Text className="text-sm text-gray-500">Notifications</Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        {/* Header with celebration */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl justify-center items-center mb-6 shadow-lg shadow-green-500/20">
            <MaterialCommunityIcons name="party-popper" size={36} color="white" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 text-center mb-3">Almost there! 🎉</Text>

          <Text className="text-base text-gray-600 text-center max-w-xs">Set up notifications to stay motivated</Text>
        </View>

        {/* Main Notification Toggle */}
        <View className="mb-8">
          <TouchableOpacity
            className={`
              rounded-2xl p-5 border-2
              ${wantsNotifications ? "bg-blue-50 border-blue-500 shadow-sm" : "bg-gray-50 border-gray-300"}
              active:opacity-80
            `}
            onPress={() => setWantsNotifications(!wantsNotifications)}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View
                className={`
                w-12 h-12 rounded-xl justify-center items-center mr-4
                ${wantsNotifications ? "bg-blue-100" : "bg-gray-200"}
              `}
              >
                <MaterialCommunityIcons name="bell" size={24} color={wantsNotifications ? "#3B82F6" : "#9CA3AF"} />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 mb-1">Enable Notifications</Text>
                <Text className="text-sm text-gray-600">Get reminders, progress updates, and motivational tips</Text>
              </View>

              {/* Custom Toggle Switch */}
              <View
                className={`
                w-14 h-8 rounded-full relative
                ${wantsNotifications ? "bg-blue-500" : "bg-gray-300"}
              `}
              >
                <View
                  className={`
                  absolute top-1 w-6 h-6 rounded-full bg-white
                  ${wantsNotifications ? "right-1" : "left-1"}
                  shadow-sm
                `}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Reminder - Conditionally shown */}
        {wantsNotifications && (
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Daily Practice Reminder</Text>

            <TouchableOpacity
              className={`
                rounded-xl p-4 border
                ${wantsDailyReminder ? "bg-emerald-50 border-emerald-300" : "bg-gray-50 border-gray-200"}
                active:opacity-80
              `}
              onPress={() => setWantsDailyReminder(!wantsDailyReminder)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={22}
                  color={wantsDailyReminder ? "#10B981" : "#9CA3AF"}
                  className="mr-3"
                />

                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-900">Daily practice reminder</Text>
                  <Text className="text-sm text-gray-500 mt-1">Get notified to practice every day</Text>
                </View>

                {/* Smaller toggle */}
                <View
                  className={`
                  w-12 h-6 rounded-full relative
                  ${wantsDailyReminder ? "bg-emerald-500" : "bg-gray-300"}
                `}
                >
                  <View
                    className={`
                    absolute top-0.5 w-5 h-5 rounded-full bg-white
                    ${wantsDailyReminder ? "right-0.5" : "left-0.5"}
                    shadow-sm
                  `}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* Time Selection */}
            {wantsDailyReminder && (
              <View className="mt-6">
                <Text className="text-base font-medium text-gray-900 mb-3">Preferred reminder time</Text>

                <View className="flex-row flex-wrap gap-2">
                  {times.map((time) => {
                    const isSelected = reminderTime === time;
                    return (
                      <TouchableOpacity
                        key={time}
                        className={`
                          px-4 py-2.5 rounded-lg border
                          ${isSelected ? "bg-blue-500 border-blue-500" : "bg-gray-100 border-gray-300"}
                          active:opacity-80
                        `}
                        onPress={() => setReminderTime(time)}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`
                          text-sm font-medium
                          ${isSelected ? "text-white" : "text-gray-700"}
                        `}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text className="text-xs text-gray-500 mt-3">
                  You'll receive a friendly reminder at this time each day
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Features Summary */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-8 border border-blue-100">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Your setup is complete! 🚀</Text>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" className="mr-3" />
              <Text className="text-gray-700">Personalized learning path</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" className="mr-3" />
              <Text className="text-gray-700">AI conversation practice</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" className="mr-3" />
              <Text className="text-gray-700">Pronunciation feedback</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" className="mr-3" />
              <Text className="text-gray-700">Progress tracking & analytics</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4 mb-6">
          <Button
            title="Start Learning"
            onPress={handleComplete}
            variant="primary"
            size="large"
            loading={isLoading}
            disabled={isLoading}
            className="w-full rounded-2xl shadow-lg"
            icon="rocket-launch"
            iconPosition="right"
          />

          <Button
            title="Back"
            onPress={() => router.back()}
            variant="outline"
            size="large"
            className="w-full rounded-2xl"
            icon="arrow-left"
          />
        </View>

        {/* Skip option */}
        <TouchableOpacity
          className="items-center py-4"
          onPress={handleComplete}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <Text className="text-gray-600 font-medium">Skip notifications for now</Text>
          <Text className="text-xs text-gray-400 mt-1">You can enable them later in Settings</Text>
        </TouchableOpacity>

        {/* Final note */}
        <View className="mt-8 pt-6 border-t border-gray-200">
          <View className="flex-row items-center justify-center">
            <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
            <Text className="text-sm text-gray-500 ml-2">Get ready for your English learning journey!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
