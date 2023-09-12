import axios from "axios";

export const saveFiles = async (files: File[]) => {
  const formData = new FormData();

  await Object.values(files).forEach((file, index) =>
    formData.append("files", file, file.name)
  );

  try {
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

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const retrieveFiles = async () => {
  const response = await axios.get("https://localhost:7014/api/FileModel");
  return response;
};

export const retrieveFileNamesWExt = async () => {
  const response = await axios.get("https://localhost:7014/api/FileList");
  return response;
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
