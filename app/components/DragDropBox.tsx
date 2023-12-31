"use client";
import { useState, useRef, useContext } from "react";

import { AiFillFile } from "react-icons/ai";

import styles from "./DragDropBox.module.css";

import { Button } from "@mui/material";

import { ErrorObject, SavedFile } from "./../types";

import { Context } from "../page";

import { saveFiles } from "../requests";

const DragDropBox = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);

    setFiles([...files, ...droppedFiles]);
    setDragActive(false);
  };

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      dragActive === false &&
      (e.type === "dragenter" || e.type === "dragover")
    ) {
      setDragActive(true);
    }
    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles: File[] = Array.from(e.target.files);

    setFiles([...files, ...droppedFiles]);
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const { setSavedFiles, setError, setShowError } = useContext(Context);

  const handleSave = () => {
    saveFiles(files).then((res: SavedFile[]) => {
      const result = res.reduce(
        (r, o) => {
          return o.id !== null
            ? { ...r, accepted: [...r.accepted, o] }
            : { ...r, rejected: [...r.rejected, o] };
        },
        { accepted: [], rejected: [] } as {
          accepted: SavedFile[];
          rejected: SavedFile[];
        }
      );

      if (result.rejected.length > 0) {
        setError([...result.rejected]);
        setShowError(true);
        setTimeout(() => {
          setError([]);
        }, 3200);

        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
      if (result.accepted.length > 0) {
        setSavedFiles((state: SavedFile[]) => [...state, ...result.accepted]);
        setFiles([]);
      }
    });
  };

  return (
    <>
      <form
        id="form-file-upload"
        onSubmit={(e) => e.preventDefault()}
        className={`${styles.container} ${dragActive ? styles.dragging : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragEnd={handleDrag}
        onDragExit={handleDrag}
      >
        <input
          type="file"
          id={"input-file-upload"}
          multiple
          onChange={handleChange}
          ref={inputRef}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          style={{ pointerEvents: dragActive ? "none" : "auto" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
            draggable={true}
            onClick={(e) => e.preventDefault()}
          >
            <p>Drag your files here or browse for them</p>
            <Button
              className="upload-button"
              onClick={() => onButtonClick()}
              variant="contained"
              color="warning"
            >
              Upload a file
            </Button>
          </div>
        </label>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
        >
          Save All Files
        </Button>
        <div>
          {files.map((file, index) => {
            return (
              <div
                className={styles.fileList}
                key={index}
              >
                <AiFillFile style={{ color: "red" }} />
                <div>{file.name}</div>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
};

export default DragDropBox;
