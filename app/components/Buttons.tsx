import React, { Dispatch, SetStateAction } from "react";
import { saveFiles } from "../requests";

import { ErrorResult, ErrorObject } from "./../types";

import { AxiosResponse } from "axios";

type ButtonsProps = {
  files: File[];
  setErrors: Dispatch<SetStateAction<ErrorObject[]>>;
};

const Buttons = ({ files, setErrors }: ButtonsProps) => {
  const handleSave = async () => {
    const response = await saveFiles(files);

    if (response !== undefined) {
      const results = response.map((obj: ErrorResult) => {
        return { error: obj.error, fileName: obj.file.fileName };
      });
      setErrors(results.filter((obj: ErrorResult) => obj.error === true));
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save Files</button>
    </div>
  );
};

export default Buttons;
