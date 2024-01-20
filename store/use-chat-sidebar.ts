import { create } from "zustand"


export enum ChatVariant  {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY"
}

interface ChatSidebarStore {
  collapsed: boolean,
  variant: ChatVariant,
  onChangeVariant: (variant: ChatVariant) => void,
  onExpand: () => void;
  onCollapse: () => void;
}


export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  onExpand: () => set(() => ({
    collapsed: false
  })),
  onCollapse: () => set(() => ({
    collapsed: true
  }))
}))
