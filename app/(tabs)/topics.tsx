import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopicsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold mb-2">Topics</Text>
          <Text className="text-base text-gray-600">Coming soon...:P</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
