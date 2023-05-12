import { create } from "zustand";

export enum TabName {
  Assignment,
  Students,
  Submissions,
}

interface ClassroomState {
  tabAtom: TabName;
  selectedTab: TabName;
  setSelectedTab: (tab: TabName) => void;
}

export const useClassroomStore = create<ClassroomState>()((set) => ({
  tabAtom: TabName.Assignment,
  selectedTab: TabName.Assignment,
  setSelectedTab: (tab: TabName) => set({ selectedTab: tab }),
}));
