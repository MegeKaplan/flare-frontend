import api from "@/lib/axios"

export interface Media {
  id: string
  project: string
  filename: string
  mimeType: string
  size: number
  createdAt: string
  updatedAt: string
  signedUrl?: string
}

const mediaService = {
  getMediaById: async (id: string) => api.get<any>(`/megebase/media/${id}`),
}

export default mediaService
