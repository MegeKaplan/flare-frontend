import { create } from "zustand";

interface AuthData {
  username: string;
  email: string;
  password: string;
  otp: string;
}

interface AuthState {
  data: AuthData;
  setData: (newData: Partial<AuthData>) => void;
  resetData: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  data: { username: "", email: "", password: "", otp: "" },
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  resetData: () => set({ data: { username: "", email: "", password: "", otp: "" } }),
}));

export default useAuthStore;