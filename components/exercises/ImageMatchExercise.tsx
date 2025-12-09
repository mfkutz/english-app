import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ImageMatchExerciseProps {
  exercise: {
    question: string;
    options: string[];
    correctAnswer: string;
    translation?: string;
    explanation?: string;
  };
  onSelect: (option: string) => void;
  selectedOption: string | null;
  isChecking: boolean;
  isCorrect: boolean | null;
  showExplanation: boolean;
  correctAnswer: string | null;
}

export function ImageMatchExercise({
  exercise,
  onSelect,
  selectedOption,
  isChecking,
  isCorrect,
  showExplanation,
  correctAnswer: correctAnswerFromProps,
}: ImageMatchExerciseProps) {
  const getCardStyle = (imageUrl: string) => {
    const isSelected = selectedOption === imageUrl;
    const isRightAnswer = imageUrl === correctAnswerFromProps;
    const showAsCorrect = showExplanation && isRightAnswer && !isSelected;

    let baseClasses = "flex-1 aspect-square rounded-2xl overflow-hidden relative bg-gray-100 border-2";

    if (isSelected && isChecking) {
      return `${baseClasses} border-blue-500 border-dashed bg-white`;
    }
    if (isSelected && isCorrect !== null) {
      return isCorrect ? `${baseClasses} border-green-500 bg-white` : `${baseClasses} border-red-500 bg-white`;
    }
    if (showAsCorrect) {
      return `${baseClasses} border-green-500 bg-white`;
    }
    if (isSelected) {
      return `${baseClasses} border-blue-500 bg-white`;
    }
    return `${baseClasses} border-transparent`;
  };

  const getCardContent = (imageUrl: string) => {
    const isSelected = selectedOption === imageUrl;
    const isRightAnswer = imageUrl === correctAnswerFromProps;
    const showAsCorrect = showExplanation && isRightAnswer && !isSelected;

    return (
      <>
        {/* Imagen */}
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />

        {/* Overlay de selección */}
        {isSelected && isCorrect === null && !isChecking && <View className="absolute inset-0 bg-blue-500/10" />}

        {/* Feedback overlay */}
        {(isSelected || showAsCorrect) && (
          <View className="absolute inset-0 bg-white/85 justify-center items-center">
            {isSelected && isChecking ? (
              <View className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent" />
            ) : isSelected && isCorrect !== null ? (
              <MaterialCommunityIcons
                name={isCorrect ? "check-circle" : "close-circle"}
                size={32}
                color={isCorrect ? "#34C759" : "#FF3B30"}
              />
            ) : showAsCorrect ? (
              <MaterialCommunityIcons name="check-circle" size={32} color="#34C759" />
            ) : null}
          </View>
        )}
      </>
    );
  };

  return (
    <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
      {/* Pregunta Minimalista */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-900 text-center mb-2 leading-6">{exercise.question}</Text>
        {exercise.translation && (
          <Text className="text-sm text-gray-500 text-center italic">{exercise.translation}</Text>
        )}
      </View>

      {/* Grid de imágenes 2x2 FIJO */}
      <View className="gap-3">
        {/* Fila 1 */}
        <View className="flex-row justify-between gap-3">
          {exercise.options.slice(0, 2).map((imageUrl, index) => (
            <TouchableOpacity
              key={`image-${index}`}
              className={getCardStyle(imageUrl)}
              onPress={() => onSelect(imageUrl)}
              disabled={isCorrect !== null || isChecking}
              activeOpacity={0.7}
            >
              {getCardContent(imageUrl)}
            </TouchableOpacity>
          ))}
        </View>

        {/* Fila 2 (si hay más de 2 imágenes) */}
        {exercise.options.length > 2 && (
          <View className="flex-row justify-between gap-3">
            {exercise.options.slice(2, 4).map((imageUrl, index) => (
              <TouchableOpacity
                key={`image-${index + 2}`}
                className={getCardStyle(imageUrl)}
                onPress={() => onSelect(imageUrl)}
                disabled={isCorrect !== null || isChecking}
                activeOpacity={0.7}
              >
                {getCardContent(imageUrl)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
