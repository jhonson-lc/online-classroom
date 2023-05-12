import { create } from "zustand";

interface ComponentsState {
  showTitles: boolean;
  setShowTitles: (show: boolean) => void;
}

export const useComponentsStore = create<ComponentsState>()((set) => ({
  showTitles: true,
  setShowTitles: (show: boolean) => set({ showTitles: show }),
}));
