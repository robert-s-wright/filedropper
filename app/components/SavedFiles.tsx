"use client";
import React, { useEffect, useState } from "react";

import { SavedFile } from "../types";
import { retrieveFileNamesWExt, retrieveFile } from "../requests";

import { Stack, Typography, Button } from "@mui/material";

export const SavedFiles = () => {
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);

  useEffect(() => {
    retrieveFileNamesWExt().then((res) => setSavedFiles(res.data));
  }, []);

  const handleDownload = async (fileId: number) => {
    const url = await retrieveFile(fileId);
    // setSavedFiles((state) => {
    //   return state.map((file) => {
    //     if (file.id === fileId) {
    //       return { ...file, url };
    //     } else {
    //       return file;
    //     }
    //   });
    // });
  };

  return (
    <Stack
      className="container"
      padding={2}
    >
      <Typography variant="h5">Saved Files</Typography>
      {savedFiles.map((file, ind) => {
        return (
          <Stack
            key={ind}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <div>{file.name}</div>

            <Button onClick={() => handleDownload(file.id)}>Retrieve</Button>
            {file.url ? (
              <a
                href={file.url}
                // download={file.name}
                target="_blank"
              >
                Download!
              </a>
            ) : null}
          </Stack>
        );
      })}
    </Stack>
  );
};
