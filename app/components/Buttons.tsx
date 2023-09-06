import React from "react";
import { saveFiles } from "../requests";

const Buttons = (files: File[]) => {
  const handleSave = async () => {
    const response = await saveFiles(files);
  };
  return (
    <div>
      <button onClick={handleSave}>Save Files</button>
    </div>
  );
};

export default Buttons;
