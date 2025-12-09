// services/user.service.ts
import { api } from "./api";

export interface UserStats {
  totalConversations: number;
  totalDuration: number;
  totalMessages: number;
  bookmarked: number;
  averageDuration: number;
  averageMessages: number;
}

export interface DailyStat {
  date: string;
  count: number;
  totalDuration: number;
}

export const userService = {
  // Obtener estadísticas del usuario
  async getUserStats(): Promise<UserStats> {
    const response = await api.get("/conversations/stats");
    return response.data.data.overview;
  },

  // Obtener estadísticas diarias (últimos 30 días)
  async getDailyStats(): Promise<DailyStat[]> {
    const response = await api.get("/conversations/stats");
    return response.data.data.dailyStats || [];
  },

  // Actualizar perfil
  async updateProfile(data: any): Promise<any> {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  // Cambiar plan (free -> premium)
  async upgradeToPremium(): Promise<any> {
    const response = await api.post("/subscription/upgrade");
    return response.data;
  },
};
