import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Pequeño delay para asegurar que el store se cargue
    const timer = setTimeout(() => {
      setChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Loading inicial
  if (checking || authLoading) {
    return <LoadingScreen />;
  }

  // Solo para cuando se abre la app fría (cold start)
  // El wizard después de login/register se maneja en esas pantallas
  if (isAuthenticated) {
    // En cold start, ir directo a tabs (si ya estaba logueado)
    // Si necesita wizard, se manejará cuando intente usar la app
    return <Redirect href="/(tabs)" />;
  }

  // No autenticado
  return <Redirect href="/welcome" />;
}

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);
