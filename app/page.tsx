"use client";

import React from "react";
import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "./page.module.css";

import { Snackbar, Alert, Stack } from "@mui/material";

import DragDropBox from "./components/DragDropBox";

import { SavedFiles } from "./components/SavedFiles";

import { SavedFile } from "./types";

import { retrieveFileNamesWExt } from "./requests";

const contextDefault = {
  setSavedFiles: () => {},
  setError: () => {},
  setShowError: () => {},
};

type ContextType = {
  setSavedFiles: Dispatch<SetStateAction<SavedFile[]>>;
  setError: Dispatch<SetStateAction<SavedFile[]>>;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextType>(contextDefault);

export default function Home() {
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<SavedFile[]>([]);

  useEffect(() => {
    retrieveFileNamesWExt().then((res) => setSavedFiles(res));
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>FEED ME A FILE</h2>
      </div>
      <Context.Provider value={{ setSavedFiles, setError, setShowError }}>
        <DragDropBox />
      </Context.Provider>
      <SavedFiles savedFiles={savedFiles} />
      <Snackbar
        open={showError}
        message="Something went wrong"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        children={
          <Alert
            severity="error"
            sx={{
              ".MuiAlert-icon": {
                alignItems: "center",
                // justifyContent: "center",
              },
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
            >
              {error.map((error) => (
                <div>{error.name} already exists!</div>
              ))}
            </Stack>
          </Alert>
        }
      />
    </main>
  );
}
