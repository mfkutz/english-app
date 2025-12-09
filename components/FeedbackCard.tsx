import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, Image, Text, View } from "react-native";

interface FeedbackCardProps {
  isCorrect: boolean;
  correctAnswer?: string;
  explanation?: string;
  fadeAnim: Animated.Value;
  exerciseType?: "fill-blank" | "multiple-choice" | "image-match" | "translation";
  correctImageUrl?: string;
}

//THIS COMPONENT SHOW THE FEEDBACK CARD WITH THE CORRECT ANSWER, THE EXPLANATION AND THE IMAGE MATCH
export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  isCorrect,
  correctAnswer,
  explanation,
  fadeAnim,
  exerciseType = "fill-blank",
  correctImageUrl,
}) => {
  const getFeedbackMessage = () => {
    if (isCorrect) {
      return exerciseType === "image-match" ? "Great eye for detail!" : "Well done!";
    } else {
      return exerciseType === "image-match" ? "Let's look at the correct image" : "Here's the right answer";
    }
  };

  const renderCorrectAnswer = () => {
    if (isCorrect) return null;

    if (exerciseType === "image-match" && correctImageUrl) {
      return (
        <View className="mt-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Correct image:</Text>
          <View className="bg-green-50 rounded-xl p-3 border border-green-500 items-center">
            <Image source={{ uri: correctImageUrl }} className="w-30 h-30 rounded-lg" resizeMode="cover" />
            <View className="absolute top-3 right-3 bg-white/90 rounded-xl p-1">
              <MaterialCommunityIcons name="check-circle" size={24} color="#34C759" />
            </View>
          </View>
        </View>
      );
    }

    if (exerciseType === "fill-blank" && correctAnswer) {
      return (
        <View className="mt-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Correct answer:</Text>
          <View className="bg-green-50 rounded-xl p-3 border border-green-500 flex-row items-center gap-2">
            <MaterialCommunityIcons name="check" size={16} color="#34C759" />
            <Text className="text-base font-semibold text-green-800 flex-1">{correctAnswer}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <Animated.View
      className="bg-white rounded-2xl mt-4 mb-2 overflow-hidden shadow-lg shadow-black/8 border border-gray-100"
      style={{
        opacity: fadeAnim,
        transform: [
          {
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          },
        ],
      }}
    >
      {/* HEADER COMPACTO */}
      <View className="flex-row items-center p-4 pb-3 bg-gray-50/50">
        <View
          className={`
            w-11 h-11 rounded-full justify-center items-center mr-3
            shadow-lg shadow-black/20
            ${isCorrect ? "bg-green-500 shadow-green-500/30" : "bg-red-500 shadow-red-500/30"}
          `}
        >
          <MaterialCommunityIcons name={isCorrect ? "check-circle" : "alert-circle"} size={24} color="#FFFFFF" />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-0.5">{isCorrect ? "Correct" : "Incorrect"}</Text>
          <Text className="text-sm text-gray-500 font-medium">{getFeedbackMessage()}</Text>
        </View>
      </View>

      {/* CONTENIDO COMPACTO */}
      <View className="p-4 pt-0">
        {/* RESPUESTA CORRECTA (solo si es incorrecto) */}
        {renderCorrectAnswer()}

        {/* EXPLICACIÓN (si existe, compacta) */}
        {explanation && (
          <View className="bg-amber-50 rounded-xl p-3 mt-3 flex-row items-start gap-2.5">
            <MaterialCommunityIcons name="lightbulb" size={16} color="#FF9500" />
            <Text className="text-sm text-gray-900 flex-1 leading-5">{explanation}</Text>
          </View>
        )}

        {/* LÍNEA DECORATIVA INFERIOR */}
        <View
          className={`
            h-1 rounded-sm mt-4 self-stretch
            ${isCorrect ? "bg-green-500" : "bg-red-500"}
          `}
        />
      </View>
    </Animated.View>
  );
};
