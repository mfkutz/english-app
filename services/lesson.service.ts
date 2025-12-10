// services/lesson.service.ts
import { api } from "./api";

// Interfaces
export interface Exercise {
  type: "fill-blank" | "multiple-choice" | "image-match" | "translation";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  translation?: string;
  audioUrl?: string;
  imageUrl?: string;
  _id: string;
}

export interface Lesson {
  _id: string;
  chapter: string;
  lessonNumber: string;
  title: string;
  description?: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  exercises: Exercise[];
  order: number;
  isPremium: boolean;
  topics?: string[];
  progress?: {
    completed: boolean;
    score: number;
    lastAttempt: Date;
  } | null;
}

export interface Chapter {
  chapter: string;
  lessons: Lesson[];
  completedCount: number;
  totalLessons: number;
}

export interface SubmitAnswerRequest {
  exerciseIndex: number;
  answer: string;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  progress: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
  };
}

export interface CompleteLessonResponse {
  progress: {
    completed: boolean;
    score: number;
    timeSpent: number;
    isFirstCompletion: boolean;
  };
  nextLesson: {
    id: string;
    lessonNumber: string;
    title: string;
  } | null;
  userStats: {
    streak: number;
    experience: number;
  };
  xpGained: {
    total: number;
    base: number;
    bonus: number;
    streakBonus: number;
    isFirstCompletion: boolean; // ← También está aquí (duplicado)
    message?: string;
  };
  lessonTitle: string;
  lessonNumber: string;
}

// Servicio
export const lessonService = {
  // Obtener todas las lecciones (agrupadas por capítulo)
  async getLessons(
    level?: string,
    chapter?: string
  ): Promise<{
    chapters: Chapter[];
    totalLessons: number;
  }> {
    const params = new URLSearchParams();
    if (level) params.append("level", level);
    if (chapter) params.append("chapter", chapter);

    const response = await api.get(`/lessons?${params.toString()}`);
    return response.data.data;
  },

  // Obtener una lección específica
  async getLesson(lessonId: string): Promise<{
    lesson: Lesson;
    progress: {
      completed: boolean;
      score: number;
      attempts: number;
    } | null;
  }> {
    const response = await api.get(`/lessons/${lessonId}`);
    return response.data.data;
  },

  // Enviar respuesta
  async submitAnswer(lessonId: string, data: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
    const response = await api.post(`/lessons/${lessonId}/answer`, data);
    return response.data.data;
  },

  // Completar lección
  async completeLesson(lessonId: string): Promise<CompleteLessonResponse> {
    const response = await api.post(`/lessons/${lessonId}/complete`, {});
    return response.data.data;
  },

  // Obtener progreso de lección
  async getLessonProgress(lessonId: string): Promise<any> {
    const response = await api.get(`/lessons/${lessonId}/progress`);
    return response.data.data.progress;
  },
};
