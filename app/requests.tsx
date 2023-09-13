import axios from "axios";
import { SavedFile } from "./types";

export const saveFiles = async (files: File[]) => {
  const formData = new FormData();

  Object.values(files).forEach((file) =>
    formData.append("files", file, file.name)
  );

  try {
    const response = await axios.post(
      "https://localhost:7014/api/FileSave",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const retrieveFileNamesWExt = async () => {
  const response = await axios.get("https://localhost:7014/api/FileList");

  return response.data;
};

export const retrieveFile = async (id: number) => {
  const response = await axios.get(
    `https://localhost:7014/api/FileRetrieve?id=${id}`,
    {
      responseType: "blob",
    }
  );

  const url = URL.createObjectURL(response.data);
  window.open(url);
  return url;
};
