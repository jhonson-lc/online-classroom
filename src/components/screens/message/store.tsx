import { User } from "@prisma/client";
import { create } from "zustand";

export enum TabName {
  INBOX,
  SENT,
  CONTACTS,
}

interface MessageState {
  for: User | null;
  setReceive: (user: User) => void;
  selectedTab: TabName;
  setSelectedTab: (tab: TabName) => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
  for: null,
  setReceive: (user) => set({ for: user }),
  selectedTab: TabName.INBOX,
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));
