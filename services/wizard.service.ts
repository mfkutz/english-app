import { api } from "./api";

export interface WizardStatus {
  needsWizard: boolean;
  hasName: boolean;
  currentName: string;
}

export interface WizardData {
  name: string;
  appLanguage?: "es" | "en" | "pt";
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  goals?: string[];
  dailyPracticeGoal?: number;
  wantsNotifications?: boolean;
}

export const wizardService = {
  async checkStatus(): Promise<WizardStatus> {
    const response = await api.get("/wizard/status");
    return response.data.data;
  },

  async complete(data: WizardData): Promise<any> {
    const response = await api.post("/wizard/complete", data);
    return response.data;
  },
};
