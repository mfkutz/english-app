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
  const { user, isLoading } = useUserProfile();

  if (isLoading || !user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  const getLevelColor = (level: number) => {
    if (level >= 30) return "#EF4444";
    if (level >= 20) return "#8B5CF6";
    if (level >= 10) return "#3B82F6";
    return "#10B981";
  };

  const levelColor = getLevelColor(user.level || 1);
  const progressPercentage = Math.min((user.experience || 0) / 100, 100);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header con gradiente sutil */}
      <LinearGradient colors={["#3B82F6", "#60A5FA"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-40" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {/* Perfil header */}
        <View className="px-6 -mt-16">
          <View className="items-center">
            {/* Avatar */}
            <View className="relative mb-4">
              <View className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full justify-center items-center border-4 border-white shadow-lg">
                <Text className="text-3xl font-bold text-white">{user.name?.charAt(0)?.toUpperCase() || "U"}</Text>
              </View>

              {/* Badge de nivel */}
              <View
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full justify-center items-center border-2 border-white"
                style={{ backgroundColor: levelColor }}
              >
                <Text className="text-white font-bold text-xs">Lvl {user.level}</Text>
              </View>
            </View>

            {/* Información del usuario */}
            <Text className="text-2xl font-bold text-gray-900 mb-1">{user.name}</Text>
            <Text className="text-gray-600 mb-4">{user.email}</Text>

            {/* Stats simples */}
            <View className="flex-row gap-4 mb-6">
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">{user.experience || 0}</Text>
                <Text className="text-xs text-gray-500">XP</Text>
              </View>

              <View className="w-px bg-gray-300" />

              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">{user.streak || 0}</Text>
                <Text className="text-xs text-gray-500">Streak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Barra de progreso */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-semibold text-gray-800">Level Progress</Text>
              <Text className="font-bold text-blue-600">{progressPercentage.toFixed(0)}%</Text>
            </View>

            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: levelColor,
                }}
              />
            </View>

            <Text className="text-xs text-gray-500 mt-2 text-center">
              {1000 - (user.experience || 0)} XP to next level
            </Text>
          </View>
        </View>

        {/* Configuración */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Account Settings</Text>

          <View className="space-y-3">
            <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="target" size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3">Daily Goal</Text>
              </View>
              <Text className="font-semibold text-gray-900">{user.dailyPracticeGoal || 15} min</Text>
            </View>

            <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="translate" size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3">Language</Text>
              </View>
              <Text className="font-semibold text-gray-900">
                {user.appLanguage === "es" ? "Spanish" : user.appLanguage === "pt" ? "Portuguese" : "English"}
              </Text>
            </View>

            <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name={user.wantsNotifications ? "bell" : "bell-off"}
                  size={20}
                  color="#6B7280"
                />
                <Text className="text-gray-700 ml-3">Notifications</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${user.wantsNotifications ? "bg-green-100" : "bg-gray-200"}`}>
                <Text
                  className={`text-sm font-semibold ${user.wantsNotifications ? "text-green-700" : "text-gray-600"}`}
                >
                  {user.wantsNotifications ? "On" : "Off"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Acciones */}
        <View className="px-6 space-y-4">
          <Button
            title="Edit Profile"
            onPress={() => {
              /* Navegar a edit */
            }}
            variant="primary"
            size="large"
            icon="account-edit"
            className="w-full rounded-xl"
          />

          <Button
            title="Change Password"
            onPress={() => {
              /* Navegar a change password */
            }}
            variant="outline"
            size="large"
            icon="key"
            className="w-full rounded-xl"
          />

          {/* Botón de Logout claramente visible */}
          <View className="pt-4 border-t border-gray-200">
            <Button
              title="Log Out"
              onPress={logout}
              variant="outline"
              size="large"
              icon="logout"
              className="w-full rounded-xl border-red-200"
              textClassName="text-red-600"
            />

            <Text className="text-xs text-gray-500 text-center mt-3">
              You'll need to sign in again to access your account
            </Text>
          </View>
        </View>

        {/* Footer info */}
        <View className="px-6 mt-8 pt-6 border-t border-gray-200">
          <View className="items-center">
            <MaterialCommunityIcons name="shield-check" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 mt-2">Account secured • Member since 2024</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
