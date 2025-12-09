export const googleAuthService = {
  async signInWithGoogle(): Promise<{ token: string; user: any }> {
    // TODO: Implementar Google Sign-In
    throw new Error("Google Sign-In not implemented yet");
  },

  async configure() {
    // Configurar Google Sign-In
    // Esto va a depender si usamos react native puro o expo
  },
};

// npm install @react-native-google-signin/google-signin
// # O si usas Expo:
// expo install expo-auth-session expo-web-browser
