import axios from "axios";

export const saveFiles = async (files: File[]) => {
  const formData = new FormData();

  Object.values(files).forEach((file, index) =>
    formData.append("files", file, file.name)
  );

  const response = await axios.post(
    "https://localhost:7014/api/FileModel",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",

        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
