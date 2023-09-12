"use client";
import { useEffect, useState, useRef } from "react";

import { AiFillFilePdf, AiFillFile } from "react-icons/ai";

import { Alert, Fade, Snackbar } from "@mui/material";

import styles from "./DragDropBox.module.css";
import Buttons from "./Buttons";

import { ErrorObject } from "./../types";

import { retrieveFiles } from "../requests";

const DragDropBox = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
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

  const fetchFiles = async () => {
    return await retrieveFiles();
  };

  // useEffect(() => {
  //   retrieveFiles().then((res) => {
  //     const blob = new Blob([res.data], {
  //       type: res.headers["Content-Type"]?.toString(),
  //     });
  //     const file = new File([blob], "test");
  //     console.log(file);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

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
            <p>Drag your file here</p>
            <button
              className="upload-button"
              onClick={() => onButtonClick()}
            >
              Upload a file
            </button>
          </div>
        </label>
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
        <Buttons
          files={files}
          setErrors={setErrors}
        />
      </form>
    </>
  );
};

export default DragDropBox;
