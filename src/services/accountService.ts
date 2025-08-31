import api from "@/lib/axios";
import { Account } from "@/types/account";

const accountService = {
  getAccountById: (id: string) => api.get(`/flare/accounts/${id}`),
  getAccountByUsername: (username: string) => api.get(`/flare/accounts/${username}`),
  updateAccount: (id: string, data: Partial<Account>) => api.put(`/flare/accounts/${id}`, data),
};

export default accountService
