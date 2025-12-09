// hooks/useUserProfile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; // tu instancia de axios
import { useAuthStore } from "../store/useAuthStore";

// Interface de perfil completo
interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  plan: "free" | "premium";
  level: string;
  streak: number;
  dailyPracticeGoal: number;
  goals: string[];
  wantsNotifications: boolean;
  reminderTime: string;
  appLanguage: string;
  experience: number;
}

export const useUserProfile = () => {
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuthStore();

  // Obtener perfil completo
  const profileQuery = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async (): Promise<UserProfile> => {
      const response = await api.get("/auth/profile");
      return response.data.data.user;
    },
    enabled: !!user?.id,
    initialData: user, // usa los datos del store como iniciales
  });

  // Actualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      const response = await api.put("/auth/profile", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        updateUser(data.data.user);
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      }
    },
  });

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isUpdating: updateProfileMutation.isPending,

    // Acciones
    updateProfile: updateProfileMutation.mutate,
    refetchProfile: profileQuery.refetch,
  };
};
