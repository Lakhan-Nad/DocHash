import http from "axios";

class UploadFilesService {
  upload(data, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("key", data.key);
    formData.append("name", data.name);
    return http.post("/api/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
