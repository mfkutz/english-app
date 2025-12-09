import { api } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: "free" | "premium";
  level: string;
  streak: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
    token: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  async getProfile(): Promise<any> {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  async updateProfile(data: Partial<UserProfile>): Promise<any> {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  async logout(): Promise<void> {
    // Limpiar storage localmente
    // El backend no necesita un endpoint de logout con JWT
  },
};
