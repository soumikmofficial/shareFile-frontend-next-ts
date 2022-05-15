import React, {
  useState,
  Dispatch,
  FunctionComponent,
  useCallback,
} from "react";
import { useDropzone } from "react-dropzone";
import styles from "styles/DropZone.module.scss";
import { FaFileSignature } from "react-icons/fa";
import Uploaded from "./Uploaded";
import { convertBytes } from "utils/utils";

const sizeLimit = 1000000;
// todo: the component starts here
const DropZone: FunctionComponent<{
  setFile: Dispatch<any>;
  file: any | null;
  downloadUrl: string | null;
  id: string | null;
}> = ({ setFile, file, downloadUrl, id }) => {
  // todo: states
  const [error, setError] = useState<string | null>(null);

  // todo: on drop of file
  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles.length >= 1) {
      setError(null);
      setFile(acceptedFiles[0]);
    }
    if (rejectedFiles.length >= 1) setError(rejectedFiles[0].errors[0].code);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: sizeLimit,
    multiple: false,
  });

  return (
    <div
      className={`${styles.wrapper} ${error && styles.failed} ${
        file && styles.success
      } ${isDragActive && "active"}`}
    >
      {downloadUrl ? (
        <Uploaded downloadUrl={downloadUrl} file={file} id={id}></Uploaded>
      ) : (
        <div className={styles.container} {...getRootProps()}>
          {error ? (
            <div className="error">
              <small>Try a different file</small>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className={styles.inputField}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag and drop your file here</p>
                )}
                {file ? (
                  <>
                    <h2>{file.type.split("/")[1]}</h2>
                  </>
                ) : (
                  <FaFileSignature className={styles.icon} />
                )}
              </div>
              <div className={styles.details}>
                {file && (
                  <p className={styles.fileName}>
                    {file.name} <span>({convertBytes(file.size)} mb)</span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropZone;
