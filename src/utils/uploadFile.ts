import { apiService } from "../services/api";

export const uploadFile = (file: File | null) => {
  if (!file) return Promise.resolve({ data: null });

  const formData = new FormData();
  formData.append("file", file);
  return apiService.post("/storage", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
