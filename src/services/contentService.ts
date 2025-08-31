import api from "@/lib/axios"
import { Account } from "./accountService";

export interface Post {
  id?: string;
  content?: string;
  mediaIds?: string[];
  mediaUrls?: string[];
  creatorId?: string;
  creator?: Account;
  createdAt?: string;
  updatedAt?: string;
}

const contentService = {
  getPost: (id: string) => api.get<Post>(`/flare/posts/${id}`),
  createPost: (data: Post) => api.post<Post>("/flare/posts/", data),
}

export default contentService
