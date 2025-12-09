import { FillBlankExercise } from "@/components/exercises/FillBlankExercise";
import { ImageMatchExercise } from "@/components/exercises/ImageMatchExercise";
import { LessonHeader } from "@/components/LessonHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Animated, BackHandler, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";
import { useLessons } from "../../hooks/useLessons";

import { FeedbackCard } from "@/components/FeedbackCard";
import { useIsFocused } from "@react-navigation/native";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { useLesson, submitAnswer, completeLesson } = useLessons();
  const { data, isLoading, error } = useLesson(id as string);

  const lesson = data?.lesson;
  const exercises = lesson?.exercises || [];
  const currentExercise = exercises[currentIndex];
  const progress = data?.progress;
  const totalExercises = exercises.length;
  const isLastExercise = currentIndex === totalExercises - 1;

  const isFocused = useIsFocused();

  // Reset cuando cambia de ejercicio
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setIsChecking(false);
    setCorrectAnswer(null);
    fadeAnim.setValue(0);
  }, [currentIndex]);

  // Animación del feedback
  useEffect(() => {
    if (selectedOption && !isChecking && isCorrect !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedOption, isChecking, isCorrect]);

  // Manejar error
  useEffect(() => {
    if (error) {
      Alert.alert("Error", "Failed to load lesson");
      router.back();
    }
  }, [error]);

  useEffect(() => {
    // Solo configurar el back handler si la pantalla está en foco
    if (!isFocused) return;

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert("¿Salir de la lección?", "Tu progreso no se guardará si sales ahora.", [
        {
          text: "Continuar",
          style: "cancel",
        },
        {
          text: "Salir al Home",
          onPress: () => {
            router.replace("/(tabs)");
          },
        },
      ]);
      return true; // Previene el comportamiento por defecto
    });

    // Cleanup: remover el listener cuando el componente se desmonte
    // o cuando pierda el foco
    return () => {
      subscription.remove();
    };
  }, [isFocused, router]);

  const handleSelectOption = (option: string) => {
    // Permitir seleccionar si:
    // 1. Hay lección
    // 2. No está evaluando (isChecking)
    // 3. No se ha evaluado todavía (isCorrect === null)
    if (!lesson || isChecking || isCorrect !== null) return;

    // Si ya estaba seleccionada, deseleccionarla (toggle)
    // Si es diferente, cambiarla
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  // Función para COMPROBAR (evalúa)
  const handleCheckAnswer = () => {
    if (!lesson || !selectedOption || isChecking || isCorrect !== null) return;

    setIsChecking(true);

    submitAnswer(
      {
        lessonId: lesson._id,
        data: { exerciseIndex: currentIndex, answer: selectedOption },
      },
      {
        onSuccess: (result) => {
          setIsCorrect(result.isCorrect);
          setCorrectAnswer(currentExercise.correctAnswer);
          setIsChecking(false);
          setShowExplanation(true);
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to submit answer");
          setSelectedOption(null);
          setIsCorrect(null);
          setCorrectAnswer(null);
          setIsChecking(false);
        },
      }
    );
  };

  // Función para siguiente ejercicio o terminar lección
  const handleNext = () => {
    if (!isLastExercise) {
      // Resetear para siguiente ejercicio
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
      setIsChecking(false);
      setCorrectAnswer(null);
    } else {
      handleCompleteLesson();
    }
  };

  // Función del botón único (cambia comportamiento según estado)
  const handleButtonPress = () => {
    // CASO 1: Nada seleccionado → No hacer nada (botón desactivado)
    if (!selectedOption) return;

    // CASO 2: Hay selección pero no evaluado → COMPROBAR
    if (selectedOption && isCorrect === null) {
      handleCheckAnswer();
      return;
    }

    // CASO 3: Ya evaluado → SIGUIENTE
    handleNext();
  };

  const handleCompleteLesson = () => {
    if (!lesson) return;

    completeLesson(lesson._id, {
      onSuccess: (result) => {
        const correctAnswers = Math.round(((result.progress?.score || 0) / 100) * lesson.exercises.length);

        console.log("Backend response", result);
        router.replace({
          pathname: "/lesson/results",
          params: {
            lessonId: lesson._id,
            lessonTitle: lesson.title,
            lessonNumber: lesson.lessonNumber,
            score: result.progress?.score || 0,
            correctAnswers: correctAnswers,
            totalExercises: lesson.exercises.length,
            streak: result.userStats.streak,
            nextLessonId: result.nextLesson?.id,
            nextLessonTitle: result.nextLesson?.title,
            xpGained: JSON.stringify(result.xpGained || {}),
            isFirstCompletion: String(result.progress.isFirstCompletion || false),
          },
        });
      },
      onError: () => {
        Alert.alert("Error", "Failed to complete lesson");
      },
    });
  };

  // Determinar propiedades del botón según estado
  const getButtonConfig = () => {
    // Configuración base
    let title = "COMPROBAR";
    let variant = "primary" as "primary" | "secondary" | "outline" | "success" | "danger" | "disabled";
    let disabled = false;
    let loading = false;
    let icon = undefined;

    if (isChecking) {
      // Evaluando...
      title = "Evaluando...";
      loading = true;
      disabled = true;
      variant = "primary";
    } else if (isCorrect === true) {
      // Correcto
      title = "Continuar";
      variant = "success"; // Verde
      icon = "check-circle";
    } else if (isCorrect === false) {
      // Incorrecto
      title = "Continuar";
      variant = "danger"; // Rojo
      icon = "close-circle";
    } else if (!selectedOption) {
      // Nada seleccionado
      disabled = true;
      variant = "disabled"; // Gris
    }

    return { title, variant, disabled, loading, icon };
  };

  const buttonConfig = getButtonConfig();

  if (isLoading || !lesson) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-5">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-lg text-gray-600">Loading lesson...</Text>
      </View>
    );
  }

  if (!currentExercise) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-5">
        <Text className="text-lg text-gray-600">Exercise not found</Text>
      </View>
    );
  }

  // Componente de ejercicio según tipo
  const ExerciseComponent = () => {
    const commonProps = {
      exercise: currentExercise,
      onSelect: handleSelectOption,
      selectedOption,
      isChecking,
      isCorrect,
      showExplanation,
      correctAnswer,
    };

    switch (currentExercise.type) {
      case "image-match":
        return <ImageMatchExercise {...commonProps} />;
      case "fill-blank":
        return <FillBlankExercise {...commonProps} />;
      default:
        return (
          <View className="items-center p-10 bg-white rounded-2xl">
            <MaterialCommunityIcons name="alert-circle" size={48} color="#FF9500" />
            <Text className="mt-4 text-base text-gray-500 text-center">
              Exercise type "{currentExercise.type}" is not supported yet
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <LessonHeader
        onClose={() => {
          Alert.alert("Leave Lesson", "Your progress will be saved.", [
            { text: "Stay", style: "cancel" },
            { text: "Leave", onPress: () => router.replace("/(tabs)") },
          ]);
        }}
        exerciseNumber={currentIndex + 1}
        totalExercises={totalExercises}
      />

      {/* CONTENIDO PRINCIPAL CON SCROLL */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="p-5 pb-25">
        {/* EXERCISE COMPONENT */}
        <ExerciseComponent />

        {/* FEEDBACK CARD */}
        {selectedOption && !isChecking && isCorrect !== null && (
          <FeedbackCard
            isCorrect={isCorrect}
            correctAnswer={
              !isCorrect && currentExercise.type === "fill-blank" ? currentExercise.correctAnswer : undefined
            }
            correctImageUrl={
              !isCorrect && currentExercise.type === "image-match" ? currentExercise.correctAnswer : undefined
            }
            explanation={currentExercise.explanation}
            fadeAnim={fadeAnim}
            exerciseType={currentExercise.type}
          />
        )}

        {/* ESPACIO PARA EL BOTÓN FIJO (evita que el contenido quede detrás del botón) */}
        <View className="h-20" />
      </ScrollView>

      {/* BOTÓN FIJO (como Duolingo) - SIEMPRE VISIBLE */}
      <View className="bg-white pt-5 pb-7 px-5 border-t border-gray-200">
        <Button
          title={buttonConfig.title}
          onPress={handleButtonPress}
          disabled={buttonConfig.disabled}
          variant={buttonConfig.variant}
          size="large"
          className="w-full rounded-2xl"
          loading={buttonConfig.loading}
          icon={buttonConfig.icon}
        />
      </View>
    </SafeAreaView>
  );
}
