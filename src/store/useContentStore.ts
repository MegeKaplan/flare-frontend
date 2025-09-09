import { create } from "zustand";

interface ContentState {
  audioMuted: boolean;
  setAudioMuted: (value: boolean) => void;
}

const useContentStore = create<ContentState>((set) => ({
  audioMuted: false,
  setAudioMuted: (value) => set({ audioMuted: value }),
}));

export default useContentStore;