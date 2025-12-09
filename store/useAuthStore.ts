import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authService, UserProfile } from "../services/auth.service";
// import { wizardService, WizardData } from "../services/wizard.service"; // <-- NUEVO

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => Promise<void>;

  // Wizard actions (ahora solo manejan estado)
  setWizardCompleted: (userData: UserProfile) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        console.log("Ingresando al login...");
        set({ isLoading: true });
        try {
          const response = await authService.login({ email, password });

          if (response.success) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });

            await AsyncStorage.setItem("auth_token", response.data.token);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error("ERROR LOGIN");
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.register({
            email,
            password,
            name: "",
          });

          if (response.success) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });

            await AsyncStorage.setItem("auth_token", response.data.token);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        console.log("Cerrando sesión...");

        //limpiar asyncstorage
        AsyncStorage.removeItem("auth_token");

        //limpiar estado local
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        //redirigir (importante hacerlo DESPUS de limpiar estado)
        router.replace("/welcome");
      },

      loadUser: async () => {
        console.log("Cargando usuario...");
        const token = await AsyncStorage.getItem("auth_token");

        // Si no hay token, NO está autenticado
        if (!token) {
          console.log("No hay token, usuario NO autenticado");
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authService.getProfile();

          if (response.success) {
            console.log("Usuario autenticado correctamente");
            set({
              user: response.data.user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            console.log("Token inválido, limpiando...");
            await AsyncStorage.removeItem("auth_token");
            set({ isAuthenticated: false, user: null, token: null, isLoading: false });
          }
        } catch (error) {
          console.error("Error cargando usuario:", error);
          await AsyncStorage.removeItem("auth_token");
          set({ isAuthenticated: false, user: null, token: null, isLoading: false });
        }
      },

      updateUser: async (userData: Partial<UserProfile>) => {
        console.log("Actualizando perfil...");
        try {
          const response = await authService.updateProfile(userData);

          if (response.success && response.data.user) {
            set({ user: response.data.user });
          }
        } catch (error) {
          throw error;
        }
      },

      // Nueva función solo para actualizar estado
      setWizardCompleted: (userData: UserProfile) => {
        set({
          user: userData,
          isLoading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
