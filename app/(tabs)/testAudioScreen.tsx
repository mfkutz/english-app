import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestAudioScreen() {
  // 1. PRIMERO: Asset local (como tu ejemplo que SÍ funciona)
  const localAudio = require("../../assets/dog.mp3");
  const localPlayer = useAudioPlayer(localAudio);

  // 2. SEGUNDO: URL Firebase (misma que venimos usando)
  const firebaseUrl =
    "https://firebasestorage.googleapis.com/v0/b/englishapp-e2cb3.firebasestorage.app/o/audios%2Fapple.mp3?alt=media";
  const remotePlayer = useAudioPlayer(firebaseUrl);

  const playLocal = () => {
    console.log("Playing local audio...");
    localPlayer.play();
  };

  const replayLocal = () => {
    console.log("Replaying local audio...");
    localPlayer.seekTo?.(0);
    localPlayer.play();
  };

  const playRemote = () => {
    console.log("Playing remote audio...");
    remotePlayer.play();
  };

  const replayRemote = () => {
    console.log("Replaying remote audio...");
    remotePlayer.seekTo?.(0);
    remotePlayer.play();
  };

  const logPlayersState = () => {
    console.log("=== PLAYERS STATE ===");
    console.log("LOCAL player:", {
      playing: localPlayer.playing,
      isLoaded: localPlayer.isLoaded,
      duration: localPlayer.duration,
      currentTime: localPlayer.currentTime,
    });
    console.log("REMOTE player:", {
      playing: remotePlayer.playing,
      isLoaded: remotePlayer.isLoaded,
      duration: remotePlayer.duration,
      currentTime: remotePlayer.currentTime,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="flex-1 p-6">
        {/* Header con gradiente */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-blue-100 rounded-2xl justify-center items-center mb-4 shadow-lg shadow-blue-200">
            <MaterialCommunityIcons name="music-note" size={32} color="#3B82F6" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">🔊 Audio Tester</Text>
          <Text className="text-base text-gray-600 text-center">Compare local assets vs remote URLs</Text>
        </View>

        {/* Test 1: Asset local */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg shadow-black/5 border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-green-100 rounded-xl justify-center items-center mr-3">
              <Text className="text-lg font-bold text-green-600">1</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">Local Asset</Text>
              <Text className="text-sm text-gray-500">require('../../assets/audios/apple.mp3')</Text>
            </View>
            <View className={`w-3 h-3 rounded-full ${localPlayer.isLoaded ? "bg-green-500" : "bg-yellow-500"}`} />
          </View>

          {/* Botones de control */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              className="flex-1 bg-green-500 py-3.5 rounded-2xl flex-row justify-center items-center active:bg-green-600"
              onPress={playLocal}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="play" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Play Local</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-green-600 py-3.5 rounded-2xl flex-row justify-center items-center active:bg-green-700"
              onPress={replayLocal}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="replay" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Replay</Text>
            </TouchableOpacity>
          </View>

          {/* Status */}
          <View className="bg-gray-50 rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${localPlayer.playing ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <Text className="text-sm font-medium text-gray-700">
                Status: {localPlayer.playing ? "▶️ Playing" : "⏸️ Stopped"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name={localPlayer.isLoaded ? "check-circle" : "clock"}
                size={16}
                color={localPlayer.isLoaded ? "#10B981" : "#F59E0B"}
              />
              <Text className="text-sm text-gray-600 ml-2">
                Loaded: {localPlayer.isLoaded ? "✅ Ready" : "⏳ Loading..."}
              </Text>
            </View>
          </View>
        </View>

        {/* Test 2: URL Firebase */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg shadow-black/5 border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-blue-100 rounded-xl justify-center items-center mr-3">
              <Text className="text-lg font-bold text-blue-600">2</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">Firebase URL</Text>
              <Text className="text-sm text-gray-500 truncate" numberOfLines={1}>
                {firebaseUrl.substring(0, 40)}...
              </Text>
            </View>
            <View className={`w-3 h-3 rounded-full ${remotePlayer.isLoaded ? "bg-green-500" : "bg-yellow-500"}`} />
          </View>

          {/* Botones de control */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-3.5 rounded-2xl flex-row justify-center items-center active:bg-blue-600"
              onPress={playRemote}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="play" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Play Remote</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-blue-600 py-3.5 rounded-2xl flex-row justify-center items-center active:bg-blue-700"
              onPress={replayRemote}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="replay" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Replay</Text>
            </TouchableOpacity>
          </View>

          {/* Status */}
          <View className="bg-gray-50 rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${remotePlayer.playing ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`}
              />
              <Text className="text-sm font-medium text-gray-700">
                Status: {remotePlayer.playing ? "▶️ Playing" : "⏸️ Stopped"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name={remotePlayer.isLoaded ? "check-circle" : "clock"}
                size={16}
                color={remotePlayer.isLoaded ? "#10B981" : "#F59E0B"}
              />
              <Text className="text-sm text-gray-600 ml-2">
                Loaded: {remotePlayer.isLoaded ? "✅ Ready" : "⏳ Loading..."}
              </Text>
            </View>
          </View>
        </View>

        {/* Debug Panel */}
        <TouchableOpacity
          className="bg-amber-50 rounded-3xl p-6 mb-6 border border-amber-200 active:bg-amber-100"
          onPress={logPlayersState}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-amber-100 rounded-xl justify-center items-center mr-3">
              <MaterialCommunityIcons name="bug" size={24} color="#D97706" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-amber-900">Debug Console</Text>
              <Text className="text-sm text-amber-700">Tap to log player states</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-center bg-amber-100 py-3 rounded-xl">
            <MaterialCommunityIcons name="console" size={20} color="#D97706" />
            <Text className="text-amber-800 font-semibold ml-2">Log Players State</Text>
          </View>
        </TouchableOpacity>

        {/* Insights Panel */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-blue-500 rounded-xl justify-center items-center mr-3">
              <MaterialCommunityIcons name="lightbulb" size={24} color="white" />
            </View>
            <Text className="text-xl font-bold text-blue-900">Testing Insights</Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
              <Text className="text-blue-800 flex-1">
                <Text className="font-semibold">Both work:</Text> Issue is in our complex code
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
              <Text className="text-blue-800 flex-1">
                <Text className="font-semibold">Local works, remote fails:</Text> expo-audio has URL issues
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
              <Text className="text-blue-800 flex-1">
                <Text className="font-semibold">Documentation uses assets, not URLs</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-6 pt-4 border-t border-gray-200">
          <View className="flex-row items-center justify-center">
            <MaterialCommunityIcons name="test-tube" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-2">Audio Testing Interface • Built with NativeWind</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
