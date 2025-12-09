import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticeScreen() {
  const practiceCategories = [
    {
      id: 1,
      title: "Conversation",
      subtitle: "Practice with AI",
      icon: "message-text",
      color: "#3B82F6",
      gradient: ["#3B82F6", "#60A5FA"],
      comingSoon: false,
    },
    {
      id: 2,
      title: "Pronunciation",
      subtitle: "Improve accent",
      icon: "microphone",
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#A78BFA"],
      comingSoon: true,
    },
    {
      id: 3,
      title: "Listening",
      subtitle: "Audio exercises",
      icon: "headphones",
      color: "#10B981",
      gradient: ["#10B981", "#34D399"],
      comingSoon: true,
    },
    {
      id: 4,
      title: "Vocabulary",
      subtitle: "Word challenges",
      icon: "book-alphabet",
      color: "#F59E0B",
      gradient: ["#F59E0B", "#FBBF24"],
      comingSoon: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 via-white to-emerald-50">
      <View className="flex-1 p-6">
        {/* Header con gradiente */}
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          className="rounded-3xl p-8 mb-8"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-14 h-14 bg-white/20 rounded-2xl justify-center items-center mr-4">
              <MaterialCommunityIcons name="brain" size={32} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-3xl font-bold text-white">Practice Hub</Text>
              <Text className="text-blue-100 mt-1">Master English through interactive exercises</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white/10 rounded-2xl p-4 mt-4">
            <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FBBF24" />
            <Text className="text-white font-medium ml-2 flex-1">
              Complete 5 exercises daily to maintain your streak
            </Text>
            <View className="bg-amber-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">5/5</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Categories Grid */}
        <Text className="text-2xl font-bold text-gray-900 mb-6">Practice Categories</Text>

        <View className="flex-row flex-wrap -mx-2 mb-8">
          {practiceCategories.map((category) => (
            <View key={category.id} className="w-1/2 px-2 mb-4">
              <TouchableOpacity
                className="bg-white rounded-3xl p-5 shadow-xl shadow-black/10 border border-gray-100 active:scale-95"
                activeOpacity={0.9}
                disabled={category.comingSoon}
              >
                <LinearGradient
                  colors={category.gradient}
                  className="w-16 h-16 rounded-2xl justify-center items-center mb-4"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <MaterialCommunityIcons name={category.icon as any} size={28} color="white" />
                </LinearGradient>

                <Text className="text-lg font-bold text-gray-900 mb-1">{category.title}</Text>
                <Text className="text-sm text-gray-600 mb-3">{category.subtitle}</Text>

                {category.comingSoon ? (
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 px-3 py-1.5 rounded-full">
                      <Text className="text-gray-600 text-xs font-semibold">Coming Soon</Text>
                    </View>
                  </View>
                ) : (
                  <View className="flex-row items-center justify-between">
                    <Text className="text-blue-600 text-sm font-semibold">Start Practice</Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#3B82F6" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Quick Stats */}
        <View className="bg-white rounded-3xl p-6 mb-8 shadow-xl shadow-black/10">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-purple-100 rounded-xl justify-center items-center mr-3">
              <MaterialCommunityIcons name="chart-line" size={20} color="#8B5CF6" />
            </View>
            <Text className="text-xl font-bold text-gray-900">Your Practice Stats</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-3xl font-bold text-gray-900">24</Text>
              <Text className="text-gray-600 text-sm mt-1">Hours</Text>
            </View>

            <View className="h-12 w-px bg-gray-200" />

            <View className="items-center">
              <Text className="text-3xl font-bold text-gray-900">156</Text>
              <Text className="text-gray-600 text-sm mt-1">Exercises</Text>
            </View>

            <View className="h-12 w-px bg-gray-200" />

            <View className="items-center">
              <Text className="text-3xl font-bold text-gray-900">87%</Text>
              <Text className="text-gray-600 text-sm mt-1">Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Featured Practice */}
        <View className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-amber-500 rounded-2xl justify-center items-center mr-4">
              <MaterialCommunityIcons name="crown" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-amber-900">Featured Practice</Text>
              <Text className="text-amber-700">Daily conversation challenge</Text>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-4">
            <Text className="text-gray-900 font-medium mb-2">"Ordering food at a restaurant"</Text>
            <Text className="text-gray-600 text-sm mb-4">
              Practice realistic conversation scenarios with instant feedback
            </Text>

            <TouchableOpacity className="bg-amber-500 py-3 rounded-xl">
              <Text className="text-white font-bold text-center">Start Free Trial</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center">
            <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
            <Text className="text-amber-800 text-sm ml-2">Recommended based on your learning pattern</Text>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8 pt-6 border-t border-gray-200">
          <View className="flex-row items-center justify-center">
            <MaterialCommunityIcons name="update" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-2">Practice updated daily • New content every week</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
