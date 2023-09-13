"use client";
import React, { useEffect, useState } from "react";

import { SavedFile, SavedFilesProps } from "../types";
import { retrieveFile } from "../requests";

import { Stack, Typography, Button } from "@mui/material";

export const SavedFiles = ({ savedFiles }: SavedFilesProps) => {
  const handleDownload = async (fileId: number) => {
    await retrieveFile(fileId);
  };

  return (
    <Stack
      className="container"
      padding={2}
    >
      <Typography
        variant="h5"
        alignSelf="center"
      >
        Saved Files
      </Typography>
      {savedFiles.map((file, ind) => {
        return (
          <Stack
            key={ind}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <div>{file.name}</div>
            <Button
              variant="contained"
              onClick={() => handleDownload(file.id)}
              size="small"
              color="success"
            >
              Retrieve
            </Button>
          </Stack>
        );
      })}
    </Stack>
  );
};
