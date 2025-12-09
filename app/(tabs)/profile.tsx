import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const { user, isLoading, updateProfile } = useUserProfile();

  if (isLoading || !user) {
    return (
      <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-50 to-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const getLevelColor = (level: number) => {
    if (level >= 30) return "#EF4444"; // Rojo - Maestro
    if (level >= 20) return "#8B5CF6"; // Violeta - Avanzado
    if (level >= 10) return "#3B82F6"; // Azul - Intermedio
    return "#10B981"; // Verde - Principiante
  };

  const levelColor = getLevelColor(user.level || 1);

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 h-64"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {/* Header con gradiente */}
        <View className="pt-12 pb-8 px-6">
          <View className="items-center">
            {/* Avatar con anillo de nivel */}
            <View className="relative mb-4">
              <LinearGradient
                colors={["#F59E0B", "#FBBF24"]}
                className="w-32 h-32 rounded-full justify-center items-center"
              >
                <Text className="text-4xl font-bold text-white">{user.name?.charAt(0)?.toUpperCase() || "U"}</Text>
              </LinearGradient>

              {/* Badge de nivel */}
              <View
                className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full justify-center items-center border-4 border-white"
                style={{ backgroundColor: levelColor }}
              >
                <Text className="text-white font-bold text-sm">Lvl {user.level}</Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">{user.name}</Text>
            <Text className="text-blue-100">{user.email}</Text>

            {/* Insignias */}
            <View className="flex-row mt-4 gap-2">
              {user.streak > 7 && (
                <View className="bg-amber-500/20 px-3 py-1.5 rounded-full flex-row items-center">
                  <MaterialCommunityIcons name="fire" size={14} color="#F59E0B" />
                  <Text className="text-amber-100 text-xs font-semibold ml-1">{user.streak} day streak</Text>
                </View>
              )}

              {user.experience > 1000 && (
                <View className="bg-emerald-500/20 px-3 py-1.5 rounded-full flex-row items-center">
                  <MaterialCommunityIcons name="star" size={14} color="#10B981" />
                  <Text className="text-emerald-100 text-xs font-semibold ml-1">Top Learner</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Contenido principal */}
        <View className="px-5 -mt-6">
          {/* Stats Cards */}
          <View className="flex-row mb-6 gap-3">
            <LinearGradient
              colors={["#10B981", "#34D399"]}
              className="flex-1 rounded-2xl p-4"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View className="items-center">
                <MaterialCommunityIcons name="trophy" size={24} color="white" />
                <Text className="text-2xl font-bold text-white mt-2">{user.experience || 0}</Text>
                <Text className="text-blue-50 text-xs font-medium mt-1">Total XP</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#3B82F6", "#60A5FA"]}
              className="flex-1 rounded-2xl p-4"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View className="items-center">
                <MaterialCommunityIcons name="calendar-check" size={24} color="white" />
                <Text className="text-2xl font-bold text-white mt-2">{user.streak || 0}</Text>
                <Text className="text-blue-50 text-xs font-medium mt-1">Day Streak</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#8B5CF6", "#A78BFA"]}
              className="flex-1 rounded-2xl p-4"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View className="items-center">
                <MaterialCommunityIcons name="chart-line" size={24} color="white" />
                <Text className="text-2xl font-bold text-white mt-2">{user.level || 1}</Text>
                <Text className="text-blue-50 text-xs font-medium mt-1">Level</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Learning Settings Card */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-xl shadow-black/10">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-blue-100 rounded-xl justify-center items-center mr-3">
                <MaterialCommunityIcons name="cog" size={20} color="#3B82F6" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Learning Settings</Text>
            </View>

            <View className="space-y-5">
              <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="target" size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-3">Daily Goal</Text>
                </View>
                <View className="bg-blue-50 px-3 py-1.5 rounded-full">
                  <Text className="text-blue-600 font-bold">{user.dailyPracticeGoal || 15} min</Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="translate" size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-3">App Language</Text>
                </View>
                <Text className="text-gray-900 font-semibold">
                  {user.appLanguage === "es" ? "Spanish" : user.appLanguage === "pt" ? "Portuguese" : "English"}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name={user.wantsNotifications ? "bell" : "bell-off"}
                    size={20}
                    color="#6B7280"
                  />
                  <Text className="text-gray-700 font-medium ml-3">Notifications</Text>
                </View>
                <View className={`px-3 py-1.5 rounded-full ${user.wantsNotifications ? "bg-green-50" : "bg-gray-100"}`}>
                  <Text className={`font-bold ${user.wantsNotifications ? "text-green-600" : "text-gray-600"}`}>
                    {user.wantsNotifications ? "On" : "Off"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Progress Section */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-xl shadow-black/10">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-purple-100 rounded-xl justify-center items-center mr-3">
                <MaterialCommunityIcons name="chart-box" size={20} color="#8B5CF6" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Learning Progress</Text>
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-700 font-medium">Next Level Progress</Text>
                <Text className="text-gray-900 font-bold">
                  {Math.min((user.experience || 0) / 100, 100).toFixed(0)}%
                </Text>
              </View>
              <View className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min((user.experience || 0) / 100, 100)}%`,
                    backgroundColor: levelColor,
                  }}
                />
              </View>
            </View>

            <Text className="text-sm text-gray-500 text-center mt-2">
              Keep going! {1000 - (user.experience || 0)} XP to reach level {user.level + 1}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <Button
              title="Edit Profile"
              onPress={() => {
                /* Navegar a edit */
              }}
              variant="primary"
              size="large"
              icon="account-edit"
              className="w-full rounded-2xl"
            />

            <Button
              title="Change Password"
              onPress={() => {
                /* Navegar a change password */
              }}
              variant="outline"
              size="large"
              icon="key"
              className="w-full rounded-2xl"
            />

            <Button
              title="Logout"
              onPress={logout}
              variant="secondary"
              size="large"
              icon="logout"
              className="w-full rounded-2xl bg-red-50 border-red-200"
              textClassName="text-red-600"
            />
          </View>

          {/* Footer */}
          <View className="mt-8 pt-6 border-t border-gray-200">
            <View className="flex-row items-center justify-center">
              <MaterialCommunityIcons name="shield-check" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-2">Account created • Member since 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
