// hooks/useLessons.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CompleteLessonResponse,
  lessonService,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from "../services/lesson.service";
import { useAuthStore } from "../store/useAuthStore";

export const useLessons = (level?: string, chapter?: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Obtener todas las lecciones
  const lessonsQuery = useQuery({
    queryKey: ["lessons", user?.level, level, chapter],
    queryFn: () => lessonService.getLessons(level || user?.level, chapter),
    enabled: !!user,
  });

  // Obtener una lección específica
  const useLesson = (lessonId: string) => {
    return useQuery({
      queryKey: ["lesson", lessonId],
      queryFn: () => lessonService.getLesson(lessonId),
      enabled: !!lessonId,
    });
  };

  // Mutación para enviar respuesta
  const submitAnswerMutation = useMutation<
    SubmitAnswerResponse,
    Error,
    { lessonId: string; data: SubmitAnswerRequest }
  >({
    mutationFn: ({ lessonId, data }) => lessonService.submitAnswer(lessonId, data),
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.lessonId] });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });

  // Mutación para completar lección
  const completeLessonMutation = useMutation<CompleteLessonResponse, Error, string>({
    mutationFn: (lessonId: string) => lessonService.completeLesson(lessonId),
    onSuccess: (data, lessonId) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["lesson", lessonId] });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return {
    // Queries
    chapters: lessonsQuery.data?.chapters || [],
    totalLessons: lessonsQuery.data?.totalLessons || 0,
    isLoading: lessonsQuery.isLoading,
    error: lessonsQuery.error,

    // Mutaciones
    submitAnswer: submitAnswerMutation.mutate,
    isSubmittingAnswer: submitAnswerMutation.isPending,
    submitAnswerError: submitAnswerMutation.error,

    completeLesson: completeLessonMutation.mutate,
    isCompletingLesson: completeLessonMutation.isPending,
    completeLessonError: completeLessonMutation.error,

    // Refetch
    refetchLessons: lessonsQuery.refetch,

    // Helper hooks
    useLesson,
  };
};
