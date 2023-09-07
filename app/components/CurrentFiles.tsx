import React, { useState } from "react";

type CurrentFilesProps = {};

const CurrentFiles = () => {
  const [existingFiles, setExistingFiles] = useState<File[]>();
  return <div>CurrentFiles</div>;
};

export default CurrentFiles;
