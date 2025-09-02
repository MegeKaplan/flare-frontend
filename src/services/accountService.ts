import api from "@/lib/axios";
import { Account } from "@/types/account";

interface CreateFlareAccountData {
  username: string;
  email: string;
  password: string;
}

const accountService = {
  getAccountById: (id: string) => api.get(`/flare/accounts/${id}`),
  getAccountByUsername: (username: string) => api.get(`/flare/accounts/${username}`),
  createFlareAccount: (data: CreateFlareAccountData, userId: string) => api.post(`/flare/accounts/${userId}`, data),
  updateAccount: (id: string, data: Partial<Account>) => api.put(`/flare/accounts/${id}`, data),
};

export default accountService
