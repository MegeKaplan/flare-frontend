import { create } from "zustand";

interface StatusState {
  loading: boolean;
  error: string | null;
  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
}

const useStatusStore = create<StatusState>((set) => ({
  loading: false,
  error: null,
  setLoading: (value) => set({ loading: value }),
  setError: (message) => set({ error: message }),
}));

export default useStatusStore;