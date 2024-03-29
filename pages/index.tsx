import axios from "axios";
import DropZone from "components/DropZone";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
  // todo: states
  const [file, setFile] = useState<any | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<
    "uploading" | "uploaded" | "failed" | "upload"
  >("upload");

  // todo: handle upload
  const handleUpload = async () => {
    if (uploadState === "uploading") return;

    let formData = new FormData();
    formData.append("file", file);
    try {
      setUploadState("uploading");
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/v1/file/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setId(data.id);
      setDownloadUrl(data.url);
      setUploadState("uploaded");
    } catch (error) {
      console.log(error);
      setUploadState("failed");
    }
  };

  // todo: upload new file
  const handleNew = () => {
    setUploadState("upload");
    setDownloadUrl(null);
    setFile(null);
  };
  // todo: change upload state if upload fails
  useEffect(() => {
    if (uploadState === "failed") {
      setTimeout(() => {
        setUploadState("upload");
      }, 3000);
    }
  }, [uploadState]);
  // todo: return
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DropZone
          setFile={setFile}
          file={file}
          downloadUrl={downloadUrl}
          id={id}
        />
        {uploadState === "uploaded" ? (
          <button className={styles.uploadBtn} onClick={handleNew}>
            Upload new file
          </button>
        ) : (
          <button
            className={styles.uploadBtn}
            onClick={handleUpload}
            disabled={uploadState === "uploading"}
          >
            {uploadState}
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
