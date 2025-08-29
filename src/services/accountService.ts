import api from "@/lib/axios";

export interface Account {
  id: string
  username: string
  displayName?: string
  bio?: string
  profileImageId?: string
  bannerImageId?: string
}

interface GetAccountByUsernameData {
  username: string;
}

const accountService = {
  getAccountByUsername: (data: GetAccountByUsernameData) => api.get(`/flare/accounts/${data.username}`),
  updateAccount: (id: string, data: Partial<Account>) => api.put(`/flare/accounts/${id}`, data),
};

export default accountService
