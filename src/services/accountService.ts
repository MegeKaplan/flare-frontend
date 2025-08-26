import api from "@/lib/axios";

export interface Account {
  id: string
  username: string
  displayName?: string
  bio?: string
  profileImageUrl?: string
  bannerImageUrl?: string
}

interface GetAccountByUsernameData {
  username: string;
}

const accountService = {
  getAccountByUsername: (data: GetAccountByUsernameData) => api.get(`/flare/accounts/${data.username}`),
};

export default accountService
