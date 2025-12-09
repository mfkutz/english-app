import { useState } from "react";
import { wizardService } from "../services/wizard.service";
import { useAuthStore } from "../store/useAuthStore";

export const useWizard = () => {
  const { setWizardCompleted } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    try {
      console.log("Llamando a /wizard/status...");
      const status = await wizardService.checkStatus();
      console.log("Respuesta de wizard:", status);
      return status;
    } catch (err: any) {
      console.error("Error en checkStatus:", err);
      setError(err.message);
      return { needsWizard: true, hasName: false, currentName: "" };
    }
  };

  const completeWizard = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await wizardService.complete(data);

      if (response.success) {
        setWizardCompleted(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkStatus,
    completeWizard,
    isLoading, // 👈 AÑADIR ESTO
    error,
    clearError: () => setError(null),
  };
};
