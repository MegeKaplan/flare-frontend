import api from "@/lib/axios";

interface SendOTPData {
  email: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  otp: string;
}

const authService = {
  sendOTP: (data: SendOTPData) => api.post("/megebase/auth/register/send-otp", data),
  register: (data: RegisterData) => api.post("/megebase/auth/register", data),
};

export default authService
