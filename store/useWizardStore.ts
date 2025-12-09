import { create } from "zustand";

interface WizardData {
  appLanguage: "es" | "en" | "pt";
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  goals: string[];
  dailyPracticeGoal: number;
  wantsNotifications: boolean;
  wantsDailyReminder?: boolean; //ojo esto que no esta en el backend
  reminderTime?: string; //esto tampoco, agregar ambos
}

interface WizardStore {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  reset: () => void;
}

const initialData: WizardData = {
  appLanguage: "en",
  name: "",
  level: "A1",
  goals: [],
  dailyPracticeGoal: 15,
  wantsNotifications: true,
  wantsDailyReminder: true,
  reminderTime: "20:00",
};

console.log("ACTUAL DATA", initialData);

//preparamos todo para enviar al backend
export const useWizardStore = create<WizardStore>((set) => ({
  data: initialData,
  updateData: (updates) =>
    set((state) => ({
      data: { ...state.data, ...updates },
    })),
  reset: () => set({ data: initialData }),
}));
