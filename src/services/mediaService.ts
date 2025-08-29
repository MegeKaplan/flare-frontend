import api from "@/lib/axios"

// add Media interface

const mediaService = {
  getMediaById: async (id: string) => api.get<any>(`/megebase/media/${id}`),
  uploadMedia: async (formData: FormData) => api.post<any>("/megebase/media/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
}

export default mediaService
