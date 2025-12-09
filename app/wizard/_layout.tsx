import { Stack } from "expo-router";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Evitar que salte el wizard con gestos
      }}
    />
  );
}
