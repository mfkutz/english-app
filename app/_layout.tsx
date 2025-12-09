import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          // Configuración global
          gestureEnabled: true, // Por defecto permitido
        }}
      >
        {/* Pantallas principales */}
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="signup-options" />
        <Stack.Screen name="wizard" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />

        {/*  DECLARAMOS EXPLÍCITAMENTE las rutas de lección */}
        {/* Esto nos da control sobre sus opciones */}
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: false,
            gestureEnabled: false, // ← DESHABILITAMOS gesto aquí
          }}
        />
        <Stack.Screen
          name="lesson/results"
          options={{
            headerShown: false,
            gestureEnabled: false, // ← DESHABILITAMOS gesto aquí
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
