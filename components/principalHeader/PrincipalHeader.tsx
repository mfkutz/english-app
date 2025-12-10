// // components/LevelHeader.tsx
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// interface LevelHeaderProps {
//   selectedLevel: string;
//   stats: {
//     completed: number;
//     total: number;
//     chapters: number;
//   };
//   onLevelPress: () => void;
//   hasChapters?: boolean;
// }

// const LevelHeader: React.FC<LevelHeaderProps> = ({ selectedLevel, stats, onLevelPress, hasChapters = true }) => {
//   return (
//     <View className="bg-amber-500 pt-14 pb-6 px-5">
//       {/* Título y selector de nivel */}
//       <View className="flex-row justify-between items-center mb-6">
//         <View className="flex-1">
//           <Text className="text-2xl font-bold text-white mb-1">Level {selectedLevel}</Text>
//           <Text className="text-amber-100">Master English step by step</Text>
//         </View>
//         <TouchableOpacity
//           className="w-10 h-10 rounded-full bg-amber-600 justify-center items-center active:bg-amber-700"
//           onPress={onLevelPress}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="chevron-down" size={20} color="#FFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Estadísticas - solo si hay capítulos */}
//       {hasChapters && (
//         <View className="bg-amber-600 rounded-xl p-4">
//           <View className="flex-row">
//             {/* Lessons Completed */}
//             <View className="flex-1 items-center">
//               <Text className="text-2xl font-bold text-white">{stats.completed}</Text>
//               <Text className="text-xs text-amber-200 mt-1">Lessons</Text>
//             </View>

//             {/* Separador */}
//             <View className="w-px bg-amber-400" />

//             {/* Total Lessons */}
//             <View className="flex-1 items-center">
//               <Text className="text-2xl font-bold text-white">{stats.total}</Text>
//               <Text className="text-xs text-amber-200 mt-1">Total</Text>
//             </View>

//             {/* Separador */}
//             <View className="w-px bg-amber-400" />

//             {/* Chapters */}
//             <View className="flex-1 items-center">
//               <Text className="text-2xl font-bold text-white">{stats.chapters}</Text>
//               <Text className="text-xs text-amber-200 mt-1">Chapters</Text>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default LevelHeader;

// components/LevelHeader.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface LevelHeaderProps {
  selectedLevel: string;
  streak?: number;
  experience?: number;
  onLevelPress: () => void;
}

const LevelHeader: React.FC<LevelHeaderProps> = ({ selectedLevel, streak = 0, experience = 209, onLevelPress }) => {
  return (
    <LinearGradient
      colors={["#F59E0B", "#D97706"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="pt-14 pb-6 px-5"
      style={{
        borderBottomLeftRadius: 50, // equivalente a rounded-b-3xl
        borderBottomRightRadius: 50,
      }}
    >
      {/* Fila superior: Nivel y stats */}
      <View className="flex-row items-center justify-between mb-9">
        {/* Nivel a la izquierda */}
        <TouchableOpacity className="flex-row items-center" onPress={onLevelPress} activeOpacity={0.7}>
          <View className="bg-white/20 px-4 py-2 rounded-xl">
            <Text className="text-2xl font-bold text-white">Level {selectedLevel}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#FFF" className="ml-2 opacity-90" />
        </TouchableOpacity>

        {/* Stats a la derecha */}
        <View className="flex-row items-center space-x-2 gap-2">
          {/* Streak */}
          <View className="flex-row items-center bg-white/10 px-3 py-1.5 rounded-lg">
            <Ionicons name="flame" size={23} color={streak > 0 ? "#FFF" : "rgba(255,255,255,0.7)"} />
            <Text className="text-white font-bold ml-1.5 text-xl">{streak}</Text>
          </View>

          {/* Experience */}
          <View className="flex-row items-center bg-white/10 px-3 py-1.5 rounded-lg">
            <Ionicons name="star" size={23} color="#FFD700" />
            <Text className="text-white font-bold text-xl ml-1.5">{experience}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LevelHeader;
