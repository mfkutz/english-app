import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";

interface LessonHeaderProps {
  onClose: () => void;
  exerciseNumber: number;
  totalExercises: number;
}

//THIS COMPONENT SHOW THE PROGRESS BAR AND THE CLOSE BUTTON IN THE HEADER OF THE LESSON
export function LessonHeader({ onClose, exerciseNumber, totalExercises }: LessonHeaderProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pct = exerciseNumber / totalExercises;

    Animated.timing(progress, {
      toValue: pct,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [exerciseNumber, totalExercises]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="pt-1.5 pb-2.5 px-4 flex-row items-center justify-between">
      {/* Botón cerrar */}
      <TouchableOpacity
        className="w-10 h-10 justify-center items-center active:opacity-70"
        onPress={onClose}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="close" size={22} color="#333" />
      </TouchableOpacity>

      {/* Barra de progreso ultra compacta */}
      <View className="flex-1 h-1.5 mx-4 bg-gray-200 rounded-full overflow-hidden">
        <Animated.View className="h-full bg-green-500 rounded-full" style={{ width: widthInterpolated }} />
      </View>

      {/* Botón ayuda (placeholder) */}
      <TouchableOpacity className="w-10 h-10 justify-center items-center active:opacity-70" activeOpacity={0.7}>
        <MaterialCommunityIcons name="help-circle-outline" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
