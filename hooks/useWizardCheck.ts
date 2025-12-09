import { useRouter } from "expo-router";
import { useState } from "react";
import { wizardService } from "../services/wizard.service";

export const useWizardCheck = (enabled = true) => {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const checkAndRedirect = async () => {
    if (!enabled) return;

    setChecking(true);
    try {
      const status = await wizardService.checkStatus();
      if (status.needsWizard) {
        console.log("Wizard needed, redirecting...");
        router.replace("/wizard");
      }
    } catch (error) {
      console.error("Error checking wizard:", error);
    } finally {
      setChecking(false);
    }
  };

  return { checking, checkAndRedirect };
};
