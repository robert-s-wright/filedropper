export type ErrorResult = {
  id?: number;
  file: {
    contentDisposition: string;
    contentType: string;
    fileName: string;
    headers: {
      "Content-Disposition": string[];
      "Content-Type": string[];
      length: number;
      name: string;
    };
  };
  location?: string;
  error: boolean;
};

export type ErrorObject = {
  error: boolean;
  fileName: string;
};

export type SavedFile = {
  id: number;
  name: string;
  type: string;
  url?: string;
};
