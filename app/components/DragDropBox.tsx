"use client";
import { useEffect, useState, useRef } from "react";

import { AiFillFilePdf, AiFillFile } from "react-icons/ai";

import styles from "./DragDropBox.module.css";

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

  return (
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
    </form>
  );
};

export default DragDropBox;
