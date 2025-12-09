import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FillBlankExerciseProps {
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

export function FillBlankExercise({
  exercise,
  onSelect,
  selectedOption,
  isChecking,
  isCorrect,
  showExplanation,
  correctAnswer: correctAnswerFromProps,
}: FillBlankExerciseProps) {
  // Extraer la parte del blank de la pregunta
  const getQuestionParts = () => {
    const question = exercise.question;
    const blankMatch = question.match(/_{2,}/);

    if (!blankMatch) return { before: question, after: "" };

    const blankIndex = question.indexOf(blankMatch[0]);
    return {
      before: question.substring(0, blankIndex),
      after: question.substring(blankIndex + blankMatch[0].length),
    };
  };

  const questionParts = getQuestionParts();

  return (
    <View className="bg-white rounded-3xl p-5 shadow-xl shadow-black/8">
      {/* Question */}
      <View className="mb-8">
        <View className="flex-row flex-wrap items-center justify-center mb-4">
          <Text className="text-2xl font-bold text-gray-900 leading-9">{questionParts.before}</Text>

          {/* Blank con animación */}
          <View
            className={`
              min-w-30 h-13 bg-gray-100 rounded-2xl mx-2 justify-center items-center px-4
              shadow-sm shadow-black/5
              ${selectedOption ? "bg-white border-2 border-blue-500" : ""}
              ${selectedOption && isCorrect !== null && isCorrect ? "bg-green-50 border-green-500 shadow-green-500/20 shadow-md" : ""}
              ${selectedOption && isCorrect !== null && !isCorrect ? "bg-red-50 border-red-500 shadow-red-500/20 shadow-md" : ""}
            `}
          >
            {selectedOption ? (
              <Text
                className={`
                  text-xl font-bold
                  ${isCorrect !== null && isCorrect ? "text-green-800" : ""}
                  ${isCorrect !== null && !isCorrect ? "text-red-800" : ""}
                  ${!isCorrect ? "text-gray-900" : ""}
                `}
              >
                {selectedOption}
              </Text>
            ) : (
              <View className="flex-row items-center">
                <View className="w-20 h-1 bg-gray-400 rounded" />
              </View>
            )}
          </View>

          <Text className="text-2xl font-bold text-gray-900 leading-9">{questionParts.after}</Text>
        </View>

        {exercise.translation && (
          <View className="flex-row items-center justify-center bg-gray-100 px-4 py-2.5 rounded-xl self-center">
            <MaterialCommunityIcons name="translate" size={16} color="#8E8E93" />
            <Text className="text-sm text-gray-500 italic ml-2">{exercise.translation}</Text>
          </View>
        )}
      </View>

      {/* Options */}
      <View className="mt-2">
        <Text className="text-sm font-semibold text-gray-500 mb-4 text-center">Select the correct word</Text>
        <View className="flex-row flex-wrap justify-between gap-3">
          {exercise.options?.map((option, index) => {
            const isSelected = selectedOption === option;
            const isRightAnswer = option === correctAnswerFromProps;
            const showAsCorrect = showExplanation && isRightAnswer && !isSelected;

            // Determinar clases de la opción
            let optionClasses =
              "flex-1 min-w-[48%] bg-gray-100 px-4.5 py-4.5 rounded-2xl flex-row justify-between items-center border-2 border-transparent shadow-sm shadow-black/5";
            let textClasses = "text-lg font-semibold flex-1";
            let icon = null;

            if (isSelected && isChecking) {
              optionClasses += " bg-white border-blue-500 border-dashed";
              textClasses += " text-blue-500";
            } else if (isSelected && isCorrect !== null) {
              if (isCorrect) {
                optionClasses += " bg-green-50 border-green-500 shadow-green-500/20 shadow-md";
                textClasses += " text-green-800";
                icon = <MaterialCommunityIcons name="check-circle" size={24} color="#34C759" />;
              } else {
                optionClasses += " bg-red-50 border-red-500 shadow-red-500/20 shadow-md";
                textClasses += " text-red-800";
                icon = <MaterialCommunityIcons name="close-circle" size={24} color="#FF3B30" />;
              }
            } else if (showAsCorrect) {
              optionClasses += " bg-green-50 border-green-500";
              textClasses += " text-green-800";
              icon = <MaterialCommunityIcons name="check-circle-outline" size={24} color="#34C759" />;
            } else if (isSelected) {
              optionClasses += " bg-white border-blue-500 shadow-blue-500/20 shadow-md";
              textClasses += " text-blue-500";
            } else {
              textClasses += " text-gray-900";
            }

            return (
              <TouchableOpacity
                key={index}
                className={optionClasses}
                onPress={() => onSelect(option)}
                disabled={isCorrect !== null || isChecking}
                activeOpacity={0.8}
              >
                <Text className={textClasses}>{option}</Text>
                {icon}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
