import api from "@/lib/axios"

const contentService = {
  createPost: (data: any) => api.post<any>("/flare/posts/", data),
}

export default contentService
