import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

// Para desarrollo: ajustar URL según plataforma
const getBaseURL = () => {
  if (__DEV__) {
    // En desarrollo, usar localhost o IP
    const localhost = Constants.expoConfig?.hostUri?.split(":")[0];
    return `http://${localhost || "localhost"}:3000/api`;
  }
  // En producción, tu URL real
  return "https://tu-backend.com/api";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para token (antes de enviar)
api.interceptors.request.use(
  async (config) => {
    // Esta función se ejecuta ANTES de cada petición
    try {
      const token = await AsyncStorage.getItem("auth_token");
      // 2. Si hay token, agregarlo a los headers
      if (token) {
        // Esto añade: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }

    // 3. Retornar config modificada
    return config;
  },
  (error) => Promise.reject(error) // Si hay error en el interceptor
);
// ¿Para qué sirve el request interceptor?
// Automáticamente añade el token JWT a TODAS las peticiones
// No tenemos que poner headers: { Authorization: ... } en cada llamada

// Interceptor para errores (despues de recibir)
api.interceptors.response.use(
  (response) => response, // Si todo OK, devolver la respuesta
  async (error) => {
    // Esta función se ejecuta cuando hay ERROR en la respuesta

    // 1. Verificar si es error 401 (No autorizado)
    if (error.response?.status === 401) {
      // 401 significa: token expirado, inválido o no hay sesión

      // 2. Limpiar datos de sesión localmente
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user");
      // Redirigir al login (manejado en store)

      // 3. Aquí normalmente redirigirías al login
      // Pero en mobile es más complejo, se maneja en el store
    }
    // 4. Rechazar el error para que lo capture el código que hizo la petición
    return Promise.reject(error);
  }
);

// Casos que maneja:
// Usuario cierra sesión en otro dispositivo → token inválido
// Token expira después de 7 días
// Sesión eliminada en el servidor
