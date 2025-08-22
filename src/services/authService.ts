import api from "@/lib/axios";

interface SendOTPData {
  email: string;
}

interface RegisterData {
  email: string;
  password: string;
  otp: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authService = {
  sendOTP: (data: SendOTPData) => api.post("/megebase/auth/register/send-otp", data),
  register: (data: RegisterData) => api.post("/megebase/auth/register", data),
  login: (data: LoginData) => api.post("/megebase/auth/login", data),
};

export default authService
