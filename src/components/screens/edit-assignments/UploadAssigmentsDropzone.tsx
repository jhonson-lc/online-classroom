import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button, Variant } from "../../common/Button/Button";

import { api } from "@/utils/api";

const UploadAssigmentDropzone = ({
  assignmentId,
  onFileUploaded,
}: {
  assignmentId: string;
  onFileUploaded: () => void;
}) => {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [file, setFile] = useState<File>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "image/*": [".png", ".gif", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setFile(acceptedFiles[0]);
    },
    maxFiles: 1,
  });

  const thumbs = files.map((file) => {
    const img: string = file.name.includes(".pdf")
      ? "https://img.icons8.com/color/48/000000/pdf-2.png"
      : file.preview;
    return (
      <div
        key={file.name}
        className="flex h-full w-full items-center rounded-md border-2 object-cover p-4 "
      >
        <div className="flex min-w-0 overflow-hidden">
          <img
            className="h-100 block w-auto"
            src={img}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
        <span className="text-xs">{file.name}</span>
      </div>
    );
  });

  const { mutateAsync: createPresignedUrl } = api.Assignment.createPresignedUrl.useMutation();

  const uploadAssignment = async () => {
    if (!file) return;
    const { url, fields }: { url: string; fields: any } = (await createPresignedUrl({
      filename: file.name,
      assignmentId,
    })) as any;
    const data = {
      ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await fetch(url, {
      method: "POST",
      body: formData,
    });

    setFiles([]);
    setFile(undefined);

    onFileUploaded();
  };

  return (
    <section className="flex items-center justify-center space-x-4">
      <div
        className="flex h-min flex-col items-center justify-center rounded-lg shadow-2xl"
        {...getRootProps()}
      >
        {!file && (
          <>
            <input {...getInputProps()} />
            <label
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-2 hover:bg-gray-100"
              htmlFor="dropzone-file"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  aria-hidden="true"
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para cargar</span> o arrastra tu archivo
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, PNG, JPG or GIF (MAX. 100kb)
                </p>
              </div>
            </label>
          </>
        )}
        {/* <strong className="mt-4 text-lg text-gray-800">Uploading files...</strong> */}
        {thumbs.length > 0 && <aside className="mt-2 flex flex-wrap">{thumbs}</aside>}
      </div>
      {file && (
        <Button type="submit" variant={Variant.Primary} onClick={uploadAssignment}>
          Guardar entrega
        </Button>
      )}
    </section>
  );
};

export default UploadAssigmentDropzone;
