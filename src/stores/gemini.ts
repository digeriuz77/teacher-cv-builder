import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IGeminiStore {
  apiKey: string;
  setApiKey: (key: string) => void;
  reset: () => void;
}

export const useGemini = create<IGeminiStore>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key: string) => set({ apiKey: key }),
      reset: () => set({ apiKey: '' }),
    }),
    { name: 'gemini-api-key' }
  )
);
