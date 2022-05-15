import axios from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { IFile } from "types";
import styles from "styles/Download.module.scss";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { convertBytes } from "utils/utils";
import fileDownload from "js-file-download";
const Download: NextPage<{ file: IFile }> = ({ file }) => {
  const { id, name, sizeInBytes, format } = file;

  const handleDownload = async () => {
    try {
      const { data } = await axios.get(`/api/v1/file/download/${id}`, {
        responseType: "blob",
      });
      fileDownload(data, name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {!id ? (
        <h2>File does not exist</h2>
      ) : (
        <div className={styles.wrapper}>
          <BsFillCloudDownloadFill className={styles.icon} />
          <p>Your file is ready to download</p>
          <div className={styles.details}>
            <p className={styles.name}>{file.name}</p>
            <p className={styles.size}>{convertBytes(file.sizeInBytes)} mb</p>
          </div>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:5000/api/v1/file/${id}`);
    file = data;
  } catch (error) {
    console.log(error);
    file = {};
  }

  return {
    props: {
      file,
    },
  };
}

export default Download;
