import api from "@/lib/axios"
import { buildQueryString } from "@/lib/queryBuilder"
import { Post } from "@/types/content"

const contentService = {
  getPostsByCreator: (id: string) => api.get<Post[]>(`/flare/posts/?creatorId=${id}&type=post`),
  getPosts: (params: Record<string, any>) => api.get<Post[]>(`/flare/posts/?${buildQueryString(params)}`),
  getPost: (id: string) => api.get<Post>(`/flare/posts/${id}`),
  createPost: (data: Post) => api.post<Post>("/flare/posts/", data),
  updatePost: (id: string, data: Partial<Post>) => api.put<Post>(`/flare/posts/${id}`, data),
}

export default contentService
