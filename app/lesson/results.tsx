// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Animated, Easing, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Button } from "../../components/common/Button";

// interface ResultsParams {
//   lessonId: string;
//   lessonTitle: string;
//   lessonNumber: string;
//   score: number;
//   correctAnswers: number;
//   totalExercises: number;
//   duration: number;
//   streak?: number;
//   totalMinutes?: number;
//   xpGained?: string;
//   isFirstCompletion?: string;
// }

// export default function LessonResultsScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams<ResultsParams>();

//   // Parse XP data
//   const xpData = params.xpGained ? JSON.parse(params.xpGained) : null;
//   const isFirstCompletion = params.isFirstCompletion === "true";
//   const xpGained = xpData?.total || 0;

//   // Datos
//   const score = parseInt(params.score as string) || 0;
//   const correctAnswers = parseInt(params.correctAnswers as string) || 0;
//   const totalExercises = parseInt(params.totalExercises as string) || 0;
//   const streak = parseInt(params.streak as string) || 0;

//   // Animaciones
//   const [progress] = useState(new Animated.Value(0));
//   const [xpScale] = useState(new Animated.Value(0));

//   useEffect(() => {
//     // Animación del progress bar
//     Animated.timing(progress, {
//       toValue: score / 100,
//       duration: 1200,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: false,
//     }).start();

//     // Animación del XP si se ganó
//     if (xpGained > 0 && isFirstCompletion) {
//       setTimeout(() => {
//         Animated.sequence([
//           Animated.spring(xpScale, {
//             toValue: 1.2,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//           Animated.spring(xpScale, {
//             toValue: 1,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }, 800);
//     }
//   }, []);

//   const progressWidth = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0%", "100%"],
//   });

//   const getScoreColor = () => {
//     if (score >= 90) return "#34C759";
//     if (score >= 70) return "#FF9500";
//     return "#FF3B30";
//   };

//   const getScoreEmoji = () => {
//     if (score === 100) return "🏆";
//     if (score >= 90) return "🎯";
//     if (score >= 70) return "👍";
//     return "📚";
//   };

//   const getScoreMessage = () => {
//     if (score === 100) return "Perfect!";
//     if (score >= 90) return "Excellent!";
//     if (score >= 70) return "Well Done!";
//     return "Good Effort";
//   };

//   const handleHome = () => {
//     router.replace("/(tabs)");
//   };

//   const handleRetry = () => {
//     router.replace(`/lesson/${params.lessonId}`);
//   };

//   const scoreColor = getScoreColor();

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Contenido principal - Sin ScrollView */}
//       <View className="flex-1 px-6 pt-6 pb-25">
//         {/* Header compacto */}
//         <View className="items-center mb-8">
//           <View className="bg-blue-50 px-3 py-1.5 rounded-xl mb-3">
//             <Text className="text-xs font-bold text-blue-500 tracking-wide">COMPLETE</Text>
//           </View>
//           <Text className="text-2xl font-extrabold text-gray-900 mb-1 text-center">{params.lessonNumber}</Text>
//           <Text className="text-base text-gray-500 text-center leading-5">{params.lessonTitle}</Text>
//         </View>

//         {/* Score Circle más pequeño */}
//         <View className="items-center mb-8">
//           <View
//             className={`
//               w-30 h-30 rounded-full justify-center items-center border-6
//               bg-white shadow-lg shadow-black/8
//             `}
//             style={{ borderColor: scoreColor }}
//           >
//             <Text className="text-4xl font-extrabold tracking-tight" style={{ color: scoreColor }}>
//               {score}%
//             </Text>
//             <Text className="absolute -bottom-2 text-lg bg-white px-2 py-0.5 rounded-lg shadow-sm shadow-black/4">
//               {getScoreEmoji()}
//             </Text>
//           </View>
//           <Text className="text-xl font-bold text-gray-900 text-center mt-4">{getScoreMessage()}</Text>
//         </View>

//         {/* Stats Cards compactas y profesionales */}
//         <View className="mb-8 gap-4">
//           {/* Correct Answers Card */}
//           <View className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm shadow-black/5 border-l-4 border-l-green-500">
//             <View className="flex-row items-center mb-3 gap-2">
//               <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
//               <Text className="text-base font-semibold text-gray-900">Correct</Text>
//             </View>
//             <View className="flex-row items-baseline mb-2">
//               <Text className="text-3xl font-extrabold text-gray-900">{correctAnswers}</Text>
//               <Text className="text-lg font-semibold text-gray-500 ml-1">/ {totalExercises}</Text>
//             </View>
//             <View className="h-1 bg-gray-100 rounded-full overflow-hidden">
//               <View
//                 className="h-full bg-green-500 rounded-full"
//                 style={{ width: `${(correctAnswers / totalExercises) * 100}%` }}
//               />
//             </View>
//           </View>

//           {/* Streak Card (si existe) */}
//           {streak > 0 && (
//             <View className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm shadow-black/5 border-l-4 border-l-amber-500">
//               <View className="flex-row items-center mb-3 gap-2">
//                 <MaterialCommunityIcons name="fire" size={20} color="#FF9500" />
//                 <Text className="text-base font-semibold text-gray-900">Streak</Text>
//               </View>
//               <Text className="text-3xl font-extrabold text-gray-900 mb-1">{streak}</Text>
//               <Text className="text-sm text-gray-500">days in a row</Text>
//             </View>
//           )}
//         </View>

//         {/* XP Section compacta */}
//         {isFirstCompletion && xpGained > 0 ? (
//           <View className="items-center mb-8">
//             <Animated.View
//               className="flex-row items-center bg-amber-50 px-5 py-3 rounded-full gap-2 mb-2 border border-amber-200"
//               style={{ transform: [{ scale: xpScale }] }}
//             >
//               <MaterialCommunityIcons name="star" size={24} color="#FFCC00" />
//               <Text className="text-2xl font-extrabold text-amber-900">+{xpGained} XP</Text>
//             </Animated.View>
//             <Text className="text-sm text-gray-500">Experience earned</Text>
//           </View>
//         ) : !isFirstCompletion ? (
//           <View className="flex-row items-center justify-center bg-gray-100 py-3 px-5 rounded-full mb-8 gap-2">
//             <MaterialCommunityIcons name="repeat" size={20} color="#8E8E93" />
//             <Text className="text-base font-semibold text-gray-500">Practice completed</Text>
//           </View>
//         ) : null}

//         {/* Progress Bar compacta */}
//         <View className="mb-6">
//           <View className="flex-row justify-between items-center mb-3">
//             <Text className="text-base font-semibold text-gray-900">Performance</Text>
//             <Text className="text-lg font-bold" style={{ color: scoreColor }}>
//               {score}%
//             </Text>
//           </View>
//           <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
//             <Animated.View
//               className="h-full rounded-full"
//               style={{
//                 width: progressWidth,
//                 backgroundColor: scoreColor,
//               }}
//             />
//           </View>
//         </View>

//         {/* Suggestion compacta */}
//         {score < 70 && (
//           <View className="flex-row items-center justify-center bg-amber-50 p-4 rounded-xl gap-2">
//             <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#FF9500" />
//             <Text className="text-sm text-gray-500 font-medium">Review explanations and try again</Text>
//           </View>
//         )}
//       </View>

//       {/* Action Buttons - Siempre visibles */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white pt-5 pb-7 px-6 border-t border-gray-100 gap-3">
//         <Button
//           title="Back to Home"
//           onPress={handleHome}
//           variant="primary"
//           size="large"
//           icon="home"
//           className="w-full rounded-2xl"
//         />

//         {score < 70 && (
//           <Button
//             title="Try Again"
//             onPress={handleRetry}
//             variant="outline"
//             size="large"
//             icon="refresh"
//             className="w-full rounded-2xl"
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";

interface ResultsParams {
  lessonId: string;
  lessonTitle: string;
  lessonNumber: string;
  score: number;
  correctAnswers: number;
  totalExercises: number;
  duration: number;
  streak?: number;
  totalMinutes?: number;
  xpGained?: string;
  isFirstCompletion?: string;
}

export default function LessonResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<ResultsParams>();

  // Parse XP data
  const xpData = params.xpGained ? JSON.parse(params.xpGained) : null;
  const isFirstCompletion = params.isFirstCompletion === "true";
  const xpGained = xpData?.total || 0;

  // Datos
  const score = parseInt(params.score as string) || 0;
  const correctAnswers = parseInt(params.correctAnswers as string) || 0;
  const totalExercises = parseInt(params.totalExercises as string) || 0;
  const streak = parseInt(params.streak as string) || 0;

  // Animaciones
  const [progress] = useState(new Animated.Value(0));
  const [scoreScale] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animación secuencial
    Animated.sequence([
      // Fade in general
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Animación del score
      Animated.spring(scoreScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      // Animación de la barra de progreso
      Animated.timing(progress, {
        toValue: score / 100,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // Solo usamos tonalidades de ámbar según el score
  const getAmberColor = () => {
    if (score >= 90) return "#F59E0B"; // Ámbar brillante (excelente)
    if (score >= 70) return "#D97706"; // Ámbar medio (bueno)
    return "#B45309"; // Ámbar oscuro (necesita mejorar)
  };

  const getAmberGradient = () => {
    if (score >= 90) return ["#F59E0B", "#FBBF24"]; // Brillante a medio
    if (score >= 70) return ["#D97706", "#F59E0B"]; // Medio a brillante
    return ["#B45309", "#D97706"]; // Oscuro a medio
  };

  const getAmberLightColor = () => {
    if (score >= 90) return "#FEF3C7"; // Ámbar claro brillante
    if (score >= 70) return "#FDE68A"; // Ámbar claro medio
    return "#FCD34D"; // Ámbar claro oscuro
  };

  const getScoreEmoji = () => {
    if (score === 100) return "🏆";
    if (score >= 90) return "🎯";
    if (score >= 70) return "✨";
    return "📚";
  };

  const getScoreMessage = () => {
    if (score === 100) return "Perfect Mastery!";
    if (score >= 90) return "Outstanding!";
    if (score >= 70) return "Well Done!";
    return "Keep Practicing!";
  };

  const handleHome = () => {
    router.replace("/(tabs)");
  };

  const handleRetry = () => {
    router.replace(`/lesson/${params.lessonId}`);
  };

  const amberColor = getAmberColor();
  const amberGradient = getAmberGradient();
  const amberLight = getAmberLightColor();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Animated.View className="flex-1" style={{ opacity: fadeAnim }}>
        {/* Header con gradiente ÁMBAR */}
        <LinearGradient
          colors={amberGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-10 pb-12 rounded-b-3xl"
        >
          {/* Título de la lección */}
          <View className="items-center mb-8">
            <View className="bg-white/20 px-4 py-2 rounded-full mb-4">
              <Text className="text-white font-bold text-sm">LESSON COMPLETE</Text>
            </View>
            <Text className="text-3xl font-bold text-white mb-2 text-center">{params.lessonNumber}</Text>
            <Text className="text-lg text-white/90 text-center">{params.lessonTitle}</Text>
          </View>

          {/* Score Circle con animación */}
          <View className="items-center">
            <Animated.View style={{ transform: [{ scale: scoreScale }] }} className="relative">
              {/* Círculo exterior decorativo */}
              <View className="absolute -inset-4 border-2 border-white/20 rounded-full" />

              {/* Círculo principal */}
              <View
                className="w-40 h-40 rounded-full bg-white shadow-2xl shadow-black/30 justify-center items-center border-4"
                style={{ borderColor: amberColor }}
              >
                <Text className="text-5xl font-black" style={{ color: amberColor }}>
                  {score}
                </Text>
                <Text className="text-xl font-bold text-gray-700">%</Text>

                {/* Emoji flotante */}
                <View className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-amber-200">
                  <Text className="text-2xl">{getScoreEmoji()}</Text>
                </View>
              </View>
            </Animated.View>

            {/* Mensaje del score */}
            <Text className="text-2xl font-bold text-white mt-6 mb-2">{getScoreMessage()}</Text>

            {/* XP ganado (si aplica) */}
            {isFirstCompletion && xpGained > 0 && (
              <Animated.View
                style={{ transform: [{ scale: scoreScale }] }}
                className="flex-row items-center bg-white/20 px-5 py-3 rounded-full mt-3"
              >
                <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
                <Text className="text-xl font-bold text-white ml-2">+{xpGained} XP</Text>
              </Animated.View>
            )}
          </View>
        </LinearGradient>

        {/* Contenido de estadísticas */}
        <View className="px-6 -mt-6">
          {/* Tarjeta de estadísticas principal */}
          <View className="bg-white rounded-2xl p-6 shadow-xl shadow-black/10 border border-amber-100">
            {/* Correct Answers */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-amber-100 justify-center items-center mr-3">
                    <MaterialCommunityIcons name="check-circle" size={24} color={amberColor} />
                  </View>
                  <View>
                    <Text className="text-lg font-bold text-gray-900">Correct Answers</Text>
                    <Text className="text-sm text-gray-500">Accuracy rate</Text>
                  </View>
                </View>
                <Text className="text-2xl font-bold text-gray-900">
                  {correctAnswers}
                  <Text className="text-gray-500">/{totalExercises}</Text>
                </Text>
              </View>

              {/* Barra de precisión */}
              <View className="h-2 bg-amber-100 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${(correctAnswers / totalExercises) * 100}%`,
                    backgroundColor: amberColor,
                  }}
                />
              </View>
            </View>

            {/* Streak (si existe) */}
            {streak > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-orange-100 justify-center items-center mr-3">
                      <MaterialCommunityIcons name="fire" size={24} color="#F97316" />
                    </View>
                    <View>
                      <Text className="text-lg font-bold text-gray-900">Learning Streak</Text>
                      <Text className="text-sm text-gray-500">Days in a row</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-3xl font-bold text-gray-900 mr-2">{streak}</Text>
                    <Text className="text-amber-600">🔥</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Progress Bar animada */}
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-bold text-gray-900">Performance Score</Text>
                <Text className="text-xl font-bold" style={{ color: amberColor }}>
                  {score}%
                </Text>
              </View>

              <View className="h-3 bg-amber-100 rounded-full overflow-hidden">
                <Animated.View
                  className="h-full rounded-full"
                  style={{
                    width: progressWidth,
                    backgroundColor: amberColor,
                  }}
                />
              </View>

              {/* Marcas en la barra */}
              <View className="flex-row justify-between mt-2">
                <Text className="text-xs text-amber-800">0%</Text>
                <Text className="text-xs text-amber-800">50%</Text>
                <Text className="text-xs text-amber-800">100%</Text>
              </View>
            </View>
          </View>

          {/* Mensaje de motivación */}
          <View className="mt-6 p-5 rounded-2xl border bg-amber-50 border-amber-200">
            <View className="flex-row items-start">
              <View className="w-12 h-12 rounded-full bg-amber-100 justify-center items-center mr-4 flex-shrink-0">
                <MaterialCommunityIcons name={score >= 70 ? "trophy" : "school"} size={24} color={amberColor} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">
                  {score >= 70 ? "Amazing Progress!" : "Room for Improvement"}
                </Text>
                <Text className="text-gray-700">
                  {score >= 70
                    ? "You're mastering these concepts quickly. Ready for the next challenge?"
                    : "Review the explanations and try again to reinforce your learning."}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Botones de acción */}
      <View className="px-6 pb-8 pt-4 bg-white border-t border-amber-100">
        <View className="gap-3">
          <Button
            title="Continue Learning"
            onPress={handleHome}
            variant="primary"
            size="large"
            icon="arrow-right"
            className="w-full rounded-xl"
            style={{ backgroundColor: amberColor }}
          />

          {score < 70 && (
            <Button
              title="Review & Try Again"
              onPress={handleRetry}
              variant="outline"
              size="large"
              icon="refresh"
              className="w-full rounded-xl"
              textStyle={{ color: amberColor }}
              style={{ borderColor: amberColor }}
            />
          )}
        </View>

        {/* Mensaje pequeño de feedback */}
        <Text className="text-center text-amber-700 text-sm mt-4">
          {score >= 70 ? "Your dedication is paying off! 🚀" : "Every mistake is a step toward mastery. 💪"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
